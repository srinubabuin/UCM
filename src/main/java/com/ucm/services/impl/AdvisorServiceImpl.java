/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.services.impl;

import com.app.db.util.AppQueryReader;
import com.app.util.DBUtil;
import com.conn.pool.app.AppConnectionPool;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.Advisor;
import com.ucm.services.AdvisiorService;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import com.sun.istack.internal.logging.Logger;
import com.ucm.model.Concentration;
import com.ucm.services.ConcentrationService;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;

/**
 *
 * @author Srinu Babu
 */
public class AdvisorServiceImpl implements AdvisiorService {

    private static final Logger LOGGER = Logger.getLogger(AdvisorServiceImpl.class);
    @Override
    public int addAdvisor(Advisor advisor) throws ConstraintVilationException {
        
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int advId = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.advisorservice.addadvisor"), new String[]{DBUtil.COLUMN_ADVISORS_ID});
            pstm.setString(pos, advisor.getLoginId());
            pstm.setInt(++pos, advisor.getConcentration().getId());
            pstm.setString(++pos, advisor.getEmail());
            pstm.setString(++pos, advisor.getName());
            pstm.setString(++pos, advisor.getStatus());
            pstm.setString(++pos, advisor.getPhone());
            pstm.setString(++pos, advisor.getNotes());
            pstm.setTimestamp(++pos, new Timestamp(new Date().getTime()));
            if(pstm.executeUpdate() > 0){
                rs = pstm.getGeneratedKeys();
                rs.next();
                advId = rs.getInt(1);
            }
        } catch (SQLIntegrityConstraintViolationException e) {
            LOGGER.log(Level.SEVERE, "Exception while adding advisor method addAdvisor " + e.getMessage());
            throw new ConstraintVilationException(e.getMessage());
        }catch(SQLException se){
            LOGGER.log(Level.SEVERE, "Exception while adding advisor method addAdvisor " + se.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return advId;
    }

    @Override
    public int deleteAdvisor(int advisorId) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int delecnt = 0;
        try {
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.advisorservice.deleteadvisor"));
            pstm.setInt(1, advisorId);
            delecnt = pstm.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in deleteAdvisor method with advisorId:"+advisorId+" "+ e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return delecnt;
    }

    @Override
    public Advisor getAdvisorWitId(int advisorId) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        Advisor advisor = null;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.advisorservice.getadvisorbyid"));
            pstm.setInt(pos, advisorId);
            rs = pstm.executeQuery();
            if (rs.next()) {
                advisor = new Advisor();
                Concentration concentration = new Concentration();
                concentration.setId(rs.getInt(DBUtil.COLUMN_ADVISORS_CONCENTATION_ID));
                concentration.setConcentrationName(rs.getString(DBUtil.COLUMN_ADVISORS_CON_NAME));
                concentration.setConcentrationStatus(rs.getString(DBUtil.COLUMN_ADVISORS_CON_STATUS));
                concentration.setConcentrationCreatedDate(rs.getDate(DBUtil.COLUMN_ADVISORS_CON_CREATED_DATE));
                concentration.setNotes(rs.getString(DBUtil.COLUMN_ADVISORS_CON_NOTES));
                advisor.setConcentration(concentration);
                advisor.setId(rs.getInt(DBUtil.COLUMN_ADVISORS_ID));
                advisor.setLoginId(rs.getString(DBUtil.COLUMN_ADVISORS_LOGIN_ID));
                advisor.setEmail(rs.getString(DBUtil.COLUMN_ADVISORS_MAIL));
                advisor.setStatus(rs.getString(DBUtil.COLUMN_ADVISORS_STATUS));
                advisor.setPhone(rs.getString(DBUtil.COLUMN_ADVISORS_PHONE));
                advisor.setNotes(rs.getString(DBUtil.COLUMN_ADVISORS_NOTES));
                advisor.setCreatedDate(rs.getDate(DBUtil.COLUMN_ADVISORS_DATE));
                advisor.setName(rs.getString(DBUtil.COLUMN_ADVISORS_NAME));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getConcentationWithId method with advisorId:" + advisorId + " " + e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return advisor;
    }

    @Override
    public Advisor getAdvisorWitName(String advisorName) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        Advisor advisor = null;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.advisorservice.getadvisorbyname"));
            pstm.setString(pos, advisorName);
            rs = pstm.executeQuery();
            if (rs.next()) {
                advisor = new Advisor();
                Concentration concentration = new Concentration();
                concentration.setId(rs.getInt(DBUtil.COLUMN_ADVISORS_CONCENTATION_ID));
                concentration.setConcentrationName(rs.getString(DBUtil.COLUMN_ADVISORS_CON_NAME));
                concentration.setConcentrationStatus(rs.getString(DBUtil.COLUMN_ADVISORS_CON_STATUS));
                concentration.setConcentrationCreatedDate(rs.getDate(DBUtil.COLUMN_ADVISORS_CON_CREATED_DATE));
                concentration.setNotes(rs.getString(DBUtil.COLUMN_ADVISORS_CON_NOTES));
                advisor.setConcentration(concentration);
                advisor.setId(rs.getInt(DBUtil.COLUMN_ADVISORS_ID));
                advisor.setLoginId(rs.getString(DBUtil.COLUMN_ADVISORS_LOGIN_ID));
                advisor.setEmail(rs.getString(DBUtil.COLUMN_ADVISORS_MAIL));
                advisor.setStatus(rs.getString(DBUtil.COLUMN_ADVISORS_STATUS));
                advisor.setPhone(rs.getString(DBUtil.COLUMN_ADVISORS_PHONE));
                advisor.setNotes(rs.getString(DBUtil.COLUMN_ADVISORS_NOTES));
                advisor.setCreatedDate(rs.getDate(DBUtil.COLUMN_ADVISORS_DATE));
                advisor.setName(rs.getString(DBUtil.COLUMN_ADVISORS_NAME));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getConcentationWithId method with advisorName:" + advisorName + " " + e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return advisor;
    }

    @Override
    public List<Advisor> getAllAdvisors() {
        
         Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        List<Advisor> advisors = null;
        try {
            Advisor advisor;
            Concentration concentration;
            advisors = new ArrayList<>();
            
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.advisorservice.getalladvisors"));
            rs = pstm.executeQuery();
            while (rs.next()) {
                advisor = new Advisor();
                concentration = new Concentration();
                concentration.setId(rs.getInt(DBUtil.COLUMN_ADVISORS_CONCENTATION_ID));
                concentration.setConcentrationName(rs.getString(DBUtil.COLUMN_ADVISORS_CON_NAME));
                concentration.setConcentrationStatus(rs.getString(DBUtil.COLUMN_ADVISORS_CON_STATUS));
                concentration.setConcentrationCreatedDate(rs.getDate(DBUtil.COLUMN_ADVISORS_CON_CREATED_DATE));
                concentration.setNotes(rs.getString(DBUtil.COLUMN_ADVISORS_CON_NOTES));
                advisor.setConcentration(concentration);
                advisor.setId(rs.getInt(DBUtil.COLUMN_ADVISORS_ID));
                advisor.setLoginId(rs.getString(DBUtil.COLUMN_ADVISORS_LOGIN_ID));
                advisor.setEmail(rs.getString(DBUtil.COLUMN_ADVISORS_MAIL));
                advisor.setStatus(rs.getString(DBUtil.COLUMN_ADVISORS_STATUS));
                advisor.setPhone(rs.getString(DBUtil.COLUMN_ADVISORS_PHONE));
                advisor.setNotes(rs.getString(DBUtil.COLUMN_ADVISORS_NOTES));
                advisor.setCreatedDate(rs.getDate(DBUtil.COLUMN_ADVISORS_DATE));
                advisor.setName(rs.getString(DBUtil.COLUMN_ADVISORS_NAME));
                advisors.add(advisor);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getAllAdvisors method " + e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return advisors;
    }

}
