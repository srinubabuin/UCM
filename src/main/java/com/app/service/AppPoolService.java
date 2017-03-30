/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.service;

import java.sql.Connection;

/**
 *
 * @author Srinu Babu
 */
public interface AppPoolService {

    public Connection getConnection();
    public void shutdown();
}
