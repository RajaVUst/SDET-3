package com.apitesting.clients;

import com.apitesting.base.RequestSpecBuilderUtil;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class AccountAPI {

    public Response createUser(Object userRequestBody) {
        return given()
                .spec(RequestSpecBuilderUtil.getBaseSpec())
                .body(userRequestBody)
                .when()
                .post("/Account/v1/User");
    }

    public Response generateToken(Object userRequestBody) {
        return given()
                .spec(RequestSpecBuilderUtil.getBaseSpec())
                .body(userRequestBody)
                .when()
                .post("/Account/v1/GenerateToken");
    }
}