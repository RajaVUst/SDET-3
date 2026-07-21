package tests;

import base.BaseTest;
import io.qameta.allure.*;
import io.qameta.allure.SeverityLevel;
import io.restassured.response.Response;
import models.User;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import specs.SpecFactory;
import utils.LoggerUtil;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.junit.jupiter.api.Assertions.*;

@Epic("DemoQA API Automation")
@Feature("Book Store API")
@Story("Create User, Generate Token and Get Books")
@Owner("Saiteja")
@Severity(SeverityLevel.CRITICAL)
public class UserApiTest extends BaseTest {

    private static final Logger log = LoggerUtil.getLogger(UserApiTest.class);

    @Test
    @DisplayName("Verify Create User, Generate Token and Retrieve Books")
    @Description("Creates a new user, generates an authentication token and retrieves books using Bearer Token.")
    void createUserGenerateTokenAndGetBooks() {

        String username = "saiteja_" + UUID.randomUUID();

        User user = new User(
                username,
                "Password@123"
        );

        log.info("Creating user: {}", username);

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

        assertEquals(username, createResponse.jsonPath().getString("username"));
        assertNotNull(createResponse.jsonPath().getString("userID"));
        assertTrue(createResponse.jsonPath().getList("books").isEmpty());

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
        assertNotNull(token);
        assertFalse(token.isBlank());
        assertNotNull(tokenResponse.jsonPath().getString("expires"));

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

        assertNotNull(booksResponse.jsonPath().getList("books"));
        assertFalse(booksResponse.jsonPath().getList("books").isEmpty());
        assertNotNull(booksResponse.jsonPath().getString("books[0].isbn"));
        assertNotNull(booksResponse.jsonPath().getString("books[0].title"));
        assertNotNull(booksResponse.jsonPath().getString("books[0].author"));

        log.info("Books fetched successfully.");
        log.info("API flow completed successfully.");
    }
}