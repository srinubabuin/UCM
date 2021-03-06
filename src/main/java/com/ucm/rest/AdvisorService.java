/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.rest;

import com.app.util.RequestStatus;
import com.ucm.model.Advisor;
import com.ucm.model.AppUser;
import com.ucm.service.helper.AdvisorServiceHelper;

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

import com.ucm.service.helper.UserServiceHelper;
import org.apache.log4j.Logger;

@Path("/advisor")
public class AdvisorService {

    private static final Logger LOGGER = Logger.getLogger(AdvisorService.class);
    @Context
    private HttpServletRequest request;

    @PUT
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response insert(Advisor advisor) {

        try {
            RequestStatus req = new AdvisorServiceHelper().addAdvisor(advisor);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(req).build();
        } catch (Exception ex) {
            LOGGER.info("Error while inserting the advisor");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @PUT
    @Path("/director/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response updateDirector(@PathParam("param") String direcorId, AppUser appUser) {
        RequestStatus advisorResponseObj;
        UserServiceHelper advisorServiceHelper;
        try {
            advisorServiceHelper = new UserServiceHelper();
            advisorResponseObj = advisorServiceHelper.modifyUser(appUser);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(advisorResponseObj).build();
        } catch (Exception nre) {
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/director/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getDirectorById(@PathParam("param") String loginId) {
        UserServiceHelper advisorServiceHelper;
        try {
            advisorServiceHelper = new UserServiceHelper();
            AppUser authUser = advisorServiceHelper.getUserByLoginId(loginId);

            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(authUser).build();
        } catch (Exception ex) {
            LOGGER.info("Error while fetching the advisor");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @PUT
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response update(@PathParam("param") int advisorId, Advisor advisor) {
        RequestStatus advisorResponseObj;
        AdvisorServiceHelper advisorServiceHelper;
        try {
            advisorServiceHelper = new AdvisorServiceHelper();
            advisorResponseObj = advisorServiceHelper.modifyAdvisor(advisor);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(advisorResponseObj).build();
        } catch (Exception nre) {
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @DELETE
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response delete(@PathParam("param") int advId) {

        try {
            RequestStatus req = new AdvisorServiceHelper().deleteAdvisor(advId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(req).build();
        } catch (Exception ex) {
            LOGGER.info("Error while deleteing the advisor");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getAdvisorById(@PathParam("param") int advId) {

        try {
            Advisor advisor = new AdvisorServiceHelper().getAdvisorWithId(advId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(advisor).build();
        } catch (Exception ex) {
            LOGGER.info("Error while fetching the advisor");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/loginId/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getAdvisorByLoginId(@PathParam("param") String loginId) {

        try {
            Advisor advisor = new AdvisorServiceHelper().getAdvisorWithLoginId(loginId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(advisor).build();
        } catch (Exception ex) {
            LOGGER.info("Error while fetching the advisor");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    //    @GET
//    @Consumes({"application/json"})
//    @Produces({"application/json"})
//    public Response getAdvisorByName(@PathParam("param") String advName) {
//
//        try {
//            Advisor advisor = new AdvisorServiceHelper().getAdvisorWitName(advName);
//            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(advisor).build();
//        } catch (Exception ex) {
//            LOGGER.info("Error while fetching the advisor");
//            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
//        }
//    }
    @GET
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getAllAdvisors() {

        try {
            List<Advisor> advisors = new AdvisorServiceHelper().getAllAdvisors();
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(advisors).build();
        } catch (Exception ex) {
            LOGGER.info("Error while fetching the advisor");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/advisorsExistedInConcentrations")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response advisorsExistedInConcentrations() {

        try {
            List<Integer> advisors = new AdvisorServiceHelper().advisorsExistedInConcentrations();
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(advisors).build();
        } catch (Exception ex) {
            LOGGER.info("Error while fetching the advisor");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }
}
