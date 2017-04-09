/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.service.helper;

import com.app.util.DBUtil;
import com.app.util.RequestStatus;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.exception.ObjectNotFoundException;
import com.ucm.model.Student;
import com.ucm.services.StudentService;
import com.ucm.services.impl.StudentServiceImpl;

import java.util.List;

public class StudentServiceHelper {

    public RequestStatus addStudent(Student student) {

        RequestStatus response = new RequestStatus();
        try {
            StudentService studentService = new StudentServiceImpl();
            int studentId = studentService.addStudent(student);
            if (studentId > 0) {
                response.setSuccess(true);
                response.setMessage("Student added successfully.");
                response.setId(studentId);
            } else {
                response.setMessage("Student not added.");
                response.setId(studentId);
            }
        } catch (ConstraintVilationException cve) {
            response.setMessage(DBUtil.getCustomDBMessage(cve.getMessage()));
            response.setId(0);
        }
        return response;
    }

    public RequestStatus deleteStudent(int studentId) {

        RequestStatus response = new RequestStatus();
        int deleteCnt = new StudentServiceImpl().deleteStudent(studentId);
        if (deleteCnt > 0) {
            response.setSuccess(true);
            response.setMessage("Student deleted successfully");
            response.setId(studentId);
        } else {
            response.setMessage("Student not deleted");
            response.setId(studentId);
        }
        return response;
    }

    public List<Student> getAllStudents() {

        return new StudentServiceImpl().getAllStudents();
    }

    public Student getStudentById(int studentId) {

        return new StudentServiceImpl().getStudent(String.valueOf(studentId), "id");
    }

    public Student getStudentByLoginId(String loginId) {

        return new StudentServiceImpl().getStudent(loginId, "loginid");
    }

    public RequestStatus updateStudentQuestionnaires(Student student) {

        RequestStatus response = new RequestStatus();
        try {
            StudentService studentService = new StudentServiceImpl();
            int studentId = studentService.updateStudentQuestionnaires(student);
            if (studentId > 0) {
                response.setSuccess(true);
                response.setMessage("Student Questionnaires updated successfully.");
                response.setId(studentId);
            } else {
                response.setMessage("Student Questionnaires not updated.");
                response.setId(studentId);
            }
        } catch (ObjectNotFoundException cve) {
            response.setMessage(DBUtil.getCustomDBMessage("STU_NOT_FOUND"));
            response.setId(0);
        }
        return response;
    }
}
