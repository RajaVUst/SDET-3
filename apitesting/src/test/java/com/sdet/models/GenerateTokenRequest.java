package com.sdet.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GenerateTokenRequest {
    @JsonProperty("userName")
    private String userName;

    @JsonProperty("password")
    private String password;

    public GenerateTokenRequest() {
    }

    public GenerateTokenRequest(String userName, String password) {
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
