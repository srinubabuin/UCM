/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ucm.services;

import com.ucm.model.AppUser;

public interface UserLoginService {

    public int insertUser(AppUser appUser);
    public int modifyUser(AppUser appUser);
    public int getMaxId();
}
