/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.services.impl;

import com.app.db.util.AppQueryReader;
import com.app.util.DBUtil;
import com.conn.pool.app.AppConnectionPool;
import com.sun.istack.internal.logging.Logger;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.Concentration;
import com.ucm.model.Cource;
import com.ucm.services.ConcentrationService;
import com.ucm.services.CourceService;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;

/**
 *
 * @author Srinu Babu
 */
public class ConcentrationServiceImpl implements ConcentrationService {

    private static final Logger LOGGER = Logger.getLogger(ConcentrationServiceImpl.class);

    @Override
    public int addConcentation(Concentration concentation) throws ConstraintVilationException {

        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int concentationId = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.concentratioservice.addconcentation"), new String[]{DBUtil.COLUMN_CONCENTATIONS_ID});
            pstm.setString(pos, concentation.getConcentrationName());
            pstm.setString(++pos, concentation.getConcentrationStatus());
            pstm.setString(++pos, concentation.getNotes());
            pstm.setTimestamp(++pos, new Timestamp(new Date().getTime()));
            if (pstm.executeUpdate() > 0) {
                rs = pstm.getGeneratedKeys();
                rs.next();
                concentationId = rs.getInt(1);
                concentation.setId(concentationId);
                addConcentrationCources(concentation);
            }
        } catch (SQLIntegrityConstraintViolationException e) {
            LOGGER.log(Level.SEVERE, "Exception while adding the Concentation " + e.getMessage());
            throw new ConstraintVilationException(e.getMessage());
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Exception while adding the Concentation " + ex.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return concentationId;
    }
    
    @Override
    public int addConcentrationCources(Concentration concentation) {
        
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int conCources = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.concentratioservice.inserticoncentrationwcources"), new String[]{DBUtil.COLUMN_CONCENTATIONS_ID});
            for(Cource cource : concentation.getCources()){
                pstm.setInt(pos, concentation.getId());
                pstm.setInt(++pos, cource.getId());
                pstm.setString(++pos, concentation.getConcentrationStatus());
                pstm.setTimestamp(++pos, new Timestamp(new Date().getTime()));
                pstm.addBatch();
                pos = 1;
            }
            int[] i = pstm.executeBatch();
            conCources = i.length;
            
        } catch (SQLIntegrityConstraintViolationException e) {
            LOGGER.log(Level.SEVERE, "Exception while adding the Concentation in addConcentrationCources" + e.getMessage());
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Exception while adding the Concentation " + ex.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return conCources;
    }
    
    
    @Override
    public Concentration getConcentationWithId(int concenId) {

        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        Concentration concentation = null;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            CourceService cs = new CourceServiceImpl();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.concentratioservice.getconcentationwithid"));
            pstm.setInt(pos, concenId);
            rs = pstm.executeQuery();
            if (rs.next()) {
                concentation = new Concentration();
                concentation.setId(rs.getInt(DBUtil.COLUMN_CONCENTATIONS_ID));
                concentation.setConcentrationName(rs.getString(DBUtil.COLUMN_CONCENTATIONS_NAME));
                concentation.setConcentrationStatus(rs.getString(DBUtil.COLUMN_CONCENTATIONS_STATUS));
                concentation.setNotes(rs.getString(DBUtil.COLUMN_CONCENTATIONS_NOTES));
                concentation.setConcentrationCreatedDate(rs.getDate(DBUtil.COLUMN_CONCENTATIONS_DATE));
                concentation.setCources(cs.getAllCourcesByConcentrationId(rs.getInt(DBUtil.COLUMN_CONCENTATIONS_ID)));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getConcentationWithId method with concentationId:" + concenId + " " + e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return concentation;
    }

    @Override
    public Concentration getConcentationWithName(String conName) {

        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        Concentration concentation = null;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            CourceService cs = new CourceServiceImpl();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.concentratioservice.getconcentationwithname"));
            pstm.setString(pos, conName);
            rs = pstm.executeQuery();
            if (rs.next()) {
                concentation = new Concentration();
                concentation.setId(rs.getInt(DBUtil.COLUMN_CONCENTATIONS_ID));
                concentation.setConcentrationName(rs.getString(DBUtil.COLUMN_CONCENTATIONS_NAME));
                concentation.setConcentrationStatus(rs.getString(DBUtil.COLUMN_CONCENTATIONS_STATUS));
                concentation.setNotes(rs.getString(DBUtil.COLUMN_CONCENTATIONS_NOTES));
                concentation.setConcentrationCreatedDate(rs.getDate(DBUtil.COLUMN_CONCENTATIONS_DATE));
                concentation.setCources(cs.getAllCourcesByConcentrationId(rs.getInt(DBUtil.COLUMN_CONCENTATIONS_ID)));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getConcentationWithName method with concentationName:" + conName + " " + e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return concentation;
    }

    @Override
    public List<Concentration> getAllConcentations() {

        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        List<Concentration> concentations = null;
        try {
            concentations = new ArrayList<>();
            Concentration concentation;
            CourceService cs = new CourceServiceImpl();
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.concentratioservice.getallconcentations"));
            rs = pstm.executeQuery();
            while (rs.next()) {
                concentation = new Concentration();
                concentation.setId(rs.getInt(DBUtil.COLUMN_CONCENTATIONS_ID));
                concentation.setConcentrationName(rs.getString(DBUtil.COLUMN_CONCENTATIONS_NAME));
                concentation.setConcentrationStatus(rs.getString(DBUtil.COLUMN_CONCENTATIONS_STATUS));
                concentation.setNotes(rs.getString(DBUtil.COLUMN_CONCENTATIONS_NOTES));
                concentation.setConcentrationCreatedDate(rs.getDate(DBUtil.COLUMN_CONCENTATIONS_DATE));
                concentation.setCources(cs.getAllCourcesByConcentrationId(rs.getInt(DBUtil.COLUMN_CONCENTATIONS_ID)));
                concentations.add(concentation);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getAllConcentations " + e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return concentations;
    }

    @Override
    public int deleteConcentation(int concenId) {

        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int delecnt = 0;
        try {
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.concentratioservice.deleteconcentrationwithid"));
            pstm.setInt(1, concenId);
            delecnt = pstm.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in deleteConcentation method with concentrationId:"+concenId+" "+ e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return delecnt;
    }

}
