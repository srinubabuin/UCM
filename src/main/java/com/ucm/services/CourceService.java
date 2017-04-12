/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.services;

import com.ucm.exception.ConstraintVilationException;
import com.ucm.exception.ObjectNotFoundException;
import com.ucm.model.Course;
import java.util.List;

public interface CourceService {

    public int addCource(Course cource) throws ConstraintVilationException;

    public int modifyCource(Course cource) throws ObjectNotFoundException, ConstraintVilationException;

    public int deleteCource(int courceId) throws ObjectNotFoundException;

    public List<Course> getAllCources();

    public Course getCourceById(int courceId) throws ObjectNotFoundException;

    public Course getCourceByName(String corceName) throws ObjectNotFoundException;
    
    public List<Course> getAllCourcesByConcentrationId(int concentrationId);
}
