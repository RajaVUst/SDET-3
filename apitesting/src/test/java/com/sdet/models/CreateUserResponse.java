package com.sdet.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CreateUserResponse {
    private String userID;
    private String username;

    @JsonProperty("userID")
    public String getUserId() {
        return userID;
    }

    @JsonProperty("userID")
    public void setUserId(String userId) {
        this.userID = userId;
    }

    @JsonProperty("username")
    public String getUsername() {
        return username;
    }

    @JsonProperty("username")
    public void setUsername(String username) {
        this.username = username;
    }
}
