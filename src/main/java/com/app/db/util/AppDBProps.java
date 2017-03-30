/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.db.util;

/**
 *
 * @author Srinu Babu
 */
public class AppDBProps {

    private String driver;
    private String url;
    private String userName;
    private String password;
    private boolean autoCommit = true;
    private boolean testConnectionPeriodically = true;
    private String connTestQuery = "SELECT 1 FROM DUAL";
    private int connectionPartitions;
    private int maxPoolSize = 5;
    private int minPoolSize = 5;
    private DatabaseType databaseType = DatabaseType.ORACLE;
    private ConnectionPoolType connectionPoolType = ConnectionPoolType.HIKARI;

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAutoCommit() {
        return autoCommit;
    }

    public void setAutoCommit(boolean autoCommit) {
        this.autoCommit = autoCommit;
    }

    public boolean isTestConnectionPeriodically() {
        return testConnectionPeriodically;
    }

    public void setTestConnectionPeriodically(boolean testConnectionPeriodically) {
        this.testConnectionPeriodically = testConnectionPeriodically;
    }

    public String getConnTestQuery() {
        return connTestQuery;
    }

    public void setConnTestQuery(String connTestQuery) {
        this.connTestQuery = connTestQuery;
    }

    public int getConnectionPartitions() {
        return connectionPartitions;
    }

    public void setConnectionPartitions(int connectionPartitions) {
        this.connectionPartitions = connectionPartitions;
    }

    public int getMaxPoolSize() {
        return maxPoolSize;
    }

    public void setMaxPoolSize(int maxPoolSize) {
        this.maxPoolSize = maxPoolSize;
    }

    public int getMinPoolSize() {
        return minPoolSize;
    }

    public void setMinPoolSize(int minPoolSize) {
        this.minPoolSize = minPoolSize;
    }

    public DatabaseType getDatabaseType() {
        return databaseType;
    }

    public void setDatabaseType(DatabaseType databaseType) {
        this.databaseType = databaseType;
    }

    public ConnectionPoolType getConnectionPoolType() {
        return connectionPoolType;
    }

    public void setConnectionPoolType(ConnectionPoolType connectionPoolType) {
        this.connectionPoolType = connectionPoolType;
    }

    public enum DatabaseType {

        SQLSERVER,
        ORACLE;

        private String friendlyName;

        private DatabaseType() {
        }

        private DatabaseType(String friendlyName) {
            this.friendlyName = friendlyName;
        }

        /**
         * Returns the DatabaseType for the specified value.
         *
         * @param value String
         * @return DatabaseType
         */
        public static DatabaseType getDatabaseType(String value) {
            for (DatabaseType v : values()) {
                if (v.toString().equalsIgnoreCase(value)) {
                    return v;
                }
            }

            throw new IllegalArgumentException();
        }

        /**
         * Returns the String representation.
         *
         * @return String
         */
        @Override
        public String toString() {
            if (friendlyName == null) {
                return name();
            } else {
                return friendlyName;
            }
        }
    }

    public enum ConnectionPoolType {

        HIKARI, BONECP;

        public static ConnectionPoolType getConnectioPoolType(String value) {

            for (ConnectionPoolType v : values()) {
                if (v.toString().equalsIgnoreCase(value)) {
                    return v;
                }
            }
            return HIKARI;
        }
    }
}
