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
import com.ucm.exception.CourceNotFoundException;
import com.ucm.model.Cource;
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
import java.util.logging.Logger;

public class CourceServiceImpl implements CourceService {

    private static final Logger LOGGER = Logger.getLogger(CourceServiceImpl.class.getName());

    @Override
    public int addCource(Cource cource) throws ConstraintVilationException {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int courceId = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.courceservice.addcource"), new String[]{DBUtil.COLUMN_COURCES_ID});
            pstm.setString(pos, cource.getCourceName());
            pstm.setString(++pos, cource.getCourcePrefix());
            pstm.setString(++pos, cource.getCourceCode());
            pstm.setString(++pos, cource.getCourceStatus());
            pstm.setString(++pos, cource.getNotes());
            pstm.setTimestamp(++pos, new Timestamp(new Date().getTime()));
            if (pstm.executeUpdate() > 0) {
                rs = pstm.getGeneratedKeys();
                rs.next();
                courceId = rs.getInt(1);
            }
        } catch (SQLIntegrityConstraintViolationException ex) {
            LOGGER.log(Level.SEVERE, "Exception while adding the cource in addCourceMethod {0}", ex.getMessage());
            throw new ConstraintVilationException(ex.getMessage());
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Exception while adding the cource in addCourceMethod {0}", ex.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return courceId;
    }

    @Override
    public int modifyCource(Cource cource) throws CourceNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int deleteCource(int courceId) throws CourceNotFoundException {
        Connection con = null;
        PreparedStatement pstm = null;
        int deletecnt = 0;
        try {
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.courceservice.deletecourcewithcourceid"));
            pstm.setInt(1, courceId);
            deletecnt = pstm.executeUpdate();
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Exception while deleting the cource in deleteCource {0}", ex.getMessage());
            throw new CourceNotFoundException();
        } finally {
            AppConnectionPool.release(null, pstm, con);
        }
        return deletecnt;
    }

    @Override
    public List<Cource> getAllCources() {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        List<Cource> cources = new ArrayList<>();
        try {
            Cource cource;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.courceservice.getallcources"));
            rs = pstm.executeQuery();
            while (rs.next()) {
                cource = new Cource();
                cource.setId(rs.getInt(DBUtil.COLUMN_COURCES_ID));
                cource.setCourceName(rs.getString(DBUtil.COLUMN_COURCES_NAME));
                cource.setCourcePrefix(rs.getString(DBUtil.COLUMN_COURCES_PREFIX));
                cource.setCourceStatus(rs.getString(DBUtil.COLUMN_COURCES_STATUS));
                cource.setNotes(rs.getString(DBUtil.COLUMN_COURCES_NOTES));
                cource.setCourceCode(rs.getString(DBUtil.COLUMN_COURCES_CODE));
                cource.setCourceCreatedDate(rs.getDate(DBUtil.COLUMN_COURCES_CREATED_DATE));
                cources.add(cource);
            }
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Exception while getting the cources in getAllCources {0}", ex.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return cources;
    }

    @Override
    public Cource getCourceById(int courceId) throws CourceNotFoundException {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        Cource cource = null;
        try {
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.courceservice.getcourcebyid"));
            pstm.setInt(1, courceId);
            rs = pstm.executeQuery();
            if (rs.next()) {
                cource = new Cource();
                cource.setId(rs.getInt(DBUtil.COLUMN_COURCES_ID));
                cource.setCourceName(rs.getString(DBUtil.COLUMN_COURCES_NAME));
                cource.setCourcePrefix(rs.getString(DBUtil.COLUMN_COURCES_PREFIX));
                cource.setCourceStatus(rs.getString(DBUtil.COLUMN_COURCES_STATUS));
                cource.setNotes(rs.getString(DBUtil.COLUMN_COURCES_NOTES));
                cource.setCourceCode(rs.getString(DBUtil.COLUMN_COURCES_CODE));
                cource.setCourceCreatedDate(rs.getDate(DBUtil.COLUMN_COURCES_CREATED_DATE));
            }
            if (cource == null) {
                throw new CourceNotFoundException();
            }

        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Exception while getting the cource in getCourceById {0}", ex.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return cource;
    }

    @Override
    public Cource getCourceByName(String corceName) throws CourceNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Cource> getAllCourcesByConcentrationId(int concentrationId) {
        
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        List<Cource> cources = new ArrayList<>();
        try {
            Cource cource;
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.courceservice.getcourcebyconcentrationid"));
            pstm.setInt(pos, concentrationId);
            rs = pstm.executeQuery();
            while (rs.next()) {
                cource = new Cource();
                cource.setId(rs.getInt(DBUtil.COLUMN_COURCES_ID));
                cource.setCourceName(rs.getString(DBUtil.COLUMN_COURCES_NAME));
                cource.setCourcePrefix(rs.getString(DBUtil.COLUMN_COURCES_PREFIX));
                cource.setCourceStatus(rs.getString(DBUtil.COLUMN_COURCES_STATUS));
                cource.setNotes(rs.getString(DBUtil.COLUMN_COURCES_NOTES));
                cource.setCourceCode(rs.getString(DBUtil.COLUMN_COURCES_CODE));
                cource.setCourceCreatedDate(rs.getDate(DBUtil.COLUMN_COURCES_CREATED_DATE));
                cources.add(cource);
            }
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Exception getAllCourcesByConcentrationId WITH  concentrationId:"+concentrationId, ex.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return cources;
    }

}
