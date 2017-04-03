/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.services.impl;

import com.app.db.util.AppQueryReader;
import com.app.email.AppEmail;
import com.app.email.EmailSenderThread;
import com.app.util.ApplicationUtil;
import com.app.util.DBUtil;
import com.app.util.Role;
import com.conn.pool.app.AppConnectionPool;
import com.ucm.email.EmailMessageBuilder;
import com.ucm.exception.ConstraintVilationException;
import com.ucm.model.AppUser;
import com.ucm.model.Concentration;
import com.ucm.model.Student;
import com.ucm.services.StudentService;
import com.ucm.services.UserLoginService;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Srinu Babu
 */
public class StudentServiceImpl implements StudentService {

    private static final Logger LOGGER = Logger.getLogger(StudentServiceImpl.class.getName());

    @Override
    public int addStudent(Student student) throws ConstraintVilationException {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int studentId = 0;
        try {
            int pos = 1;
            UserLoginService userService = new UserLoginServiceImpl();
            AppUser appUser = ApplicationUtil.getDynamicLoginCredentials();
            appUser.setRole(Role.STUDENT);
            int loginId = userService.insertUser(appUser);
            if(loginId > 0){
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.addstudent"), new String[]{DBUtil.COLUMN_STUDENTS_ID});
            pstm.setString(pos, appUser.getLoginId());
            pstm.setString(++pos, student.getFirstName());
            pstm.setString(++pos, student.getLastName());
            pstm.setString(++pos, student.getEmail());
            pstm.setString(++pos, student.getSecondaryEmail());
            pstm.setString(++pos, student.getPhoneNumber());
            pstm.setString(++pos, student.getAddress());
            pstm.setString(++pos, student.getScores());
            pstm.setInt(++pos, student.getConcentration().getId());
            pstm.setString(++pos, student.getStudentStatus());
            pstm.setTimestamp(++pos, new Timestamp(new Date().getTime()));
            pstm.setString(++pos, student.getStatus());
            pstm.setString(++pos, student.getTestDetails());
            pstm.setString(++pos, student.getAcceptedCodeOfConduct());
            pstm.setString(++pos, student.getNotes());
            pstm.setTimestamp(++pos, new Timestamp(new Date().getTime()));
            if (pstm.executeUpdate() > 0) {
                rs = pstm.getGeneratedKeys();
                rs.next();
                studentId = rs.getInt(1);
                AppEmail appMail = EmailMessageBuilder.getStudentLoginDetails(student, appUser);
                Runnable studentEmail = new EmailSenderThread(appMail); 
                Thread emailthread = new Thread(studentEmail);
                emailthread.start();
            }
        }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception occured in addStudent method {0}", e.getMessage());
            throw new ConstraintVilationException(e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return studentId;
    }

    @Override
    public int deleteStudent(int studentId) {
        Connection con = null;
        PreparedStatement pstm = null;
        int deletecnt = 0;
        try {
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.deletestudent"));
            pstm.setInt(1, studentId);
            deletecnt = pstm.executeUpdate();
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Exception while deleting student in deleteStudent {0} " + studentId, ex.getMessage());
        } finally {
            AppConnectionPool.release(null, pstm, con);
        }
        return deletecnt;
    }

    @Override
    public Student getStudentById(int studentId) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        Student student = null;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.getstudentbyid"));
            pstm.setInt(pos, studentId);
            rs = pstm.executeQuery();
            if (rs.next()) {
                student = new Student();
                Concentration concentration = new Concentration();
                concentration.setId(rs.getInt(DBUtil.COLUMN_STUDENTS_CONCENTRATION_ID));
                concentration.setConcentrationName(rs.getString(DBUtil.COLUMN_STUDENTS_CON_NAME));
                concentration.setConcentrationStatus(rs.getString(DBUtil.COLUMN_STUDENTS_CON_STATUS));
                concentration.setConcentrationCreatedDate(rs.getDate(DBUtil.COLUMN_STUDENTS_CON_CREATED_DATE));
                concentration.setNotes(rs.getString(DBUtil.COLUMN_STUDENTS_CON_NOTES));
                student.setConcentration(concentration);
                student.setId(rs.getInt(DBUtil.COLUMN_STUDENTS_ID));
                student.setLoginId(rs.getString(DBUtil.COLUMN_STUDENTS_LOGIN_ID));
                student.setFirstName(rs.getString(DBUtil.COLUMN_STUDENTS_FIRST_NAME));
                student.setLastName(rs.getString(DBUtil.COLUMN_STUDENTS_LAST_NAME));
                student.setEmail(rs.getString(DBUtil.COLUMN_STUDENTS_MAIL));
                student.setSecondaryEmail(rs.getString(DBUtil.COLUMN_STUDENTS_SECONDARYEMAIL));
                student.setPhoneNumber(rs.getString(DBUtil.COLUMN_STUDENTS_PHONE));
                student.setAddress(rs.getString(DBUtil.COLUMN_STUDENTS_ADDRESS));
                student.setScores(rs.getString(DBUtil.COLUMN_STUDENTS_SCORES));
                student.setStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS));
                student.setStudentStatusDate(rs.getDate(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS_DATE));
                student.setStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STATUS));
                student.setTestDetails(rs.getString(DBUtil.COLUMN_STUDENTS_TESTDETAILS));
                student.setAcceptedCodeOfConduct(rs.getString(DBUtil.COLUMN_STUDENTS_ACCEPTEDCODEOFCONDUCT));
                student.setNotes(rs.getString(DBUtil.COLUMN_STUDENTS_NOTES));
                student.setCreatedDate(rs.getDate(DBUtil.COLUMN_STUDENTS_CREATED_DATE));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getStudentById method with studentId:{0} {1}", new Object[]{studentId, e.getMessage()});
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return student;
    }

    @Override
    public Student getStudentByName(String studentName) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        Student student = null;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery(""));
            pstm.setString(pos, studentName);
            rs = pstm.executeQuery();
            if (rs.next()) {
                student = new Student();
                Concentration concentration = new Concentration();
                concentration.setId(rs.getInt(DBUtil.COLUMN_STUDENTS_CONCENTRATION_ID));
                concentration.setConcentrationName(rs.getString(DBUtil.COLUMN_STUDENTS_CON_NAME));
                concentration.setConcentrationStatus(rs.getString(DBUtil.COLUMN_STUDENTS_CON_STATUS));
                concentration.setConcentrationCreatedDate(rs.getDate(DBUtil.COLUMN_STUDENTS_CON_CREATED_DATE));
                concentration.setNotes(rs.getString(DBUtil.COLUMN_STUDENTS_CON_NOTES));
                student.setConcentration(concentration);
                student.setId(rs.getInt(DBUtil.COLUMN_STUDENTS_ID));
                student.setLoginId(rs.getString(DBUtil.COLUMN_STUDENTS_LOGIN_ID));
                student.setFirstName(rs.getString(DBUtil.COLUMN_STUDENTS_FIRST_NAME));
                student.setLastName(rs.getString(DBUtil.COLUMN_STUDENTS_LAST_NAME));
                student.setEmail(rs.getString(DBUtil.COLUMN_STUDENTS_MAIL));
                student.setSecondaryEmail(rs.getString(DBUtil.COLUMN_STUDENTS_SECONDARYEMAIL));
                student.setPhoneNumber(rs.getString(DBUtil.COLUMN_STUDENTS_PHONE));
                student.setAddress(rs.getString(DBUtil.COLUMN_STUDENTS_ADDRESS));
                student.setScores(rs.getString(DBUtil.COLUMN_STUDENTS_SCORES));
                student.setStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS));
                student.setStudentStatusDate(rs.getDate(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS_DATE));
                student.setStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STATUS));
                student.setTestDetails(rs.getString(DBUtil.COLUMN_STUDENTS_TESTDETAILS));
                student.setAcceptedCodeOfConduct(rs.getString(DBUtil.COLUMN_STUDENTS_ACCEPTEDCODEOFCONDUCT));
                student.setNotes(rs.getString(DBUtil.COLUMN_STUDENTS_NOTES));
                student.setCreatedDate(rs.getDate(DBUtil.COLUMN_STUDENTS_CREATED_DATE));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getStudentByName method with studentName:{0} {1}", new Object[]{studentName, e.getMessage()});
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return student;
    }

    @Override
    public List<Student> getAllStudents() {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        List<Student> students = null;
        try {
            int pos = 1;
            Student student;
            students = new ArrayList<>();
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.getallstudents"));
            rs = pstm.executeQuery();
            while (rs.next()) {
                student = new Student();
                Concentration concentration = new Concentration();
                concentration.setId(rs.getInt(DBUtil.COLUMN_STUDENTS_CONCENTRATION_ID));
                concentration.setConcentrationName(rs.getString(DBUtil.COLUMN_STUDENTS_CON_NAME));
                concentration.setConcentrationStatus(rs.getString(DBUtil.COLUMN_STUDENTS_CON_STATUS));
                concentration.setConcentrationCreatedDate(rs.getDate(DBUtil.COLUMN_STUDENTS_CON_CREATED_DATE));
                concentration.setNotes(rs.getString(DBUtil.COLUMN_STUDENTS_CON_NOTES));
                student.setConcentration(concentration);
                student.setId(rs.getInt(DBUtil.COLUMN_STUDENTS_ID));
                student.setLoginId(rs.getString(DBUtil.COLUMN_STUDENTS_LOGIN_ID));
                student.setFirstName(rs.getString(DBUtil.COLUMN_STUDENTS_FIRST_NAME));
                student.setLastName(rs.getString(DBUtil.COLUMN_STUDENTS_LAST_NAME));
                student.setEmail(rs.getString(DBUtil.COLUMN_STUDENTS_MAIL));
                student.setSecondaryEmail(rs.getString(DBUtil.COLUMN_STUDENTS_SECONDARYEMAIL));
                student.setPhoneNumber(rs.getString(DBUtil.COLUMN_STUDENTS_PHONE));
                student.setAddress(rs.getString(DBUtil.COLUMN_STUDENTS_ADDRESS));
                student.setScores(rs.getString(DBUtil.COLUMN_STUDENTS_SCORES));
                student.setStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS));
                student.setStudentStatusDate(rs.getDate(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS_DATE));
                student.setStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STATUS));
                student.setTestDetails(rs.getString(DBUtil.COLUMN_STUDENTS_TESTDETAILS));
                student.setAcceptedCodeOfConduct(rs.getString(DBUtil.COLUMN_STUDENTS_ACCEPTEDCODEOFCONDUCT));
                student.setNotes(rs.getString(DBUtil.COLUMN_STUDENTS_NOTES));
                student.setCreatedDate(rs.getDate(DBUtil.COLUMN_STUDENTS_CREATED_DATE));
                students.add(student);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getStudentByName method with {1}", new Object[]{ e.getMessage()});
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return students;
    }

}
