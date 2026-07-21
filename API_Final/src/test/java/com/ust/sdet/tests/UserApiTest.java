package com.ust.sdet.tests;

import com.ust.sdet.base.BaseTest;
import com.ust.sdet.models.Book;
import com.ust.sdet.models.User;
import com.ust.sdet.spec.ReqSpec;
import com.ust.sdet.utils.LoggerUtils;
import io.qameta.allure.*;
import io.restassured.response.Response;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.UUID;

import static io.qameta.allure.SeverityLevel.CRITICAL;
import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.junit.jupiter.api.Assertions.*;

@Epic("Book Store API")
@Feature("User Management")
@Owner("Bhumika")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserApiTest extends BaseTest {

    private static final Logger log = LoggerUtils.getLogger(UserApiTest.class);

    private static String username;
    private static final String password = "Password@123";
    private static String token;

    @Test
    @Order(1)
    @DisplayName("Create User")
    @Story("Create User")
    @Description("Verify user creation")
    @Severity(CRITICAL)
    public void createUser() {

        username = "bhumika" + UUID.randomUUID();

        User user = new User(username, password);

        log.info("Creating User : {}", username);

        Response response = given()
                .spec(ReqSpec.requestSpec())
                .body(user)
                .when()
                .post("/Account/v1/User")
                .then()
 .body(matchesJsonSchemaInClasspath("schemas/user-schemas.json"))
                .spec(ReqSpec.successResponse())
                .extract()
                .response();

        response.prettyPrint();

        assertEquals(201, response.statusCode());

        log.info("User created successfully.");
    }

    @Test
    @Order(2)
    @DisplayName("Generate Token")
    @Story("Generate Token")
    @Description("Verify token generation")
    @Severity(CRITICAL)
    public void generateToken() {

        User user = new User(username, password);

        log.info("Generating token for {}", username);

        Response response = given()
                .spec(ReqSpec.requestSpec())
                .body(user)
                .when()
                .post("/Account/v1/GenerateToken")
                .then()

                .spec(ReqSpec.successResponseSpec())
                .extract()
                .response();

        response.prettyPrint();

        assertEquals(200, response.statusCode());

        token = response.jsonPath().getString("token");

        assertNotNull(token);

        log.info("Generated Token : {}", token);
    }

    @Test
    @Order(3)
    @DisplayName("Get All Books")
    @Story("Books")
    @Description("Verify all books are returned")
    public void getAllBooks() {

        log.info("Getting Books");

        Response response = given()
                .spec(ReqSpec.requestSpec())
                .header("Authorization", "Bearer " + token)
                .when()
                .get("/BookStore/v1/Books")
                .then()
                .body(matchesJsonSchemaInClasspath("schemas/book-schemas.json"))

                .spec(ReqSpec.successResponseSpec())
                .extract()
                .response();

        response.prettyPrint();

        assertEquals(200, response.statusCode());

        List<Book> books = response.jsonPath().getList("books", Book.class);

        assertFalse(books.isEmpty());
        assertNotNull(books.get(0).title());

        Book firstBook = books.get(0);

        log.info("ISBN : {}", firstBook.isbn());
        log.info("Title : {}", firstBook.title());
        log.info("Author : {}", firstBook.author());

        assertNotNull(firstBook.title());
        assertNotNull(firstBook.author());
    }
}
