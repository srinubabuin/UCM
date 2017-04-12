/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.model;

import java.io.Serializable;
import java.util.Date;

public class Course implements Serializable {

    private int id;
    private String courseName;
    private String coursePrefix;
    private String courseCode;
    private String courseStatus;
    private String notes;
    private Date courseCreatedDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCoursePrefix() {
        return coursePrefix;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseStatus() {
        return courseStatus;
    }

    public void setCourseStatus(String courseStatus) {
        this.courseStatus = courseStatus;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Date getCourseCreatedDate() {
        return courseCreatedDate;
    }

    public void setCourseCreatedDate(Date courseCreatedDate) {
        this.courseCreatedDate = courseCreatedDate;
    }

}
