/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.services;

import com.ucm.exception.ConstraintVilationException;
import com.ucm.exception.CourceNotFoundException;
import com.ucm.model.Cource;
import java.util.List;

/**
 *
 * @author Srinu Babu
 */
public interface CourceService {

    public int addCource(Cource cource) throws ConstraintVilationException;

    public int modifyCource(Cource cource) throws CourceNotFoundException;

    public int deleteCource(int courceId) throws CourceNotFoundException;

    public List<Cource> getAllCources();

    public Cource getCourceById(int courceId) throws CourceNotFoundException;

    public Cource getCourceByName(String corceName) throws CourceNotFoundException;
;
}
