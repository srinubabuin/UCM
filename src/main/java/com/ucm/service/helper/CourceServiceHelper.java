/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.service.helper;

import com.app.util.ApplicationUtil;
import com.app.util.DBUtil;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.exception.CourceNotFoundException;
import com.ucm.model.Cource;
import com.ucm.services.CourceService;
import com.ucm.services.impl.CourceServiceImpl;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Srinu Babu
 */
public class CourceServiceHelper {

    public JSONObject addCource(Cource cource) {

        JSONObject response = new JSONObject();
        try {
            CourceService courceService = new CourceServiceImpl();
            int courceId = courceService.addCource(cource);
            if(courceId > 0){
                response.put(ApplicationUtil.SUCCESS, true);
                response.put(ApplicationUtil.MESSAGE, "Cource added successfully.");
                response.put(ApplicationUtil.ID, courceId);
            }else{
                response.put(ApplicationUtil.SUCCESS, false);
                response.put(ApplicationUtil.MESSAGE, "Cource not added.");
                response.put(ApplicationUtil.ID, courceId);
            }
        } catch (ConstraintVilationException  | JSONException cve) {
            try {
                response.put(ApplicationUtil.SUCCESS, false);
                response.put(ApplicationUtil.MESSAGE, DBUtil.getCustomCourceDBMessage(cve.getMessage()));
                response.put(ApplicationUtil.ID, 0);
            } catch (JSONException ex) {
                Logger.getLogger(CourceServiceHelper.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return response;
    }
    
    public List<Cource> getAllCources(){
    
        return new CourceServiceImpl().getAllCources();
    }
    
    public JSONObject deleteCourceWithId(int courceId){
        
        JSONObject response = new JSONObject();
        try{
            int deletedCnt = new CourceServiceImpl().deleteCource(courceId);
            if(deletedCnt > 0){
                response.put(ApplicationUtil.SUCCESS, true);
                response.put(ApplicationUtil.MESSAGE, "Cource deleted successfully.");
                response.put(ApplicationUtil.ID, courceId);
            }else{
                response.put(ApplicationUtil.SUCCESS, false);
                response.put(ApplicationUtil.MESSAGE, "Cource not deleted.");
                response.put(ApplicationUtil.ID, courceId);
            }
        }catch(CourceNotFoundException | JSONException cnfe){
              try {
                response.put(ApplicationUtil.SUCCESS, false);
                response.put(ApplicationUtil.MESSAGE, cnfe.getMessage());
                response.put(ApplicationUtil.ID, 0);
            } catch (JSONException ex) {
                Logger.getLogger(CourceServiceHelper.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return response;
    }
}
