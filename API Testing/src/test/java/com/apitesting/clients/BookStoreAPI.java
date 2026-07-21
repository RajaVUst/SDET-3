package com.apitesting.clients;

import com.apitesting.base.RequestSpecBuilderUtil;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class BookStoreAPI {

    public Response getAllBooks(String token) {
        return given()
                .spec(RequestSpecBuilderUtil.getAuthSpec(token))
                .when()
                .get("/BookStore/v1/Books");
    }
}