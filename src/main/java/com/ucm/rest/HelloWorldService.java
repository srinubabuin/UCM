/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ucm.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path("/hello")
public class HelloWorldService {

    @GET
    @Path("/message/{param}")
    @Produces("text/plain")
    public Response getMsg(@PathParam("param") String msg) {

        String output = "Jersey say : " + msg;
        System.out.println("output  " + output);
        return Response.status(200).entity(output).build();

    }

}
