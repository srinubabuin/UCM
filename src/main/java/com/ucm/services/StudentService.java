/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ucm.services;

import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.Student;
import java.util.List;

/**
 *
 * @author Srinu Babu
 */
public interface StudentService {
    
    public int addStudent(Student student)throws ConstraintVilationException;
    public int deleteStudent(int studentId);
    public Student getStudentById(int studentId);
    public Student getStudentByName(String studentName);
    public List<Student> getAllStudents();
}
