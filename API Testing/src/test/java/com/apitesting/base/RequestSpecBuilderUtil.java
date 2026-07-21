package com.apitesting.base;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import com.apitesting.utils.EnvConfig;

public class RequestSpecBuilderUtil {
    public static RequestSpecification getBaseSpec() {
        return new RequestSpecBuilder()
                .setBaseUri(EnvConfig.baseUri())
                .setContentType(ContentType.JSON)
                .build();
    }

    public static RequestSpecification getAuthSpec(String token) {
        return new RequestSpecBuilder()
                .setBaseUri(EnvConfig.baseUri())
                .setContentType(ContentType.JSON)
                .addHeader("Authorization", "Bearer " + token)
                .build();
    }
}