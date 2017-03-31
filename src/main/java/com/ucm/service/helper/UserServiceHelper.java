/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.service.helper;

import com.app.util.AppSessionUtil;
import com.ucm.exception.NoUserException;
import com.ucm.model.AppUser;
import com.user.service.UserService;
import com.user.service.impl.UserServiceImpl;
import org.apache.log4j.Logger;

public class UserServiceHelper {

    private static Logger logger = Logger.getLogger(UserServiceHelper.class);

    public boolean isuserExists(AppUser user) {

        UserService userService = new UserServiceImpl();
        return userService.isUserExists(user);
    }

    public AppUser authUser(AppUser user) throws NoUserException {
        AppUser appUser = null;
        UserService userService;
        try {
            userService = new UserServiceImpl();
            appUser = userService.authUser(user);
        } catch (NoUserException e) {
            logger.error("User not existed");
            throw new NoUserException();
        } catch (Exception e) {
            logger.error("User not existed " + e.getMessage());
            logger.error(e);
        }
        return appUser;
    }

    public AppUser getUserByAuthorization(String authorization) throws NoUserException {
        logger.info("getUserByAccessToken() [authorization:" + authorization + "]");
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new NoUserException();
        }
        String accessToken = authorization.substring("Bearer".length()).trim();

        AppUser appUser = null;
        try {
            appUser = AppSessionUtil.getAuthoriztionUser(accessToken);
            if (appUser == null) {
                throw new NoUserException();
            }
            return appUser;
        } catch (Exception e) {
            logger.info("getUserByAccessToken().NoResultException_01 ");
            throw new NoUserException();
        }
    }

    public void deleteAccessTokens(String authorization) throws NoUserException {
        logger.info("deleteAccessTokens() [authorization:" + authorization + "]");
        AppUser puUser = getUserByAuthorization(authorization);

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new NoUserException();
        }
        String accessToken = authorization.substring("Bearer".length()).trim();
        AppSessionUtil.removeAuthoriztionUser(accessToken);
    }
}
