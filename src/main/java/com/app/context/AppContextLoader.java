/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.context;

import com.app.db.util.AppDBProps;
import com.app.db.util.AppQueryReader;
import com.app.util.ApplicationUtil;
import com.conn.pool.app.AppConnectionPool;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 *
 * @author Srinu Babu
 */
public class AppContextLoader implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext servletContext = sce.getServletContext();
        String serverDetails = servletContext.getServerInfo();
        String fileSeperator = ApplicationUtil.setAppFileSeperator(serverDetails);
        String path = servletContext.getRealPath("/");
        if (!(path.endsWith("/") || path.endsWith("\\"))) {
            path += fileSeperator;
        }
        ApplicationUtil.APP_PATH = path;
        Properties properties = new Properties();
        try (FileInputStream inputstream = new FileInputStream(ApplicationUtil.APP_PATH + "WEB-INF" + fileSeperator + "database" + fileSeperator + "database.properties")) {
            properties.load(inputstream);
        } catch (IOException e) {
            System.err.println("Could not load database properties file!!!  " + e.getMessage());
        }
        String driverName = properties.getProperty("DriverName", "oracle.jdbc.OracleDriver");
        String url = properties.getProperty("URL");
        String userName = properties.getProperty("UserName");
        String passwordEncrypted = properties.getProperty("PasswordEncrypted");
        String password = properties.getProperty("Password");
        String db_type = properties.getProperty("DbType", "ORACLESERVER");
        String partitions = properties.getProperty("ConnectionPartitions", "1");
        String minConPerPartition = properties.getProperty("MinimumConnectionsPerPartition", "5");
        String maxConPerPartition = properties.getProperty("MaximumConnectionsPerPartition", "10");
        String testConnectionPeriodically = properties.getProperty("TestConnectionPeriodically");
        String testConnectionString = properties.getProperty("ConnectionTestQuery");
        String connectionPoolType = properties.getProperty("ConnectionPoolType");
        connectionPoolType = connectionPoolType == null ? AppDBProps.ConnectionPoolType.HIKARI.name() : connectionPoolType;
        AppDBProps appDBProps = new AppDBProps();
        appDBProps.setDriver(driverName);
        appDBProps.setUrl(url);
        appDBProps.setUserName(userName);
        appDBProps.setPassword(password);
        appDBProps.setConnTestQuery(testConnectionString);
        appDBProps.setMaxPoolSize(Integer.parseInt(maxConPerPartition));
        appDBProps.setDatabaseType(AppDBProps.DatabaseType.valueOf(db_type.equalsIgnoreCase("ORACLESERVER") ? "ORACLE" : db_type));
        try {
            AppConnectionPool.setDBProperties(appDBProps);
            AppQueryReader.loadProperties(path);
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(AppContextLoader.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {

    }

}
