/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.email;

import com.app.util.ApplicationUtil;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.apache.log4j.Logger;

public class EmailSenderThread implements Runnable {
    
    private static final Logger LOGGER = Logger.getLogger(EmailSenderThread.class);
    private AppEmail appMail = null;
    
    public EmailSenderThread(AppEmail appMail) {
        this.appMail = appMail;
    }
    
    @Override
    public void run() {
        
        try {
            Properties appEmailProps = ApplicationUtil._appEmailProps;
            String userName = appEmailProps.getProperty("com.app.admin.mail.usermailid");
            String password = appEmailProps.getProperty("com.app.admin.mail.usermail.password");
            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", appEmailProps.getProperty("mail.smtp.host"));
            props.put("mail.smtp.port", appEmailProps.getProperty("mail.smtp.port"));
            Session session = Session.getInstance(props,
                    new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(userName, password);
                }
            });
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(userName));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(appMail.getToEmail()));
            message.setSubject(appMail.getSubject());
            message.setContent(appMail.getMessage(), "text/html");
            Transport.send(message);
            LOGGER.info("Email Sent Succesfully.");
        } catch (MessagingException e) {
            LOGGER.info("Error while sending the email. " + e.getMessage());
        }
    }
}
