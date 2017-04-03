/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.model;

import java.io.Serializable;
import java.util.Date;

public class CourceConcentration implements Serializable {

    private double id;
    private String status;
    private Date conCourceCreatedDate;
    private Concentration concentration;
    private Cource cource;

    public double getId() {
        return id;
    }

    public void setId(double id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getConCourceCreatedDate() {
        return conCourceCreatedDate;
    }

    public void setConCourceCreatedDate(Date conCourceCreatedDate) {
        this.conCourceCreatedDate = conCourceCreatedDate;
    }

    public Concentration getConcentration() {
        return concentration;
    }

    public void setConcentration(Concentration concentration) {
        this.concentration = concentration;
    }

    public Cource getCource() {
        return cource;
    }

    public void setCource(Cource cource) {
        this.cource = cource;
    }

}
