//package com.ucm.rest;
//
//import javax.ws.rs.Consumes;
//import javax.ws.rs.GET;
//import javax.ws.rs.Path;
//import javax.ws.rs.PathParam;
//import javax.ws.rs.Produces;
//import javax.ws.rs.core.MediaType;
//import javax.ws.rs.core.Response;
//
//@Path("/cource")
//public class CourceService {
//
//    @GET
//    @Path("/{param}")
//    @Produces("text/plain")
//    @Consumes({MediaType.TEXT_PLAIN, MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON, MediaType.TEXT_HTML, "application/x-www-form-urlencoded"})
//    public Response addCource(@PathParam("courceJSONStr") String courceJSONStr) {
//
//        String output = "The couce Name : " + courceJSONStr;
//        return Response.status(200).entity(output).build();
//    }
//}
