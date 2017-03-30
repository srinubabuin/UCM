/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.user.service;

import com.app.util.ApplicationUtil;
import com.app.util.DBUtil;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.Cource;
import com.ucm.services.CourceService;
import com.ucm.services.impl.CourceServiceImpl;
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
                response.put(ApplicationUtil.MESSAGE, "Cource added successfully");
                response.put(ApplicationUtil.ID, courceId);
            }else{
                response.put(ApplicationUtil.SUCCESS, false);
                response.put(ApplicationUtil.MESSAGE, "Cource not added");
                response.put(ApplicationUtil.ID, courceId);
            }
        } catch (ConstraintVilationException cve) {
            try {
                response.put(ApplicationUtil.SUCCESS, false);
                response.put(ApplicationUtil.MESSAGE, DBUtil.getCustomCourceDBMessage(cve.getMessage()));
                response.put(ApplicationUtil.ID, 0);
            } catch (JSONException ex) {
                Logger.getLogger(CourceServiceHelper.class.getName()).log(Level.SEVERE, null, ex);
            }
                
        }catch(JSONException je){
        
        }
        return response;
    }
}