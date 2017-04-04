/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.util;

import com.app.db.util.AppDBProps;
import static com.app.db.util.AppDBProps.ConnectionPoolType.BONECP;
import static com.app.db.util.AppDBProps.ConnectionPoolType.HIKARI;
import com.app.encryption.AppDataEncryptorDecryptor;
import com.ucm.exception.AppException;
import com.ucm.model.AppUser;
import com.ucm.services.UserLoginService;
import com.ucm.services.impl.UserLoginServiceImpl;
import java.io.File;
import static java.lang.Integer.min;
import static java.lang.Math.abs;
import static java.lang.Math.pow;
import static java.lang.Math.random;
import static java.lang.Math.round;
import java.util.Properties;
import org.apache.log4j.Logger;
import org.apache.log4j.Priority;

/**
 *
 * @author Srinu Babu
 */
public class ApplicationUtil {

    public static String APP_FILE_SEPERATOR = "\\";
    public static String APP_PATH = "";
    public static String REST_PATH_BOOKING = "rest";
    public static final String SUCCESS = "SUCCESS";
    public static final String MESSAGE = "MESSAGE";
    public static final String ID = "id";
    public static Properties _appEmailProps;
    public static String appUrl = "";
    private static final Logger LOGGER = Logger.getLogger(ApplicationUtil.class);
    
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

    public static void setAppEmailProps(Properties appEmailProps) {
        ApplicationUtil._appEmailProps = appEmailProps;
    }
    
    public static AppUser getDynamicLoginCredentials(){
        
        AppUser appUser = null;
        try{
            UserLoginService userService = new UserLoginServiceImpl();
            AppDataEncryptorDecryptor appDataEnc = new AppDataEncryptorDecryptor();
            appUser = new AppUser();
            int maxId = userService.getMaxId()-1;
            String loginId = getLoginId(String.valueOf(maxId));
            String password = appDataEnc.encrypt(passwordGenerator(10));
            appUser.setLoginId(loginId);
            appUser.setPassword(password);
            
        }catch(AppException e){
            LOGGER.log(Priority.ERROR, "Error while generating the credentials in getDynamicLoginCredentials"+e.getMessage(), e);
        }
        return appUser;
    }
    
    public static String getLoginId(String id){
        
        String appLoginId = "00000007";
        StringBuilder idBuilder = new StringBuilder();
        String userId = idBuilder.append(id).reverse().toString();
        int idLen = id.length();
        idBuilder.setLength(0);
        idBuilder.append(appLoginId);
        appLoginId = idBuilder.replace(0,  idLen, userId).toString();
        idBuilder.setLength(0);
        return idBuilder.append(appLoginId).reverse().toString();
    }
    
    public static String passwordGenerator(int passwordLength){
    
        StringBuilder password = new StringBuilder();
        for (int i = passwordLength; i > 0; i -= 12) {
            int n = min(12, abs(i));
            password.append(leftPad(Long.toString(round(random() * pow(36, n)), 36), n, '0'));
        }
        return password.toString();
    }
    public static String leftPad(String originalString, int length,
            char padCharacter) {
        String paddedString = originalString;
        while (paddedString.length() < length) {
            paddedString = padCharacter + paddedString;
        }
        return paddedString;
    }
}
