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
import com.ucm.exception.ObjectNotFoundException;
import com.ucm.model.AppUser;
import com.ucm.model.Concentration;
import com.ucm.model.Student;
import com.ucm.services.StudentService;
import com.ucm.services.UserLoginService;
import org.apache.log4j.Priority;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

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
            AppUser appUser = ApplicationUtil.getUserLoginDetails();
            int loginId = userService.insertUser(appUser);
            if (loginId > 0) {
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
            Student student = getStudent(String.valueOf(studentId), "id");
            int studentCnt = (new UserLoginServiceImpl()).deleteUser(student.getLoginId());
            if (studentCnt > 0) {
                con = AppConnectionPool.getConnection();
                pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.deletestudent"));
                pstm.setInt(1, studentId);
                deletecnt = pstm.executeUpdate();
            }
        } catch (SQLException ex) {
            LOGGER.log(Level.SEVERE, "Exception while deleting student in deleteStudent {0} " + studentId, ex.getMessage());
        } finally {
            AppConnectionPool.release(null, pstm, con);
        }
        return deletecnt;
    }

    @Override
    public Student getStudent(String value, String type) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        Student student = null;
        String queryStr = "";
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            if ("loginid".equals(type)) {
                queryStr = AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.getstudent");
                queryStr = queryStr + " WHERE STU.LOGIN_ID = ?";
            } else {
                queryStr = AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.getstudent");
                queryStr = queryStr + " WHERE STU.ID = ?";
            }
            pstm = con.prepareStatement(queryStr);
            pstm.setString(pos, value);
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
                student.setStudentStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS));
                student.setStudentStatusDate(rs.getDate(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS_DATE));
                student.setStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STATUS));
                student.setAcceptedCodeOfConduct(rs.getString(DBUtil.COLUMN_STUDENTS_ACCEPTEDCODEOFCONDUCT));
                student.setTestDetails(rs.getString(DBUtil.COLUMN_STUDENTS_TESTDETAILS));
                student.setPreReq(rs.getString(DBUtil.COLUMN_STUDENTS_PREREQS));
                student.setNotes(rs.getString(DBUtil.COLUMN_STUDENTS_NOTES));
                student.setNotesUpdated(rs.getTimestamp(DBUtil.COLUMN_STUDENTS_NOTES_UPDATED));
                student.setCreatedDate(rs.getDate(DBUtil.COLUMN_STUDENTS_CREATED_DATE));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getStudentById method with studentId:{0} {1}", new Object[]{value, e.getMessage()});
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
    public List<Student> getAllStudents(String whereCondition) {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        List<Student> students = null;
        String querySring;
        try {
            int pos = 1;
            Student student;
            students = new ArrayList<>();
            querySring = AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.getallstudents");
            if (whereCondition != null) {
                querySring = querySring + " " + whereCondition;
            }
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(querySring);
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
                student.setStudentStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS));
                student.setStudentStatusDate(rs.getDate(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS_DATE));
                student.setStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STATUS));
                student.setTestDetails(rs.getString(DBUtil.COLUMN_STUDENTS_TESTDETAILS));
                student.setAcceptedCodeOfConduct(rs.getString(DBUtil.COLUMN_STUDENTS_ACCEPTEDCODEOFCONDUCT));
                student.setPreReq(rs.getString(DBUtil.COLUMN_STUDENTS_PREREQS));
                student.setNotes(rs.getString(DBUtil.COLUMN_STUDENTS_NOTES));
                student.setNotesUpdated(rs.getTimestamp(DBUtil.COLUMN_STUDENTS_NOTES_UPDATED));
                student.setCreatedDate(rs.getDate(DBUtil.COLUMN_STUDENTS_CREATED_DATE));
                students.add(student);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getStudentByName method with {1}", new Object[]{e.getMessage()});
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return students;
    }

    @Override
    public int modifyStudent(Student student) throws ConstraintVilationException, ObjectNotFoundException {

        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int advisorUpdateCount = 0;
        try {
            int pos = 1;

            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.modifystudent"));
            pstm.setInt(pos, student.getConcentration().getId());
            pstm.setString(++pos, student.getEmail());
            pstm.setString(++pos, student.getSecondaryEmail());
            pstm.setString(++pos, student.getPreReq());
            pstm.setString(++pos, student.getStudentStatus());
            pstm.setTimestamp(++pos, new Timestamp(new Date().getTime()));
            pstm.setInt(++pos, student.getId());
            advisorUpdateCount = pstm.executeUpdate();
            if (advisorUpdateCount <= 0) {
                throw new ObjectNotFoundException();
            }

        } catch (SQLIntegrityConstraintViolationException e) {
//            LOGGER.log(Priority.ERROR, "Exception while updating advisor method modifyAdvisor " + e.getMessage());
            throw new ConstraintVilationException(e.getMessage());
        } catch (SQLException se) {
//            LOGGER.log(Priority.ERROR, "Exception while updating advisor method modifyAdvisor " + se.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return advisorUpdateCount;
    }

    @Override
    public int updateStudentQuestionnaires(Student student) throws ObjectNotFoundException {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int studentUpdateCount = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.updatestudentquestionnaires"));
            pstm.setString(pos, student.getTestDetails());
            pstm.setString(++pos, student.getAcceptedCodeOfConduct());
            pstm.setString(++pos, student.getLoginId());
            pstm.setInt(++pos, student.getId());
            studentUpdateCount = pstm.executeUpdate();
            if (studentUpdateCount <= 0) {
                throw new ObjectNotFoundException();
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception occured in updateStudentQuestionnaires method {0}", e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return studentUpdateCount;
    }

    @Override
    public int updatePrerequisite(Student student) throws ObjectNotFoundException {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int studentUpdateCount = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.updateprerequisite"));
            pstm.setString(pos, student.getPreReq());
            pstm.setString(++pos, student.getNotes());
            pstm.setTimestamp(++pos, new Timestamp(new Date().getTime()));
            pstm.setString(++pos, student.getLoginId());
            pstm.setInt(++pos, student.getId());
            studentUpdateCount = pstm.executeUpdate();
            if (studentUpdateCount <= 0) {
                throw new ObjectNotFoundException();
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception occured in updatePrerequisite method {0}", e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return studentUpdateCount;
    }

    @Override
    public int updateNotes(Student student) throws ObjectNotFoundException {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        int studentUpdateCount = 0;
        try {
            int pos = 1;
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.updatenotes"));
            pstm.setString(pos, student.getNotes());
            pstm.setTimestamp(++pos, new Timestamp(new Date().getTime()));
            pstm.setString(++pos, student.getLoginId());
            pstm.setInt(++pos, student.getId());
            studentUpdateCount = pstm.executeUpdate();
            if (studentUpdateCount <= 0) {
                throw new ObjectNotFoundException();
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception occured in updateNotes method {0}", e.getMessage());
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return studentUpdateCount;
    }

    @Override
    public List<Student> codeOfConductNotAcceptedStudents() {
        Connection con = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
        List<Student> students = null;
        try {
            int pos = 1;
            Student student;
            students = new ArrayList<>();
            con = AppConnectionPool.getConnection();
            pstm = con.prepareStatement(AppQueryReader.getDBQuery("com.ucm.services.impl.studentservice.codeofconductnotacceptedstudents"));
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
                student.setStudentStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS));
                student.setStudentStatusDate(rs.getDate(DBUtil.COLUMN_STUDENTS_STUDENTSTATUS_DATE));
                student.setStatus(rs.getString(DBUtil.COLUMN_STUDENTS_STATUS));
                student.setTestDetails(rs.getString(DBUtil.COLUMN_STUDENTS_TESTDETAILS));
                student.setAcceptedCodeOfConduct(rs.getString(DBUtil.COLUMN_STUDENTS_ACCEPTEDCODEOFCONDUCT));
                student.setPreReq(rs.getString(DBUtil.COLUMN_STUDENTS_PREREQS));
                student.setNotes(rs.getString(DBUtil.COLUMN_STUDENTS_NOTES));
                student.setNotesUpdated(rs.getTimestamp(DBUtil.COLUMN_STUDENTS_NOTES_UPDATED));
                student.setCreatedDate(rs.getDate(DBUtil.COLUMN_STUDENTS_CREATED_DATE));
                students.add(student);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Exception in getStudentByName method with {1}", new Object[]{e.getMessage()});
        } finally {
            AppConnectionPool.release(rs, pstm, con);
        }
        return students;
    }
}
