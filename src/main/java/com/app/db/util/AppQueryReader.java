/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.db.util;

import com.app.util.ApplicationUtil;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;


public class AppQueryReader {
    
private static final LinkedProperties queryProperties = new LinkedProperties();
private static final Logger log = Logger.getLogger(AppQueryReader.class.getName());

   public static void loadProperties(String webPath) {
      try {
         String propFileDir = webPath + "WEB-INF" + ApplicationUtil.APP_FILE_SEPERATOR + "configuration" + ApplicationUtil.APP_FILE_SEPERATOR + "dbqueries";
         log.log(Level.SEVERE, propFileDir);
         queryProperties.load(new FileInputStream(new File(propFileDir + ApplicationUtil.APP_FILE_SEPERATOR + "App_Oracle_Queries.properties")));
      } catch (IOException e) {
         // TODO: handle exception
      }
   }

   public static Properties getQueryProperties() {
      return queryProperties;
   }

   public static String getDBQuery(String qKey) {
      String query = (String) queryProperties.get(qKey);
      return query;
   }
}