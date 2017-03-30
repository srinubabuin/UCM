/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.service.impl;

import com.app.db.util.AppDBProps;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.app.service.AppPoolService;

/**
 *
 * @author Srinu Babu
 */
public final class AppHikariSorce implements AppPoolService{

    private HikariDataSource hikariDataSource = null;
    private AppDBProps dbProps;
    public AppHikariSorce(AppDBProps dbProps){
        this.dbProps = dbProps;
        initPool();
    }
    private void initPool(){
        shutdown();
        hikariDataSource = new HikariDataSource(getHikariConfig(dbProps));
    }
    
    @Override
    public Connection getConnection() {
        try {
            return hikariDataSource.getConnection();
        } catch (SQLException ex) {
            Logger.getLogger(AppHikariSorce.class.getName()).log(Level.SEVERE, null, ex);
            initPool();
        }
        return null;
    }

    @Override
    public void shutdown() {
       try{
            if(hikariDataSource != null){
                hikariDataSource.close();
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    private HikariConfig getHikariConfig(AppDBProps dbProps){
        
        HikariConfig config = new HikariConfig();
        
        config.setDriverClassName(dbProps.getDriver());
        config.setJdbcUrl(dbProps.getUrl());
        config.setUsername(dbProps.getUserName());
        config.setPassword(dbProps.getPassword());
        config.setAutoCommit(dbProps.isAutoCommit());
        config.setMaximumPoolSize(dbProps.getMaxPoolSize());
        config.setConnectionTestQuery(dbProps.getConnTestQuery());
        return config;
    }

}
