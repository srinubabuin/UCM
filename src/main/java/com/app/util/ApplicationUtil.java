/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.util;

import com.app.db.util.AppDBProps;
import static com.app.db.util.AppDBProps.ConnectionPoolType.BONECP;
import static com.app.db.util.AppDBProps.ConnectionPoolType.HIKARI;
import java.io.File;

/**
 *
 * @author Srinu Babu
 */
public class ApplicationUtil {

    public static String APP_FILE_SEPERATOR = "\\";
    public static String APP_PATH = "";
    public static String REST_PATH_BOOKING = "rest";

    public static String setAppFileSeperator(String serverDetails) {

        serverDetails = serverDetails.toLowerCase();
        if (serverDetails.contains("weblogic") || serverDetails.contains("glassfish")) {
            ApplicationUtil.APP_FILE_SEPERATOR = "//";
        } else if (serverDetails.contains("tomcat") || serverDetails.contains("jboss") || serverDetails.contains("websphere")) {
            ApplicationUtil.APP_FILE_SEPERATOR = File.separator;
        }
        return ApplicationUtil.APP_FILE_SEPERATOR;
    }

    public static boolean parseBoolean(Object obj) {
        return parseBoolean(obj, false);
    }

    public static boolean parseBoolean(Object obj, boolean defaultVal) {
        try {
            if (obj.toString().equalsIgnoreCase("Y") || obj.toString().equalsIgnoreCase("YES") || obj.toString().equalsIgnoreCase("T") || obj.toString().equalsIgnoreCase("1")) {
                obj = "true";
            }

            return Boolean.parseBoolean((String) obj);
        } catch (Exception e) {
            return defaultVal;
        }
    }

    public static boolean parseStringToBoolean(String str) {
        return Boolean.parseBoolean(str);

    }

    public static String getTransactionIsolationName(AppDBProps.ConnectionPoolType connectionPoolType, String transactionIsolation) {
        String transactionIsolationName = "";
        switch (connectionPoolType) {
            case HIKARI:
                if (null != transactionIsolation) {
                    switch (transactionIsolation) {
                        case "TRANSACTION_NONE":
                            transactionIsolationName = "TRANSACTION_NONE";
                            break;
                        case "TRANSACTION_READ_COMMITTED":
                            transactionIsolationName = "TRANSACTION_READ_COMMITTED";
                            break;
                        case "TRANSACTION_READ_UNCOMMITTED":
                            transactionIsolationName = "TRANSACTION_READ_UNCOMMITTED";
                            break;
                        case "TRANSACTION_REPEATABLE_READ":
                            transactionIsolationName = "TRANSACTION_REPEATABLE_READ";
                            break;
                        case "TRANSACTION_SERIALIZABLE":
                            transactionIsolationName = "TRANSACTION_SERIALIZABLE";
                            break;
                        default:
                            transactionIsolationName = transactionIsolation;
                            break;
                    }
                }
                break;

            case BONECP:
                if (null != transactionIsolation) {
                    switch (transactionIsolation) {
                        case "TRANSACTION_NONE":
                            transactionIsolationName = "NONE";
                            break;
                        case "TRANSACTION_READ_COMMITTED":
                            transactionIsolationName = "READ_COMMITTED";
                            break;
                        case "TRANSACTION_READ_UNCOMMITTED":
                            transactionIsolationName = "READ_UNCOMMITTED";
                            break;
                        case "TRANSACTION_REPEATABLE_READ":
                            transactionIsolationName = "REPEATABLE_READ";
                            break;
                        case "TRANSACTION_SERIALIZABLE":
                            transactionIsolationName = "SERIALIZABLE";
                            break;
                        default:
                            transactionIsolationName = transactionIsolation;
                            break;
                    }
                }
                break;
        }
        return transactionIsolationName;
    }
}
