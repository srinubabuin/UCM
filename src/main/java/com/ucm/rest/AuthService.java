package com.ucm.rest;

import com.app.util.AppSessionUtil;
import com.ucm.exception.NoUserException;
import com.ucm.model.AppUser;
import com.ucm.model.SigninToken;
import com.ucm.service.helper.UserServiceHelper;
import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;

@Path("/auth")
public class AuthService {

    private static Logger logger = Logger.getLogger(AuthService.class);

//    @OPTIONS
//    @Path("/signin")
//    public Response v1SigninOptions() {
//        return Response.ok().header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST").header("Access-Control-Allow-Headers", "Content-Type").build();
//    }
    @POST
    @Path("/signin")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response v1SigninPost(AppUser requestedUser) {
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
            SigninToken signinToken = new SigninToken();
            signinToken.setToken(accessToken);
            signinToken.setRole(appUser.getRole());
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(signinToken).build();
        } catch (NoUserException ex) {
            logger.info("NoUser ");
            return Response.ok().header("Access-Control-Allow-Origin", "*").build();
        } catch (Exception nre) {
            logger.info("NoResultException_01 ");
            return Response.status(400).header("Access-Control-Allow-Origin", "*").build();
        }
    }

//    @OPTIONS
//    @Path("/signout")
//    public Response signOutOptions() {
//        return Response.ok().header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "POST").header("Access-Control-Allow-Headers", "Content-Type").build();
//    }
    @POST
    @Path("/signout")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response signOut(@HeaderParam("Authorization") String authorization) {
        UserServiceHelper userServiceHelper;
        try {

            userServiceHelper = new UserServiceHelper();
            userServiceHelper.deleteAccessTokens(authorization);

        } catch (NoUserException nue) {
            logger.info("v1SignoutPost() NoUserException");
            return Response.status(403).header("Access-Control-Allow-Origin", "*").build();
        }

        return Response.ok().header("Access-Control-Allow-Origin", "*").build();
    }

}
