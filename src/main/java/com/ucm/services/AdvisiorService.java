/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.services;

import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.Advisor;
import java.util.List;

public interface AdvisiorService {

    public int addAdvisor(Advisor advisor) throws ConstraintVilationException;

    public int deleteAdvisor(int advisorId);

    public Advisor getAdvisorWitId(int advisorId);

    public Advisor getAdvisorWitName(String advisorName);

    public List<Advisor> getAllAdvisors();

    public List<Integer> advisorsExistedInConcentrations();
}
