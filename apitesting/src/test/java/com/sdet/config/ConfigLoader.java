package com.sdet.config;

import io.github.cdimascio.dotenv.Dotenv;

public class ConfigLoader {

    private final Dotenv dotenv;

    public ConfigLoader() {
        dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();
    }

    public String getBaseUrl() {
        return getValue(
                "KAVYA_DEMOQA_BASE_URL",
                "DEMOQA_BASE_URL",
                "https://demoqa.com"
        );
    }

    public String getUsernamePrefix() {
        return getValue(
                "KAVYA_DEMOQA_USERNAME_PREFIX",
                "DEMOQA_USERNAME_PREFIX",
                "qauser_"
        );
    }

    public String getUsername() {
        return getValue(
                "KAVYA_DEMOQA_USERNAME",
                "DEMOQA_USERNAME",
                getUsernamePrefix() + System.currentTimeMillis()
        );
    }

    public String getPassword() {
        return getValue(
                "KAVYA_DEMOQA_PASSWORD",
                "DEMOQA_PASSWORD",
                "Password@123"
        );
    }

    private String getValue(String githubKey,
                            String localKey,
                            String defaultValue) {

        String value = System.getenv(githubKey);

        if (value != null && !value.isBlank()) {
            return value;
        }

        value = dotenv.get(localKey);

        if (value != null && !value.isBlank()) {
            return value;
        }

        return defaultValue;
    }
}