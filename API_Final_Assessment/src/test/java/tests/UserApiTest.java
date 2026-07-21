package tests;

import base.BaseTest;
import io.qameta.allure.*;
import io.qameta.allure.SeverityLevel;
import io.restassured.response.Response;
import models.User;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.Test;
import specs.SpecFactory;
import utils.LoggerUtil;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

@Epic("DemoQA API Automation")
@Feature("Book Store API")
@Story("Create User, Generate Token and Get Books")
@Owner("Saiteja")
@Severity(SeverityLevel.CRITICAL)
public class UserApiTest extends BaseTest {

    private static final Logger log = LoggerUtil.getLogger(UserApiTest.class);

    @Test
    @Description("Creates a new user, generates an authentication token, and retrieves the list of books using the token.")
    void createUserGenerateTokenAndGetBooks() {

        User user = new User(
                "Saiteja@kodi",
                "Password@123"
        );

        log.info("Creating user...");

        Response createResponse =
                given()
                        .spec(SpecFactory.requestSpec())
                        .body(user)
                        .when()
                        .post(SpecFactory.CREATE_USER)
                        .then()
                        .statusCode(201)
                        .body(matchesJsonSchemaInClasspath("schemas/create-user-schema.json"))
                        .extract()
                        .response();

        Allure.addAttachment("Create User", createResponse.asPrettyString());
        log.info("User created successfully.");
        log.info("Generating token...");

        Response tokenResponse =
                given()
                        .spec(SpecFactory.requestSpec())
                        .body(user)
                        .when()
                        .post(SpecFactory.GENERATE_TOKEN)
                        .then()
                        .statusCode(200)
                        .body(matchesJsonSchemaInClasspath("schemas/token-schema.json"))
                        .extract()
                        .response();

        Allure.addAttachment("Generate Token", tokenResponse.asPrettyString());

        String token = tokenResponse.jsonPath().getString("token");
        assertEquals("Success", tokenResponse.jsonPath().getString("status"));

        log.info("Token generated successfully.");
        log.info("Fetching books...");

        Response booksResponse =
                given()
                        .header("Authorization", "Bearer " + token)
                        .when()
                        .get(SpecFactory.GET_BOOKS)
                        .then()
                        .statusCode(200)
                        .body(matchesJsonSchemaInClasspath("schemas/books-schema.json"))
                        .extract()
                        .response();

        Allure.addAttachment("Books", booksResponse.asPrettyString());

        log.info("Books fetched successfully.");
        log.info("API flow completed successfully.");
    }
}