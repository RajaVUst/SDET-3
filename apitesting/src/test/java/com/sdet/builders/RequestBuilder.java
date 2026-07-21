package com.sdet.builders;

import com.sdet.models.CreateUserRequest;
import com.sdet.models.GenerateTokenRequest;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;

public class RequestBuilder {
    private final String baseUrl;

    public RequestBuilder(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public RequestSpecification buildJsonSpec() {
        return new RequestSpecBuilder()
                .setBaseUri(baseUrl)
                .setContentType(ContentType.JSON)
                .build();
    }

    public RequestSpecification buildAuthSpec(String token) {
        return new RequestSpecBuilder()
                .setBaseUri(baseUrl)
                .addHeader("Authorization", "Bearer " + token)
                .build();
    }

    public CreateUserRequest createUserBody(String userName, String password) {
        return new CreateUserRequest(userName, password);
    }

    public GenerateTokenRequest generateTokenBody(String userName, String password) {
        return new GenerateTokenRequest(userName, password);
    }
}
