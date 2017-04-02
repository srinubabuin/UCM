package com.ucm.rest;

import com.app.util.AppSessionUtil;
import com.ucm.exception.NoUserException;
import com.ucm.model.AppAuth;
import com.ucm.model.AppUser;
import com.ucm.model.Cource;
import com.ucm.service.helper.CourceServiceHelper;
import com.ucm.service.helper.UserServiceHelper;
import org.apache.log4j.Logger;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Path("/cource")
public class CourceService {

    private static Logger logger = Logger.getLogger(CourceService.class);

    @Context
    private HttpServletRequest request;

    @PUT
    @Consumes({"application/json"})
    @Produces({"application/json"})
    public Response insert(Cource cource) {
        JSONObject courceResponseObj;
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
        JSONObject courceResponseObj;
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
        JSONObject courceResponseObj;
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
