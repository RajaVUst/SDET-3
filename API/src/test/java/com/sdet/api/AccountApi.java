package com.sdet.api;

import io.restassured.response.Response;

import java.util.Map;

import static com.sdet.specs.RequestSpec.requestSpecification;
import static io.restassured.RestAssured.given;

public final class AccountApi {
    private AccountApi() {
    }

    public static Response createUser(String username, String password) {
        return given()
                .spec(requestSpecification())
                .body(Map.of("userName", username, "password", password))
                .when()
                .post("/Account/v1/User");
    }

    public static Response generateToken(String username, String password) {
        return given()
                .spec(requestSpecification())
                .body(Map.of("userName", username, "password", password))
                .when()
                .post("/Account/v1/GenerateToken");
    }
}
