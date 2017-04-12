/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ucm.email;

import com.app.email.AppEmail;
import com.app.encryption.AppDataEncryptorDecryptor;
import com.app.util.ApplicationUtil;
import com.ucm.exception.AppException;
import com.ucm.exception.EncryptedTokenNotValidExcepton;
import com.ucm.model.AppUser;
import com.ucm.model.Student;
import java.util.Properties;
import org.apache.log4j.Logger;
import org.apache.log4j.Priority;

public class EmailMessageBuilder {

    private static final Logger LOGGER = Logger.getLogger(EmailMessageBuilder.class);
    
    public static AppEmail getStudentLoginDetails(Student student, AppUser appUser){
        
        AppEmail appMail = null;
        try{
        Properties emailProps = ApplicationUtil._appEmailProps;
        appMail = new AppEmail();
        AppDataEncryptorDecryptor decryptor = new AppDataEncryptorDecryptor();
        String message = emailProps.getProperty("com.app.user.mail.message");
        message = message.replaceAll("@FIRSTNAME@", student.getFirstName())
                .replaceAll("@LASTNAME@", student.getLastName())
                .replaceAll("@CONCENTRATION@", student.getConcentration().getConcentrationName())
                .replaceAll("@ID@", appUser.getLoginId())
                .replaceAll("@PASSWORD@", decryptor.decrypt(appUser.getPassword()))
                .replaceAll("@URL@", emailProps.getProperty("appurl"));
        appMail.setMessage(message);
        appMail.setSubject(emailProps.getProperty("com.app.user.mail.subject"));
        appMail.setToEmail(student.getSecondaryEmail());
        }catch(AppException | EncryptedTokenNotValidExcepton ae){
            LOGGER.log(Priority.ERROR, "Error while building the email message in getStudentLoginDetails method"+ae.getMessage(), ae);
        }
        return appMail;
    }
}
