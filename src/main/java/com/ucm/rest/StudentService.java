/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.rest;

import com.app.util.RequestStatus;
import com.ucm.model.Student;
import com.ucm.service.helper.StudentServiceHelper;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;

@Path("/student")
public class StudentService {

    private static final Logger LOGGER = Logger.getLogger(CourceService.class);
    @Context
    private HttpServletRequest request;

    @PUT
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response insert(Student student) {

        RequestStatus reqStatus = null;
        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            reqStatus = helper.addStudent(student);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(reqStatus).build();
        } catch (Exception ex) {
            LOGGER.info("Insert student error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @PUT
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response update(Student student) {

        RequestStatus reqStatus = null;
        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            reqStatus = helper.modifyStudent(student);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(reqStatus).build();
        } catch (Exception ex) {
            LOGGER.info("Update student error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @DELETE
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response delete(@PathParam("param") int studentId) {
        RequestStatus reqStatus;
        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            reqStatus = helper.deleteStudent(studentId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(reqStatus).build();
        } catch (Exception nre) {
            LOGGER.info("Delete Student error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getStudentById(@PathParam("param") int studentId) {

        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            Student student = helper.getStudentById(studentId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(student).build();
        } catch (Exception e) {
            LOGGER.info("Get student wit id error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/loginId/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getStudentByLoginId(@PathParam("param") String loginId) {

        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            Student student = helper.getStudentByLoginId(loginId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(student).build();
        } catch (Exception e) {
            LOGGER.info("Get student wit id error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getAllStudents() {

        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            List<Student> students = helper.getAllStudents();
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(students).build();
        } catch (Exception e) {
            LOGGER.info("Get student wit id error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/codeOfConductNotCompleted")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response codeOfConductNotAcceptedStudents() {

        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            List<Student> students = helper.codeOfConductNotAcceptedStudents();
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(students).build();
        } catch (Exception e) {
            LOGGER.info("Get student wit id error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/studentNotes")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response studentNotes() {

        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            List<Student> students = helper.getAllStudentNotes();
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(students).build();
        } catch (Exception e) {
            LOGGER.info("Get student wit id error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/concentration/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getAllStudentsByConcentration(@PathParam("param") int concentrationId) {

        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            List<Student> students = helper.getAllStudentsByConcentration(concentrationId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(students).build();
        } catch (Exception e) {
            LOGGER.info("Get student wit id error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/concentration/codeOfConductNotCompleted/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response codeOfConductNotAcceptedStudentsByConcentration(@PathParam("param") int concentrationId) {

        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            List<Student> students = helper.codeOfConductNotAcceptedStudentsByConcentration(concentrationId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(students).build();
        } catch (Exception e) {
            LOGGER.info("Get student wit id error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/concentration/codeOfConductCompleted/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response codeOfConductCompletedByConcentration(@PathParam("param") int concentrationId) {

        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            List<Student> students = helper.codeOfConductCompletedStudentsByConcentration(concentrationId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(students).build();
        } catch (Exception e) {
            LOGGER.info("Get student wit id error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/concentration/studentNotes/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response studentNotesByConcentration(@PathParam("param") int concentrationId) {

        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            List<Student> students = helper.getAllStudentNotesByConcentration(concentrationId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(students).build();
        } catch (Exception e) {
            LOGGER.info("Get student wit id error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @PUT
    @Path("/updateQuestionnaire")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response updateStudentQuestionnaires(Student student) {

        RequestStatus reqStatus = null;
        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            reqStatus = helper.updateStudentQuestionnaires(student);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(reqStatus).build();
        } catch (Exception ex) {
            LOGGER.info("Insert student error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @PUT
    @Path("/updatePrerequisite")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response updatePrerequisite(Student student) {

        RequestStatus reqStatus = null;
        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            reqStatus = helper.updatePrerequisite(student);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(reqStatus).build();
        } catch (Exception ex) {
            LOGGER.info("Insert student error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @PUT
    @Path("/updateNotes")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response updateNotes(Student student) {

        RequestStatus reqStatus = null;
        try {
            StudentServiceHelper helper = new StudentServiceHelper();
            reqStatus = helper.updateNotes(student);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(reqStatus).build();
        } catch (Exception ex) {
            LOGGER.info("Insert student error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }
}
