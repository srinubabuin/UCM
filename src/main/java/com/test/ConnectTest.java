/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.test;

import com.app.db.util.UCMDBUtil;
import com.ucm.model.Cource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;

/**
 *
 * @author Srinu Babu
 */
public class ConnectTest {

    
    public static void main(String[] args) {
        
        try{
        Class.forName("oracle.jdbc.driver.OracleDriver");
        Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE", "ucm","ucm");
        try{
            CourceTest(con);
        }catch(Exception e){
            System.out.println("e.getMessage() "+ e.getMessage());
        }
        }catch(Exception ex){
            ex.printStackTrace();
        }
    }
    
    public static void CourceTest(Connection con) throws Exception{
        
        PreparedStatement pstm = null;
        ResultSet rs = null;
        try{
            int pos =1;
        Cource cource = new Cource();
        cource.setCourceName("adv Java");
        cource.setCourceCreatedDate(new Date());
        cource.setCourcePrefix("A1");
        cource.setCourceCode("AAA1");
        cource.setCourceStatus("Active");
        pstm = con.prepareStatement("INSERT INTO COURCES1(\"NAME\",\"PREFIX\",\"CODE\",\"STATUS\",\"CREATED_DATE\") VALUES (?,?,?,?,?)", new String[]{UCMDBUtil.COLUMN_COURCES_ID});
          java.util.Date date = new java.util.Date();
            long t = date.getTime();
            java.sql.Timestamp sqlTimestamp = new java.sql.Timestamp(t);
            pstm.setString(pos, cource.getCourceName());
            pstm.setString(++pos, cource.getCourcePrefix());
            pstm.setString(++pos, cource.getCourceCode());
            pstm.setString(++pos, cource.getCourceStatus());
            pstm.setTimestamp(++pos, sqlTimestamp);
            if (pstm.executeUpdate() > 0) {
                rs = pstm.getGeneratedKeys();
                rs.next();
                int courceId = rs.getInt(1);
            }
        } catch (SQLIntegrityConstraintViolationException  ex) {
            throw new Exception(ex.getMessage());
        }
        
    }
}
