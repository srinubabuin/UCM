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

    public RequestStatus modifyStudent(Student student) {

        RequestStatus response = new RequestStatus();
        try {
            StudentService advService = new StudentServiceImpl();
            int advId = advService.modifyStudent(student);
            if (advId > 0) {
                response.setSuccess(true);
                response.setMessage("Student updated successfully.");
                response.setId(advId);
            } else {
                response.setMessage("Student not updated.");
                response.setId(advId);
            }

        } catch (ObjectNotFoundException oe) {
            response.setMessage(DBUtil.getCustomDBMessage("STU_NOT_FOUND"));
            response.setId(0);
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

        return new StudentServiceImpl().getAllStudents("");
    }

    public List<Student> codeOfConductNotAcceptedStudents() {

        return new StudentServiceImpl().getAllStudents("WHERE STU.ACCEPTEDCODEOFCONDUCT IS NULL");
    }

    public List<Student> getAllStudentNotes() {

        return new StudentServiceImpl().getAllStudents("WHERE STU.NOTES_UPDATED IS NOT NULL ORDER BY STU.NOTES_UPDATED ASC");
    }

    public List<Student> getAllStudentsByConcentration(int concentrationId) {
        return new StudentServiceImpl().getAllStudents("WHERE STU.CONCENTRATION_ID = " + concentrationId);
    }

    public List<Student> codeOfConductNotAcceptedStudentsByConcentration(int concentrationId) {

        return new StudentServiceImpl().getAllStudents("WHERE STU.CONCENTRATION_ID = " + concentrationId + " AND STU.ACCEPTEDCODEOFCONDUCT IS NULL");
    }
    
    public List<Student> codeOfConductCompletedStudentsByConcentration(int concentrationId) {
        return new StudentServiceImpl().getAllStudents("WHERE STU.CONCENTRATION_ID = " + concentrationId + " AND STU.ACCEPTEDCODEOFCONDUCT IS NOT NULL");
    }

    public List<Student> getAllStudentNotesByConcentration(int concentrationId) {

        return new StudentServiceImpl().getAllStudents("WHERE STU.CONCENTRATION_ID = " + concentrationId + " AND STU.NOTES_UPDATED IS NOT NULL ORDER BY STU.NOTES_UPDATED ASC");
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

    public RequestStatus updatePrerequisite(Student student) {

        RequestStatus response = new RequestStatus();
        try {
            StudentService studentService = new StudentServiceImpl();
            int studentId = studentService.updatePrerequisite(student);
            if (studentId > 0) {
                response.setSuccess(true);
                response.setMessage("Student Prerequisite updated successfully.");
                response.setId(studentId);
            } else {
                response.setMessage("Student Prerequisite not updated.");
                response.setId(studentId);
            }
        } catch (ObjectNotFoundException cve) {
            response.setMessage(DBUtil.getCustomDBMessage("STU_NOT_FOUND"));
            response.setId(0);
        }
        return response;
    }

    public RequestStatus updateNotes(Student student) {

        RequestStatus response = new RequestStatus();
        try {
            StudentService studentService = new StudentServiceImpl();
            int studentId = studentService.updateNotes(student);
            if (studentId > 0) {
                response.setSuccess(true);
                response.setMessage("Student Notes updated successfully.");
                response.setId(studentId);
            } else {
                response.setMessage("Student Notes not updated.");
                response.setId(studentId);
            }
        } catch (ObjectNotFoundException cve) {
            response.setMessage(DBUtil.getCustomDBMessage("STU_NOT_FOUND"));
            response.setId(0);
        }
        return response;
    }
}
