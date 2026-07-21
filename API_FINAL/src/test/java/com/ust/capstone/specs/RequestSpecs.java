package com.ust.capstone.specs;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;

public class RequestSpecs {

    public static RequestSpecification getRequestSpec() {
        return new RequestSpecBuilder()
                .setBaseUri("https://demoqa.com")
                .addHeader("Content-Type", "application/json")
                .build();
    }
}