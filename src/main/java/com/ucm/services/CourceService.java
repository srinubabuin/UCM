/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.services;

import com.ucm.exception.ConstraintVilationException;
import com.ucm.exception.ObjectNotFoundException;
import com.ucm.model.Cource;
import java.util.List;

public interface CourceService {

    public int addCource(Cource cource) throws ConstraintVilationException;

    public int modifyCource(Cource cource) throws ObjectNotFoundException, ConstraintVilationException;

    public int deleteCource(int courceId) throws ObjectNotFoundException;

    public List<Cource> getAllCources();

    public Cource getCourceById(int courceId) throws ObjectNotFoundException;

    public Cource getCourceByName(String corceName) throws ObjectNotFoundException;
    
    public List<Cource> getAllCourcesByConcentrationId(int concentrationId);
}
