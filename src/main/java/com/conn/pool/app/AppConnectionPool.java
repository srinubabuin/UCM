/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.conn.pool.app;

import com.app.db.util.AppDBProps;
import com.app.service.AppPoolService;
import com.app.service.impl.AppHikariSorce;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Srinu Babu
 */
public class AppConnectionPool {

    private static AppDBProps appDBProps;
    private static AppPoolService appPool;

    private AppConnectionPool() {
    }

    private AppConnectionPool(AppDBProps appDBProps) {
        AppConnectionPool.initializePool();
    }

    private static void initializePool() {
        switch (appDBProps.getConnectionPoolType()) {
            case HIKARI:
                Logger.getLogger(AppConnectionPool.class.getName()).log(Level.INFO, "Initializing Hikari Connection Pool");
                appPool = new AppHikariSorce(appDBProps);
                break;
            default:
                Logger.getLogger(AppConnectionPool.class.getName()).log(Level.INFO, "Initializing Hikari Connection Pool");
                appPool = new AppHikariSorce(appDBProps);
        }
    }

    public static void setDBProperties(AppDBProps appDBProps) throws SQLException, ClassNotFoundException {
        if (appPool != null) {
            appPool.shutdown();
        }
        if (appDBProps != null) {
            AppConnectionPool.appDBProps = appDBProps;
            initializePool();
        }
    }

    public static AppDBProps getAppDBProps() {

        return appDBProps;
    }
    public static AppDBProps.DatabaseType getAppDBType(){
        return appDBProps.getDatabaseType();
    }
    public static Connection getConnection() {

        return appPool.getConnection();
    }

    public static void release(ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }
        } catch (SQLException e) {
        }
    }

    public static void release(Statement stm) {
        try {
            if (stm != null) {
                stm.close();
            }
        } catch (SQLException e) {
        }
    }

    public static void release(Connection con) {
        try {
            if (con != null) {
                con.close();
            }
        } catch (SQLException e) {
        }
    }

    public static void release(ResultSet rs, Statement stm) {
        release(rs);
        release(stm);
    }

    public static void release(ResultSet rs, Statement stm, Connection con) {
        release(rs);
        release(stm);
        release(con);
    }
}
