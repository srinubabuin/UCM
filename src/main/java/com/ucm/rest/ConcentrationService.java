/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.rest;

import com.app.util.RequestStatus;
import com.ucm.model.Concentration;
import com.ucm.service.helper.ConcentationServiceHelper;
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

@Path("/concentration")
public class ConcentrationService {

    private static final Logger LOGGER = Logger.getLogger(ConcentrationService.class);
    @Context
    private HttpServletRequest request;

    @PUT
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response insert(Concentration concentration) {

        try {
            ConcentationServiceHelper helper = new ConcentationServiceHelper();
            RequestStatus reqStatus = helper.addConcentration(concentration);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(reqStatus).build();
        } catch (Exception e) {
            LOGGER.info("Insert Concentration error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }


    @PUT
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response update(@PathParam("param") int concentrationId) {

        try {
            ConcentationServiceHelper helper = new ConcentationServiceHelper();
            RequestStatus reqStatus = null;
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(reqStatus).build();
        } catch (Exception e) {
            LOGGER.info("Insert Concentration error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @DELETE
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response delete(@PathParam("param") int concentrationId) {

        try {
            ConcentationServiceHelper helper = new ConcentationServiceHelper();
            RequestStatus reqStatus = helper.deleteConcentration(concentrationId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(reqStatus).build();
        } catch (Exception e) {
            LOGGER.info("Insert Concentration error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getConcentratioById(@PathParam("param") int concentrationId) {

        try {
            ConcentationServiceHelper helper = new ConcentationServiceHelper();
            Concentration concen = helper.getConcentrationWitId(concentrationId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(concen).build();
        } catch (Exception e) {
            LOGGER.info("Insert Concentration error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

//    @GET
//    @Path("/{param}")
//    @Consumes({"application/json"})
//    @Produces({"application/json"})
//    public Response getConcentratioByName(@PathParam("param") String concentationName) {
//
//        try {
//            ConcentationServiceHelper helper = new ConcentationServiceHelper();
//            Concentration concen = helper.getConcentrationWitName(concentationName);
//            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(concen).build();
//        } catch (Exception e) {
//            LOGGER.info("Insert Concentration error");
//            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
//        }
//    }

    @GET
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getAllConcentrations() {

        try {
            ConcentationServiceHelper helper = new ConcentationServiceHelper();
            List<Concentration> concens = helper.getAllConcentrations();
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(concens).build();
        } catch (Exception e) {
            LOGGER.info("Insert Concentration error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }
}
