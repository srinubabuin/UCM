package com.ucm.rest;

import com.app.util.AppSessionUtil;
import com.ucm.exception.NoUserException;
import com.ucm.model.AppUser;
import com.ucm.model.AppAuth;
import com.ucm.service.helper.UserServiceHelper;

import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;

@Path("/auth")
public class AuthService {

    private static Logger logger = Logger.getLogger(AuthService.class);

    @Context
    private HttpServletRequest request;

    @POST
    @Path("/login")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response logIn(AppUser requestedUser) {
        AppUser appUser = null;
        UserServiceHelper userServiceHelper;
        try {
            userServiceHelper = new UserServiceHelper();
            String accessToken = UUID.randomUUID().toString();
            appUser = userServiceHelper.authUser(requestedUser);
            if (appUser == null) {
                logger.info("IsVerified_false_01 ");
                return Response.status(400).header("Access-Control-Allow-Origin", "*").build();
            }
            AppSessionUtil.setAuthoriztionUser(accessToken, appUser);
            AppAuth appAuth = new AppAuth();
            appAuth.setToken(accessToken);
            appAuth.setRole(appUser.getRole());
            appAuth.setLoginId(appUser.getLoginId());
            HttpSession session = request.getSession(true);
            if (session != null) {
                session.setAttribute("accessToken", accessToken);
                session.setAttribute("role", appUser.getRole().toString());
                session.setAttribute("loginId", appUser.getLoginId());
                session.setAttribute("appAuth", appAuth);
            }
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(appAuth).build();
        } catch (NoUserException ex) {
            logger.info("NoUser ");
            return Response.ok().header("Access-Control-Allow-Origin", "*").build();
        } catch (Exception nre) {
            logger.info("NoResultException_01 ");
            return Response.status(400).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @POST
    @Path("/logout")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response logOut(@HeaderParam("Authorization") String authorization) {
        UserServiceHelper userServiceHelper;
        try {

            userServiceHelper = new UserServiceHelper();
            userServiceHelper.deleteAccessTokens(authorization);

            if (request.getSession(false) != null) {
                request.getSession(false).invalidate();
            }
        } catch (NoUserException nue) {
            logger.info("v1SignoutPost() NoUserException");
            return Response.status(403).header("Access-Control-Allow-Origin", "*").build();
        }

        return Response.ok().header("Access-Control-Allow-Origin", "*").build();
    }

}
