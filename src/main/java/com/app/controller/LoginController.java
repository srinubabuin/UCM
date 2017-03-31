/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.controller;

import com.ucm.model.AppUser;
import com.ucm.service.helper.UserServiceHelper;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Srinu Babu
 */
public class LoginController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");
        String loginId = request.getParameter("loginId");
        String password = request.getParameter("password");
        if (action.equals("login")) {
            AppUser user = new AppUser();
            user.setLoginId(loginId);
            user.setPassword(password);
            UserServiceHelper userHelper = new UserServiceHelper();
            try {
                AppUser appUser = userHelper.authUser(user);
                System.out.println("############# " + appUser);
            } catch (Exception e) {
            }

        }

    }
}
