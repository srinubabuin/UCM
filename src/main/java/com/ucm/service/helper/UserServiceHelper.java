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
import java.util.UUID;

/**
 *
 * @author Srinu Babu
 */
public class UserServiceHelper {

    public boolean isuserExists(AppUser user) {

        UserService userService = new UserServiceImpl();
        return userService.isUserExists(user);
    }

    public AppUser authUser(AppUser user) {
        AppUser appUser = null;
        UserService userService;
        String accessToken;
        try {
            userService = new UserServiceImpl();
            appUser = userService.authUser(user);
            accessToken = UUID.randomUUID().toString();
            AppSessionUtil.setAuthoriztionUser(accessToken, appUser);
        } catch (NoUserException e) {
        } catch (Exception e) {
        }

        return appUser;
    }
}
