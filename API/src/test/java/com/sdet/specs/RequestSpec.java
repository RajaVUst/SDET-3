package com.sdet.specs;

import com.sdet.utils.TestDataFactory;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.specification.RequestSpecification;

import static io.restassured.http.ContentType.JSON;

public class RequestSpec {
    private RequestSpec() {
    }

    public static RequestSpecification requestSpecification() {
        return new RequestSpecBuilder()
                .setBaseUri(TestDataFactory.getBaseUrl())
                .setContentType(JSON)
                .setAccept(JSON)
                .addFilter(new RequestLoggingFilter())
                .build();
    }
}
