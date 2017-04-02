package com.ucm.rest;

import com.app.util.RequestStatus;
import com.ucm.model.Cource;
import com.ucm.service.helper.CourceServiceHelper;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

@Path("/cource")
public class CourceService {

    private static Logger logger = Logger.getLogger(CourceService.class);

    @Context
    private HttpServletRequest request;

    @PUT
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response insert(Cource cource) {
        RequestStatus courceResponseObj;
        CourceServiceHelper courceServiceHelper;
        try {
            courceServiceHelper = new CourceServiceHelper();
            courceResponseObj = courceServiceHelper.addCource(cource);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(courceResponseObj).build();
        } catch (Exception nre) {
            logger.info("insert cource error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @PUT
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response update(@PathParam("param") int courceId, Cource cource) {
        RequestStatus courceResponseObj;
        CourceServiceHelper courceServiceHelper;
        try {
            courceServiceHelper = new CourceServiceHelper();
            courceResponseObj = courceServiceHelper.addCource(cource);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(courceResponseObj).build();
        } catch (Exception nre) {
            logger.info("delete cource error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @DELETE
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response delete(@PathParam("param") int courceId) {
        RequestStatus courceResponseObj;
        CourceServiceHelper courceServiceHelper;
        try {
            courceServiceHelper = new CourceServiceHelper();
            courceResponseObj = courceServiceHelper.deleteCourceWithId(courceId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(courceResponseObj).build();
        } catch (Exception nre) {
            logger.info("delete cource error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Path("/{param}")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response courceById(@PathParam("param") int courceId) {
        CourceServiceHelper courceServiceHelper;
        Cource cource;
        try {
            courceServiceHelper = new CourceServiceHelper();
            cource = courceServiceHelper.getCourceById(courceId);
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(cource).build();
        } catch (Exception nre) {
            logger.info("delete cource error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }

    @GET
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response getAllCources() {
        CourceServiceHelper courceServiceHelper;
        try {
            courceServiceHelper = new CourceServiceHelper();
            return Response.ok().header("Access-Control-Allow-Origin", "*").entity(courceServiceHelper.getAllCources()).build();
        } catch (Exception nre) {
            logger.info("delete cource error");
            return Response.status(405).header("Access-Control-Allow-Origin", "*").build();
        }
    }


}
