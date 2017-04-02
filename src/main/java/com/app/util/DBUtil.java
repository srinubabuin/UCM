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
    public final static String COLUMN_COURCES_NOTES = "NOTES";
    public final static String COLUMN_COURCES_CREATED_DATE = "CREATED_DATE";
    //Concentration columns
    public final static String COLUMN_CONCENTATIONS_ID = "ID";
    public final static String COLUMN_CONCENTATIONS_NAME = "NAME";
    public final static String COLUMN_CONCENTATIONS_STATUS = "STATUS";
    public final static String COLUMN_CONCENTATIONS_NOTES = "NOTES";
    public final static String COLUMN_CONCENTATIONS_DATE = "CREATED_DATE";
    //Advisors columns
    public final static String COLUMN_ADVISORS_ID = "ID";
    public final static String COLUMN_ADVISORS_CONCENTATION_ID = "ID";
    public final static String COLUMN_ADVISORS_LOGIN_ID = "LOGIN_ID";
    public final static String COLUMN_ADVISORS_NAME = "NAME";
    public final static String COLUMN_ADVISORS_MAIL = "MAIL";
    public final static String COLUMN_ADVISORS_STATUS = "STATUS";
    public final static String COLUMN_ADVISORS_PHONE = "PHONE";
    public final static String COLUMN_ADVISORS_NOTES = "NOTES";
    public final static String COLUMN_ADVISORS_DATE = "CREATED_DATE";
    //advisor concentationn alias
    public final static String COLUMN_ADVISORS_CON_NAME = "CON_NAME";
    public final static String COLUMN_ADVISORS_CON_STATUS = "CON_STATUS";
    public final static String COLUMN_ADVISORS_CON_NOTES = "CON_NOTES";
    public final static String COLUMN_ADVISORS_CON_CREATED_DATE = "CON_CREATED_DATE";
    //Student columns
    public final static String COLUMN_STUDENTS_ID = "ID";
    public final static String COLUMN_STUDENTS_LOGIN_ID = "LOGIN_ID";
    public final static String COLUMN_STUDENTS_FIRST_NAME = "FIRST_NAME";
    public final static String COLUMN_STUDENTS_LAST_NAME = "LAST_NAME";
    public final static String COLUMN_STUDENTS_MAIL = "MAIL";
    public final static String COLUMN_STUDENTS_SECONDARYEMAIL = "SECONDARYEMAIL";
    public final static String COLUMN_STUDENTS_PHONE = "PHONE";
    public final static String COLUMN_STUDENTS_ADDRESS = "ADDRESS";
    public final static String COLUMN_STUDENTS_SCORES = "SCORES";
    public final static String COLUMN_STUDENTS_CONCENTRATION_ID = "CONCENTRATION_ID";
    public final static String COLUMN_STUDENTS_STUDENTSTATUS = "STUDENTSTATUS";
    public final static String COLUMN_STUDENTS_STUDENTSTATUS_DATE = "STUDENTSTATUS_DATE";
    public final static String COLUMN_STUDENTS_STATUS = "STATUS";
    public final static String COLUMN_STUDENTS_TESTDETAILS = "TESTDETAILS";
    public final static String COLUMN_STUDENTS_ACCEPTEDCODEOFCONDUCT = "ACCEPTEDCODEOFCONDUCT";
    public final static String COLUMN_STUDENTS_NOTES = "NOTES";
    public final static String COLUMN_STUDENTS_CREATED_DATE = "CREATED_DATE";
    //student concentation alias
    public final static String COLUMN_STUDENTS_CON_NAME = "CON_NAME";
    public final static String COLUMN_STUDENTS_CON_STATUS = "CON_STATUS";
    public final static String COLUMN_STUDENTS_CON_NOTES = "CON_NOTES";
    public final static String COLUMN_STUDENTS_CON_CREATED_DATE = "CON_CREATED_DATE";
    
    public static String getCustomDBMessage(String message){
    
        if(message != null){
            if(message.contains("COUR_UNQ_NAME")){
                message = "Cource Name already exists.";
            }else if(message.contains("COUR_UNQ_PREFIX")){
                message = "Cource Prefix already exists.";
            }else if(message.contains("COUR_UNQ_CODE")){
                message = "Cource Code already exists.";
            }else if(message.contains("CON_NAME_UK")){
                message = "Concentation already exists.";
            }else if(message.contains("STU_MAIL_Uk")){
                message = "Student Primary mail  already exists.";
            }else if(message.contains("STU_PHONE_Uk")){
                message = "Student phone number already exists.";
            }
        }
        return message;
    }
}
