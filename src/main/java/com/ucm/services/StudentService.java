/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.ucm.services;

import com.ucm.exception.ConstraintVilationException;
import com.ucm.exception.ObjectNotFoundException;
import com.ucm.model.Student;

import java.util.List;

public interface StudentService {

    public int addStudent(Student student) throws ConstraintVilationException;

    public int modifyStudent(Student student) throws ConstraintVilationException, ObjectNotFoundException;

    public int deleteStudent(int studentId);

    public Student getStudent(String studentId, String type);

    public Student getStudentByName(String studentName);

    public List<Student> getAllStudents();

    public int updateStudentQuestionnaires(Student student) throws ObjectNotFoundException;

    public int updatePrerequisite(Student student) throws ObjectNotFoundException;

    public int updateNotes(Student student) throws ObjectNotFoundException;
}
