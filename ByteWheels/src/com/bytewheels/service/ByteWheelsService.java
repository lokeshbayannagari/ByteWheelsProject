package com.bytewheels.service;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.json.JSONObject;

import com.bytewheels.dao.VehicleDaoActions;
import com.bytewheels.exception.ByteWheelsException;

@Path("/cars")
@RequestScoped
public class ByteWheelsService {

	@Inject
	VehicleDaoActions vehicleDaoActions;

	/**
	 * Default constructor.
	 */
	public ByteWheelsService() {
	}

	/**
	 * Retrieves representation of an instance of ByteWheelsService
	 * 
	 * @return an instance of String
	 */
	@GET
	@Path("/")
	@Produces("application/json")
	public Response getAllCarDetails(@QueryParam("fromDate") Long fromDate, @QueryParam("toDate") Long toDate) {
		System.out.println("vehicles : " + vehicleDaoActions);
		String output;
		try {
			output = vehicleDaoActions.getCarDetails(fromDate, toDate);
		} catch (ByteWheelsException e) {
			output = e.getUserMessage();
		}
		return Response.status(200).entity(output).build();
	}

	/**
	 * PUT method for updating or creating an instance of ByteWheelsService
	 * 
	 * @param content
	 *            representation for the resource
	 * @return an HTTP response with content of the updated or created resource.
	 */
	@POST
	@Path("/")
	@Produces("application/json")
	public Response bookModelCar(@QueryParam("categoryid") Integer categoryId, @QueryParam("modelid") Integer modelId,
			@QueryParam("fromDate") Long fromDate, @QueryParam("toDate") Long toDate,
			@QueryParam("emailId") String emailId) {
		System.out.println("vehicles : " + vehicleDaoActions);
		String output;
		try {
			output = vehicleDaoActions.bookVehicle(categoryId, modelId, fromDate, toDate, emailId);
		} catch (ByteWheelsException e) {
			output = e.getUserMessage();
		}
		return Response.status(200).entity(output).build();
	}

}