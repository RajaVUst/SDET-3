package com.ust.capstone.models;

public class CreateUserRequest {

    private String userName;
    private String password;

    public CreateUserRequest(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}