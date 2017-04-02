/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.service.helper;

import com.app.util.DBUtil;
import com.app.util.RequestStatus;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.exception.CourceNotFoundException;
import com.ucm.model.Cource;
import com.ucm.services.CourceService;
import com.ucm.services.impl.CourceServiceImpl;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 * @author Srinu Babu
 */
public class CourceServiceHelper {

    public RequestStatus addCource(Cource cource) {

        RequestStatus response = new RequestStatus();
        try {
            CourceService courceService = new CourceServiceImpl();
            int courceId = courceService.addCource(cource);
            if (courceId > 0) {
                response.setSuccess(true);
                response.setMessage("Cource added successfully.");
                response.setId(courceId);
            } else {
                response.setMessage("Cource not added.");
                response.setId(courceId);
            }
        } catch (ConstraintVilationException cve) {
                response.setMessage(DBUtil.getCustomDBMessage(cve.getMessage()));
                response.setId(0);
        }
        return response;
    }

    public List<Cource> getAllCources() {

        return new CourceServiceImpl().getAllCources();
    }

    public Cource getCourceById(int courceId) {
        Cource cource = null;
        try {
            cource = new CourceServiceImpl().getCourceById(courceId);
        } catch (CourceNotFoundException ce) {
            Logger.getLogger(CourceServiceHelper.class.getName()).log(Level.SEVERE, null, ce);
        }
        return cource;
    }

    public RequestStatus deleteCourceWithId(int courceId) {

        RequestStatus response = new RequestStatus();
        try {
            int deletedCnt = new CourceServiceImpl().deleteCource(courceId);
            if (deletedCnt > 0) {
                response.setSuccess(true);
                response.setMessage("Cource deleted successfully.");
                response.setId(courceId);
            } else {
                response.setMessage("Cource not deleted.");
                response.setId(courceId);
            }
        } catch (CourceNotFoundException cnfe) {
                response.setMessage(cnfe.getMessage());
                response.setId(courceId);
        }
        return response;
    }
}
