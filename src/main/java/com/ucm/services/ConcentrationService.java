/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ucm.services;

import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.Concentration;
import java.util.List;

public interface ConcentrationService {

    public int addConcentation(Concentration concentation) throws ConstraintVilationException;
    public int addConcentrationCources(Concentration concentation);
    public Concentration getConcentationWithId(int concenId);
    public Concentration getConcentationWithName(String conName);
    public List<Concentration> getAllConcentations();
    public int deleteConcentation(int concenId);
}
