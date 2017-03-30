package com.ucm.filter;

import com.app.util.ApplicationUtil;
import com.ucm.exception.NoUserException;
import com.ucm.model.AppUser;
import com.user.service.impl.UserServiceImpl;
import java.security.Principal;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Logger;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.PathSegment;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;

@Provider
public class UCMAccessFilter implements ContainerRequestFilter {

    private static Logger logger = Logger.getLogger(UCMAccessFilter.class.getName());

    public UCMAccessFilter() {
        logger.info("UCMAccessFilter initialization");
    }

    @Override
    public void filter(ContainerRequestContext requestContext) {
        logger.info("BookingAccessFilter.filter() [authorization:" + requestContext.getHeaderString("Authorization") + "]");
        AppUser users = null;
        UserServiceImpl userServiceImpl = new UserServiceImpl();
        if (isPathBooking(requestContext)) {
            String authorization = requestContext.getHeaderString("Authorization");
            try {
                users = userServiceImpl.getUserByAuthorization(authorization);
            } catch (NoUserException e) {
                requestContext.abortWith(Response.status(403).header("Access-Control-Allow-Origin", "*").build());
                return;
            }

            SecurityContext originalContext = requestContext.getSecurityContext();
            Set<String> roles = new HashSet<>();
            if ("USER".equals(users.getRole())) {
                roles.add("ADMIN");
            } else {
                roles.add("USER");
            }
            Authorizer authorizer = new Authorizer(roles, users.getId(), users.getLoginId(), originalContext.isSecure());
            requestContext.setSecurityContext(authorizer);
        }
    }

    private Boolean isPathBooking(ContainerRequestContext requestContext) {
        for (PathSegment pathSegment : requestContext.getUriInfo().getPathSegments()) {
            if (ApplicationUtil.REST_PATH_BOOKING.equals(pathSegment.getPath())) {
                return true;
            }
        }
        return false;
    }

    public static class Authorizer implements SecurityContext {

        private Set<String> roles;
        private Integer userId;
        private String username;
        private boolean isSecure;

        public Authorizer(Set<String> roles, final Integer userId, final String username, boolean isSecure) {
            this.roles = roles;
            this.userId = userId;
            this.username = username;
            this.isSecure = isSecure;
        }

        @Override
        public Principal getUserPrincipal() {
            return new User(userId, username);
        }

        @Override
        public boolean isUserInRole(String role) {
            return roles.contains(role);
        }

        @Override
        public boolean isSecure() {
            return isSecure;
        }

        @Override
        public String getAuthenticationScheme() {
            return "Your Scheme";
        }
    }

    public static class User implements Principal {

        private Integer userId;
        private String username;

        public User(Integer userId, String username) {
            this.userId = userId;
            this.username = username;
        }

        @Override
        public String getName() {
            return username;
        }

        public Integer getUserId() {
            return userId;
        }

    }
}
