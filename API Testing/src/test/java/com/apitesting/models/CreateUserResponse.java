package com.apitesting.models;

import java.util.List;

public class CreateUserResponse {
    private String userID;
    private String username;
    private List<Object> books;

    public String getUserID() { return userID; }
    public String getUsername() { return username; }
    public List<Object> getBooks() { return books; }
}