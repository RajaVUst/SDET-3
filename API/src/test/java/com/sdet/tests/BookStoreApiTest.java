package com.sdet.tests;

import com.sdet.api.AccountApi;
import com.sdet.api.BookStoreApi;
import com.sdet.reporting.ExtentManager;
import com.sdet.utils.TestDataFactory;
import io.restassured.response.Response;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import static com.sdet.specs.ResponseSpec.createdJsonResponse;
import static com.sdet.specs.ResponseSpec.okJsonResponse;
import static org.hamcrest.Matchers.emptyOrNullString;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.not;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class BookStoreApiTest {
    private final String username = TestDataFactory.uniqueUsername();
    private final String password = TestDataFactory.validPassword();
    private String token;

    @BeforeEach
    void setUp(org.junit.jupiter.api.TestInfo testInfo) {
        ExtentManager.createTest(testInfo.getDisplayName());
        ExtentManager.info("Starting test: " + testInfo.getDisplayName());
    }

    @AfterEach
    void tearDown() {
        ExtentManager.clearCurrentTest();
        ExtentManager.flush();
    }

    @Test
    @DisplayName("Create a new DemoQA user")
    void shouldCreateUser() {
        ExtentManager.info("Creating user with username: " + username);
        AccountApi.createUser(username, password)
                .then()
                .log().all()
                .spec(createdJsonResponse())
                .body("userID", not(emptyOrNullString()))
                .body("username", equalTo(username));
    }

    @Test
    @DisplayName("Generate an authentication token for the created user")
    void shouldGenerateToken() {
        ExtentManager.info("Generating token for username: " + username);
        Response tokenResponse = AccountApi.generateToken(username, password)
                .then()
                .log().all()
                .spec(okJsonResponse())
                .body("token", not(emptyOrNullString()))
                .extract()
                .response();

        token = tokenResponse.path("token");
    }

    @Test
    @DisplayName("Retrieve the book list using the bearer token")
    void shouldGetBooksWithBearerToken() {
        ExtentManager.info("Fetching books with bearer token");
        BookStoreApi.getBooks(token)
                .then()
                .log().all()
                .spec(okJsonResponse())
                .body("books.size()", greaterThan(0))
                .body("books.title", not(emptyOrNullString()));
    }
}
