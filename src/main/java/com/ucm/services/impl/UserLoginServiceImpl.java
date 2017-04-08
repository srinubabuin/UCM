/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.services.impl;

import com.app.db.util.AppQueryReader;
import com.app.util.DBUtil;
import com.conn.pool.app.AppConnectionPool;
import com.ucm.model.AppUser;
import com.ucm.services.UserLoginService;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.apache.log4j.Logger;
import org.apache.log4j.Priority;

public class UserLoginServiceImpl implements UserLoginService {

    private static final Logger LOGGER = Logger.getLogger(UserLoginServiceImpl.class);

    @Override
    public int insertUser(AppUser appUser) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int id = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.userloginservice.insertuser"), new String[]{DBUtil.COLUMN_USERS_ID});
            pstm.setString(pos, appUser.getLoginId());
            pstm.setString(++pos, appUser.getPassword());
            pstm.setString(++pos, appUser.getRole().toString());
            if (pstm.executeUpdate() > 0) {
                rs = pstm.getGeneratedKeys();
                rs.next();
                id = rs.getInt(1);
            }
        } catch (SQLException e) {
            LOGGER.log(Priority.ERROR, "Exception while inserting the user" + e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return id;
    }

    @Override
    public int modifyUser(AppUser appUser) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int count = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.userloginservice.modifyuser"), new String[]{DBUtil.COLUMN_USERS_ID});
            pstm.setString(pos, appUser.getPassword());
            pstm.setString(++pos, appUser.getLoginId());
            count = pstm.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Priority.ERROR, "Exception while inserting the user" + e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return count;
    }

    @Override
    public int getMaxId() {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int id = 0;
        try {
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.userloginservice.getmaxuser"));
            rs = pstm.executeQuery();
            if(rs.next()){
                id = rs.getInt(DBUtil.COLUMN_USERS_ID);
            }
        } catch (SQLException e) {
            LOGGER.log(Priority.ERROR, "Exception while getting the max id" + e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return id;
    }

}
