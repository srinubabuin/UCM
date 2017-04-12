/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.service.helper;

import com.app.util.DBUtil;
import com.app.util.RequestStatus;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.exception.ObjectNotFoundException;
import com.ucm.model.Course;
import com.ucm.services.CourceService;
import com.ucm.services.impl.CourceServiceImpl;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


public class CourceServiceHelper {

    public RequestStatus addCource(Course cource) {

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

    public RequestStatus modifyCource(Course cource) {

        RequestStatus response = new RequestStatus();
        CourceService courceService;
        try {
            courceService = new CourceServiceImpl();
            int courceUpdateInd = courceService.modifyCource(cource);
            if (courceUpdateInd > 0) {
                response.setSuccess(true);
                response.setMessage("Cource updated successfully.");
                response.setId(courceUpdateInd);
            } else {
                response.setMessage("Cource not updated.");
                response.setId(courceUpdateInd);
            }
        } catch (ConstraintVilationException cve) {
            response.setMessage(DBUtil.getCustomDBMessage(cve.getMessage()));
            response.setId(0);
        } catch (ObjectNotFoundException cve) {
            response.setMessage(DBUtil.getCustomDBMessage("COUR_NOT_FOUND"));
            response.setId(0);
        }
        return response;
    }

    public List<Course> getAllCources() {

        return new CourceServiceImpl().getAllCources();
    }

    public Course getCourceById(int courceId) {
        Course cource = null;
        try {
            cource = new CourceServiceImpl().getCourceById(courceId);
        } catch (ObjectNotFoundException ce) {
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
        } catch (ObjectNotFoundException cnfe) {
            response.setMessage(cnfe.getMessage());
            response.setId(courceId);
        }
        return response;
    }
}
