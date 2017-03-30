/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.service.helper;

import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.Cource;
import com.ucm.services.CourceService;
import com.ucm.services.impl.CourceServiceImpl;
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
            
        } catch (ConstraintVilationException cve) {
            
        }
        return response;
    }
}
