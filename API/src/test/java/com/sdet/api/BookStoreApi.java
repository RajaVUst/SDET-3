package com.sdet.api;

import io.restassured.response.Response;

import static com.sdet.specs.RequestSpec.requestSpecification;
import static io.restassured.RestAssured.given;

public final class BookStoreApi {
    private BookStoreApi() {
    }

    public static Response getBooks(String token) {
        return given()
                .spec(requestSpecification())
                .header("Authorization", "Bearer " + token)
                .when()
                .get("/BookStore/v1/Books");
    }
}
