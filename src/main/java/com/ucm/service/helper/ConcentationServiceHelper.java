/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ucm.service.helper;

import com.app.util.DBUtil;
import com.app.util.RequestStatus;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.Concentration;
import com.ucm.services.ConcentrationService;
import com.ucm.services.impl.ConcentrationServiceImpl;
import java.util.List;

/**
 *
 * @author Srinu Babu
 */
public class ConcentationServiceHelper {

    public RequestStatus addConcentration(Concentration concentation) {

        RequestStatus response = new RequestStatus();
        try {
            ConcentrationService conService = new ConcentrationServiceImpl();
            int advId = conService.addConcentation(concentation);
            if (advId > 0) {
                response.setSuccess(true);
                response.setMessage("Concentration added successfully.");
                response.setId(advId);
            } else {
                response.setMessage("Concentration not added.");
                response.setId(advId);
            }
        } catch (ConstraintVilationException cve) {
            response.setMessage(DBUtil.getCustomDBMessage(cve.getMessage()));
            response.setId(0);
        }
        return response;
    }
    
    public RequestStatus deleteConcentration(int concentationId){
        
        RequestStatus response = new RequestStatus();
        
        int deleteCnt = new ConcentrationServiceImpl().deleteConcentation(concentationId);
        
        if(deleteCnt > 0){
            response.setSuccess(true);
            response.setMessage("Concentration deleted successfully");
            response.setId(concentationId);
        }else{
            response.setMessage("Concentration not deleted");
            response.setId(concentationId);
        }
        return response;
    }
    public Concentration getConcentrationWitId(int concentationId){
        return new ConcentrationServiceImpl().getConcentationWithId(concentationId);
    }
    public Concentration getConcentrationWitName(String concentationName){
        return new ConcentrationServiceImpl().getConcentationWithName(concentationName);
    }
    public List<Concentration> getAllConcentrations(){
        
        return new ConcentrationServiceImpl().getAllConcentations();
    }
}
