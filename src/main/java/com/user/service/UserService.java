/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.user.service;

import com.ucm.exception.NoUserException;
import com.ucm.model.AppUser;

public interface UserService {

    public boolean isUserExists(AppUser user);

    public AppUser getUser(int id) throws NoUserException;

    public AppUser authUser(AppUser user) throws NoUserException;

    public AppUser getUserByLoginId(String loginId) throws NoUserException;

    public AppUser getUserByAuthorization(String authorization) throws NoUserException;

    public boolean deleteAccessTokens(String authorization) throws NoUserException;

}
