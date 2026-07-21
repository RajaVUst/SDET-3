package com.ust.capstone.tests;

import com.ust.capstone.clients.AuthClient;
import com.ust.capstone.models.CreateUserRequest;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class DemoQATests {

    AuthClient authClient = new AuthClient();

    @Test
    public void createUserGenerateTokenAndGetBooks() {

        String username = "manju" + System.currentTimeMillis();
        String password = "Password@123";

        CreateUserRequest request =new CreateUserRequest(username, password);

        Response createResponse = authClient.createUser(request);
        createResponse.then().log().all();
        assertEquals(201, createResponse.getStatusCode());
        Response tokenResponse = authClient.generateToken(request);
        tokenResponse.then().log().all();
        assertEquals(200, tokenResponse.getStatusCode());
        String token = tokenResponse.jsonPath().getString("token");
        assertNotNull(token);
        Response booksResponse = authClient.getBooks(token);
        booksResponse.then().log().all();
        assertEquals(200, booksResponse.getStatusCode());

        System.out.println("Books retrieved successfully");
    }
}