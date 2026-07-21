package com.sdet.specFactory;

import com.sdet.builders.RequestBuilder;
import io.restassured.builder.ResponseSpecBuilder;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.ResponseSpecification;

import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

public class RequestSpecFactory {
    private final RequestBuilder requestBuilder;

    public RequestSpecFactory(String baseUrl) {
        this.requestBuilder = new RequestBuilder(baseUrl);
    }

    public RequestSpecification jsonSpec() {
        return requestBuilder.buildJsonSpec();
    }

    public RequestSpecification authSpec(String token) {
        return requestBuilder.buildAuthSpec(token);
    }

    public ResponseSpecification createUserResponseSpec() {
        return new ResponseSpecBuilder()
                .expectStatusCode(201)
                .expectBody(matchesJsonSchemaInClasspath("schemas/json/create-user-response-schema.json"))
                .build();
    }

    public ResponseSpecification generateTokenResponseSpec() {
        return new ResponseSpecBuilder()
                .expectStatusCode(200)
                .expectBody(matchesJsonSchemaInClasspath("schemas/json/generate-token-response-schema.json"))
                .build();
    }

    public ResponseSpecification booksResponseSpec() {
        return new ResponseSpecBuilder()
                .expectStatusCode(200)
                .expectBody(matchesJsonSchemaInClasspath("schemas/json/books-response-schema.json"))
                .build();
    }
}
