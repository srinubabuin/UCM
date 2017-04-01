package com.app.util;

public class DBUtil {

    public final static String COLUMN_USERS_ID = "ID";
    public final static String COLUMN_USERS_LOGIN_ID = "LOGIN_ID";
    public final static String COLUMN_USERS_PASSWORD = "PASSWORD";
    public final static String COLUMN_USERS_ROLE = "ROLE";
    //cources columns
    public final static String COLUMN_COURCES_ID = "ID";
    public final static String COLUMN_COURCES_NAME = "NAME";
    public final static String COLUMN_COURCES_PREFIX = "PREFIX";
    public final static String COLUMN_COURCES_CODE = "CODE";
    public final static String COLUMN_COURCES_STATUS = "STATUS";
    public final static String COLUMN_COURCES_CREATED_DATE = "CREATED_DATE";
    //Concentration columns
    public final static String COLUMN_CONCENTATIONS_ID = "ID";
    public final static String COLUMN_CONCENTATIONS_NAME = "NAME";
    public final static String COLUMN_CONCENTATIONS_STATUS = "STATUS";
    public final static String COLUMN_CONCENTATIONS_DATE = "CREATED_DATE";
    //Advisors columns
    public final static String COLUMN_ADVISORS_ID = "ID";
    public final static String COLUMN_ADVISORS_CONCENTATION_ID = "ID";
    public final static String COLUMN_ADVISORS_LOGIN_ID = "LOGIN_ID";
    public final static String COLUMN_ADVISORS_NAME = "NAME";
    public final static String COLUMN_ADVISORS_MAIL = "MAIL";
    public final static String COLUMN_ADVISORS_STATUS = "STATUS";
    public final static String COLUMN_ADVISORS_DATE = "CREATED_DATE";
    public static String getCustomCourceDBMessage(String message){
    
        if(message != null){
            if(message.contains("COUR_UNQ_NAME")){
                message = "Cource Name already exists.";
            }else if(message.contains("COUR_UNQ_PREFIX")){
                message = "Cource Prefix already exists.";
            }else if(message.contains("COUR_UNQ_CODE")){
                message = "Cource Code already exists.";
            }else if(message.contains("CON_NAME_UK")){
                message = "Concentation already exists.";
            }
        }
        return message;
    }
}
