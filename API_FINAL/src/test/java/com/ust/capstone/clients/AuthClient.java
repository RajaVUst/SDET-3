package com.ust.capstone.clients;

import com.ust.capstone.constants.EndPoints;
import com.ust.capstone.specs.RequestSpecs;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class AuthClient {

    public Response createUser(Object payload) {
        return given()
                .spec(RequestSpecs.getRequestSpec())
                .body(payload)
                .when()
                .post(EndPoints.CREATE_USER);
    }

    public Response generateToken(Object payload) {
        return given()
                .spec(RequestSpecs.getRequestSpec())
                .body(payload)
                .when()
                .post(EndPoints.GENERATE_TOKEN);
    }

    public Response getBooks(String token) {
        return given()
                .spec(RequestSpecs.getRequestSpec())
                .header("Authorization", "Bearer " + token)
                .when()
                .get(EndPoints.GET_BOOKS);
    }
}