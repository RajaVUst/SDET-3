package com.apitesting.base;

import io.restassured.builder.ResponseSpecBuilder;
import io.restassured.specification.ResponseSpecification;
import org.hamcrest.Matchers;

public class ResponseSpecBuilderUtil {
    public static ResponseSpecification getSuccessSpec(int statusCode) {
        return new ResponseSpecBuilder()
                .expectStatusCode(statusCode)
                .expectResponseTime(Matchers.lessThan(5000L))
                .build();
    }
}