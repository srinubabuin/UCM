/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ucm.service.helper;

import com.app.util.DBUtil;
import com.app.util.RequestStatus;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.Advisor;
import com.ucm.services.AdvisiorService;
import com.ucm.services.impl.AdvisorServiceImpl;
import java.util.List;

/**
 *
 * @author Srinu Babu
 */
public class AdvisorServiceHelper {

    public RequestStatus addAdvisor(Advisor advisor) {

        RequestStatus response = new RequestStatus();
        try {
            AdvisiorService advService = new AdvisorServiceImpl();
            int advId = advService.addAdvisor(advisor);
            if (advId > 0) {
                response.setSuccess(true);
                response.setMessage("Advisor added successfully.");
                response.setId(advId);
            } else {
                response.setMessage("Advisor not added.");
                response.setId(advId);
            }
        } catch (ConstraintVilationException cve) {
            response.setMessage(DBUtil.getCustomDBMessage(cve.getMessage()));
            response.setId(0);
        }
        return response;
    }
    
    public RequestStatus deleteAdvisor(int advisorId){
        
        RequestStatus response = new RequestStatus();
        
        int deleteCnt = new AdvisorServiceImpl().deleteAdvisor(advisorId);
        
        if(deleteCnt > 0){
            response.setSuccess(true);
            response.setMessage("Advisor deleted successfully");
            response.setId(advisorId);
        }else{
            response.setMessage("Advisor not deleted");
            response.setId(advisorId);
        }
        return response;
    }
    public Advisor getAdvisorWitId(int advisorId){
        return new AdvisorServiceImpl().getAdvisorWitId(advisorId);
    }
    public Advisor getAdvisorWitName(String advisorName){
        return new AdvisorServiceImpl().getAdvisorWitName(advisorName);
    }
    public List<Advisor> getAllAdvisors(){
        
        return new AdvisorServiceImpl().getAllAdvisors();
    }
}