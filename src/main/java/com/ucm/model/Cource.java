/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ucm.model;

import java.io.Serializable;
import java.util.Date;
import javax.ws.rs.QueryParam;

/**
 *
 * @author Srinu Babu
 */
public class Cource implements Serializable {

    @QueryParam("id")
    private int id;
    private String courceName;
    private String courcePrefix;
    private String courceCode;
    private String courceStatus;
    private Date courceCreatedDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCourceName() {
        return courceName;
    }

    public void setCourceName(String courceName) {
        this.courceName = courceName;
    }

    public String getCourcePrefix() {
        return courcePrefix;
    }

    public void setCourcePrefix(String courcePrefix) {
        this.courcePrefix = courcePrefix;
    }

    public String getCourceCode() {
        return courceCode;
    }

    public void setCourceCode(String courceCode) {
        this.courceCode = courceCode;
    }

    public String getCourceStatus() {
        return courceStatus;
    }

    public void setCourceStatus(String courceStatus) {
        this.courceStatus = courceStatus;
    }

    public Date getCourceCreatedDate() {
        return courceCreatedDate;
    }

    public void setCourceCreatedDate(Date courceCreatedDate) {
        this.courceCreatedDate = courceCreatedDate;
    }
     
}
