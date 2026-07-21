package com.apitesting.tests;

import com.apitesting.clients.AccountAPI;
import com.apitesting.clients.BookStoreAPI;
import com.apitesting.forExtent.BaseTest;
import com.apitesting.models.UserRequest;
import com.apitesting.utils.TestData;
import io.qameta.allure.Step;
import io.restassured.response.Response;
import org.testng.annotations.Test;

import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.hamcrest.Matchers.equalTo;

public class BooksTest extends BaseTest {

    AccountAPI accountAPI = new AccountAPI();
    BookStoreAPI bookStoreAPI = new BookStoreAPI();

    String token;

    @Test(priority = 1)
    @Step("Create a new user")
    public void createUser_step1() {
        UserRequest userRequest = new UserRequest(TestData.USERNAME, TestData.PASSWORD);

        Response response = accountAPI.createUser(userRequest);

        response.then()
                .statusCode(201)
                .body(matchesJsonSchemaInClasspath("schema/user-schema.json"))
                .body("username", equalTo(TestData.USERNAME));
    }

    @Test(priority = 2)
    @Step("Generate auth token")
    public void generateToken_step2() {
        UserRequest userRequest = new UserRequest(TestData.USERNAME, TestData.PASSWORD);

        Response response = accountAPI.generateToken(userRequest);

        response.then()
                .statusCode(200)
                .body("status", equalTo("Success"));

        token = response.jsonPath().getString("token");
    }

    @Test(priority = 3, dependsOnMethods = "generateToken_step2")
    @Step("Get all books using bearer token")
    public void getAllBooks_step3() {
        Response response = bookStoreAPI.getAllBooks(token);

        response.then()
                .statusCode(200)
                .body(matchesJsonSchemaInClasspath("schema/books-schema.json"))
                .body("books.size()", org.hamcrest.Matchers.greaterThan(0));
    }
}