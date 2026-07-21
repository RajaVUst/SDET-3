package com.sdet.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.sdet.client.DemoQaApiClient;
import com.sdet.config.ConfigLoader;
import com.sdet.models.BookStoreResponse;
import com.sdet.models.CreateUserRequest;
import com.sdet.models.CreateUserResponse;
import com.sdet.models.GenerateTokenRequest;
import com.sdet.models.GenerateTokenResponse;

class DemoQaBookStoreTest {
    private String username;
    private String password;
    private boolean userCreated;
    private String token;

    private DemoQaApiClient apiClient;

    @BeforeEach
    void setUp() {
        ConfigLoader config = new ConfigLoader();
        apiClient = new DemoQaApiClient(config.getBaseUrl());
        username = config.getUsername();
        password = config.getPassword();
        userCreated = false;
        token = null;
    }

    @Test
    void shouldCreateUserSuccessfully() {
        ensureUserExists();
    }

    @Test
    void shouldGenerateTokenSuccessfully() {
        ensureUserExists();
        GenerateTokenResponse tokenResponse = apiClient.generateToken(new GenerateTokenRequest(username, password));

        assertNotNull(tokenResponse);
        assertNotNull(tokenResponse.getToken());
        assertEquals("Success", tokenResponse.getStatus());
        token = tokenResponse.getToken();
    }

    @Test
    void shouldRetrieveBooksUsingToken() {
        ensureUserExists();
        if (token == null) {
            GenerateTokenResponse tokenResponse = apiClient.generateToken(new GenerateTokenRequest(username, password));
            token = tokenResponse.getToken();
        }

        BookStoreResponse books = apiClient.getBooks(token);

        assertNotNull(books);
        assertNotNull(books.getBooks());
        assertFalse(books.getBooks().isEmpty());
        assertTrue(books.getBooks().stream().anyMatch(book -> book.getTitle() != null && !book.getTitle().isBlank()));
    }

    @Test
    void shouldFailToGenerateTokenWithWrongPassword() {
        ensureUserExists();
        GenerateTokenResponse tokenResponse = apiClient.generateToken(new GenerateTokenRequest(username, "wrongPassword"));

        assertNotNull(tokenResponse);
        assertNull(tokenResponse.getToken());
        assertTrue(tokenResponse.getStatus() == null || !"Success".equalsIgnoreCase(tokenResponse.getStatus()));
    }

    @Test
    void shouldReturnEmptyBooksForInvalidToken() {
        BookStoreResponse books = apiClient.getBooks("invalid-token");

        assertNotNull(books);
        assertNotNull(books.getBooks());
        assertTrue(books.getBooks().isEmpty());
    }

    private void ensureUserExists() {
        if (!userCreated) {
            CreateUserResponse createdUser = apiClient.createUser(new CreateUserRequest(username, password));

            assertNotNull(createdUser);
            assertEquals(username, createdUser.getUsername());
            assertNotNull(createdUser.getUserId());
            userCreated = true;
        }
    }
}
