/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.services.impl;

import com.app.db.util.AppQueryReader;
import com.app.db.util.UCMDBUtil;
import com.conn.pool.app.AppConnectionPool;
import com.ucm.exception.CourceNotFoundException;
import com.ucm.model.Cource;
import com.ucm.services.CourceService;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Srinu Babu
 */
public class CourceServiceImpl implements CourceService {

    private static final Logger LOGGER = Logger.getLogger(CourceServiceImpl.class.getName());

    @Override
    public int addCource(Cource cource) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int courceId = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.addcource"), new String[]{UCMDBUtil.COLUMN_COURCES_ID});
            pstm.setString(pos, cource.getCourceName());
            pstm.setString(++pos, cource.getCourcePrefix());
            pstm.setString(++pos, cource.getCourceCode());
            pstm.setTimestamp(++pos, new Timestamp(System.currentTimeMillis()));
            if (pstm.executeUpdate() > 0) {
                rs = pstm.getGeneratedKeys();
                rs.next();
                courceId = rs.getInt(1);
            }
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
    public int deleteCource(Cource cource) throws CourceNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Cource> getAllCources() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Cource getCourceById(int courceId) throws CourceNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Cource getCourceByName(String corceName) throws CourceNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
