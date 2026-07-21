package com.sdet.tests;

import java.util.UUID;

import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import org.junit.jupiter.api.Test;

import com.sdet.config.ConfigLoader;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import io.restassured.response.Response;

class DemoQaSchemaValidationTest {

    private String uniqueUsername(ConfigLoader config) {
        return config.getUsernamePrefix() + UUID.randomUUID().toString().replace("-", "").substring(0, 12);
    }

    @Test
    void shouldValidateCreateUserResponseSchema() {
        ConfigLoader config = new ConfigLoader();
        String username = uniqueUsername(config);
        String password = config.getPassword();

        Response response = given()
                .baseUri(config.getBaseUrl())
                .contentType("application/json")
                .body("{\"userName\":\"" + username + "\",\"password\":\"" + password + "\"}")
                .when()
                .post("/Account/V1/User");

        if (response.statusCode() == 201) {
            response.then()
                    .statusCode(201)
                    .body("username", equalTo(username))
                    .body("userID", notNullValue())
                    .body(matchesJsonSchemaInClasspath("schemas/json/create-user-response-schema.json"));
        } else {
            response.then()
                    .statusCode(anyOf(is(201), is(406)))
                    .body(matchesJsonSchemaInClasspath("schemas/json/create-user-error-response-schema.json"));
        }
    }

    @Test
    void shouldValidateGenerateTokenResponseSchema() {
        ConfigLoader config = new ConfigLoader();
        String username = uniqueUsername(config);
        String password = config.getPassword();

        Response response = given()
                .baseUri(config.getBaseUrl())
                .contentType("application/json")
                .body("{\"userName\":\"" + username + "\",\"password\":\"" + password + "\"}")
                .when()
                .post("/Account/V1/GenerateToken");

        if (response.statusCode() == 200 && "Success".equalsIgnoreCase(response.path("status"))) {
            response.then()
                    .statusCode(200)
                    .body("status", equalTo("Success"))
                    .body("result", notNullValue())
                    .body(matchesJsonSchemaInClasspath("schemas/json/generate-token-response-schema.json"));
        } else {
            response.then()
                    .statusCode(anyOf(is(200), is(406)))
                    .body("status", notNullValue())
                    .body("result", notNullValue())
                    .body(matchesJsonSchemaInClasspath("schemas/json/generate-token-error-response-schema.json"));
        }
    }

    @Test
    void shouldValidateBooksResponseSchema() {
        ConfigLoader config = new ConfigLoader();
        String username = uniqueUsername(config);
        String password = config.getPassword();

        Response createUserResponse = given()
                .baseUri(config.getBaseUrl())
                .contentType("application/json")
                .body("{\"userName\":\"" + username + "\",\"password\":\"" + password + "\"}")
                .when()
                .post("/Account/V1/User");

        if (createUserResponse.statusCode() != 201) {
            createUserResponse.then()
                    .body(matchesJsonSchemaInClasspath("schemas/json/create-user-error-response-schema.json"));
            return;
        }

        Response tokenResponse = given()
                .baseUri(config.getBaseUrl())
                .contentType("application/json")
                .body("{\"userName\":\"" + username + "\",\"password\":\"" + password + "\"}")
                .when()
                .post("/Account/V1/GenerateToken");

        if (tokenResponse.statusCode() != 200 || !"Success".equalsIgnoreCase(tokenResponse.path("status"))) {
            tokenResponse.then()
                    .body(matchesJsonSchemaInClasspath("schemas/json/generate-token-error-response-schema.json"));
            return;
        }

        given()
                .baseUri(config.getBaseUrl())
                .header("Authorization", "Bearer " + tokenResponse.path("token"))
                .when()
                .get("/BookStore/v1/Books")
                .then()
                .statusCode(200)
                .body("books", notNullValue())
                .body(matchesJsonSchemaInClasspath("schemas/json/books-response-schema.json"));
    }
}
