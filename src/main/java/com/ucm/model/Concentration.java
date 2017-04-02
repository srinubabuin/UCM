/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ucm.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Srinu Babu
 */
public class Concentration implements Serializable {

    private int id;
    private String concentrationName;
    private String concentrationStatus;
    private String notes;
    private Date concentrationCreatedDate;
    private List<Cource> cources;
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getConcentrationName() {
        return concentrationName;
    }

    public void setConcentrationName(String concentrationName) {
        this.concentrationName = concentrationName;
    }

    public String getConcentrationStatus() {
        return concentrationStatus;
    }

    public void setConcentrationStatus(String concentrationStatus) {
        this.concentrationStatus = concentrationStatus;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public Date getConcentrationCreatedDate() {
        return concentrationCreatedDate;
    }

    public void setConcentrationCreatedDate(Date concentrationCreatedDate) {
        this.concentrationCreatedDate = concentrationCreatedDate;
    }

    public List<Cource> getCources() {
        return cources;
    }

    public void setCources(List<Cource> cources) {
        this.cources = cources;
    }
    
}
