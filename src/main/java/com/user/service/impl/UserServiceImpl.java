/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.user.service.impl;

import com.app.util.AppSessionUtil;
import com.app.util.ApplicationUtil;
import com.app.util.DBUtil;
import com.app.util.Role;
import com.conn.pool.app.AppConnectionPool;
import com.ucm.exception.NoUserException;
import com.ucm.model.AppUser;
import com.user.service.UserService;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserServiceImpl implements UserService {

    @Override
    public boolean isUserExists(AppUser user) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        boolean userExistsFlag = false;

        try {
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement("SELECT LOGIN_ID,PASSWORD FROM USERS WHERE LOGIN_ID = ? AND PASSWORD = ?");
            pstm.setString(1, user.getLoginId());
            pstm.setString(2, user.getPassword());
            rs = pstm.executeQuery();
            if (rs.next()) {
                userExistsFlag = true;
            }
        } catch (SQLException ex) {
            System.out.println("Exception in isUserExists " + ex.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return userExistsFlag;
    }

    @Override
    public AppUser getUser(int id) throws NoUserException {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        AppUser appUser = null;
        try {
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement("SELECT * FROM USERS WHERE ID = ?");
            pstm.setInt(1, id);
            rs = pstm.executeQuery();
            if (rs.next()) {
                appUser = new AppUser();
                appUser.setId(rs.getInt(DBUtil.COLUMN_USERS_ID));
                appUser.setLoginId(rs.getString(DBUtil.COLUMN_USERS_LOGIN_ID));
                appUser.setPassword(rs.getString(DBUtil.COLUMN_USERS_PASSWORD));
                appUser.setRole(Role.valueOf(rs.getString(DBUtil.COLUMN_USERS_ROLE)));
            }
        } catch (SQLException ex) {
            System.out.println("Exception in isUserExists " + ex.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return appUser;
    }

    @Override
    public AppUser authUser(AppUser user) throws NoUserException {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        AppUser appUser = null;
        try {
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement("SELECT * FROM USERS WHERE LOGIN_ID = ? AND PASSWORD = ?");
            pstm.setString(1, user.getLoginId());
            pstm.setString(2, ApplicationUtil.encryptValue(user.getPassword()));
            rs = pstm.executeQuery();
            if (rs.next()) {
                appUser = new AppUser();
                appUser.setId(rs.getInt(DBUtil.COLUMN_USERS_ID));
                appUser.setLoginId(rs.getString(DBUtil.COLUMN_USERS_LOGIN_ID));
                appUser.setPassword(rs.getString(DBUtil.COLUMN_USERS_PASSWORD));
                appUser.setRole(Role.valueOf(rs.getString(DBUtil.COLUMN_USERS_ROLE)));
            }
            if (appUser == null) {
                throw new NoUserException();
            }
        } catch (SQLException ex) {
            System.out.println("Exception in isUserExists " + ex.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return appUser;
    }

    @Override
    public AppUser getUserByAuthorization(String authorization) throws NoUserException {
        AppUser appUser = AppSessionUtil.getAuthoriztionUser(authorization);
        if (appUser == null) {
            throw new NoUserException();
        }
        return appUser;
    }

    @Override
    public boolean deleteAccessTokens(String authorization) throws NoUserException {
        return !(AppSessionUtil.removeAuthoriztionUser(authorization) == null);
    }

}
