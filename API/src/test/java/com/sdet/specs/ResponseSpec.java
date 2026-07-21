package com.sdet.specs;

import io.restassured.builder.ResponseSpecBuilder;
import io.restassured.specification.ResponseSpecification;

import static io.restassured.http.ContentType.JSON;

public class ResponseSpec {
    private ResponseSpec() {
    }
    public static ResponseSpecification okJsonResponse() {
        return new ResponseSpecBuilder()
                .expectStatusCode(200)
                .expectContentType(JSON)
                .build();
    }
    public static ResponseSpecification createdJsonResponse() {
        return new ResponseSpecBuilder()
                .expectStatusCode(201)
                .expectContentType(JSON)
                .build();
    }
}
