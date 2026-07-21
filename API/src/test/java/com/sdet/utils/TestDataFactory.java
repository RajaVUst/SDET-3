package com.sdet.utils;

import java.util.UUID;

public final class TestDataFactory {

    private TestDataFactory() {}

    public static String uniqueUsername() {
        return "sdet_" + UUID.randomUUID().toString().replace("-", "").substring(0, 12);
    }
    public static String validPassword() {
        return required("TEST_PASSWORD");
    }

    public static String getTestUsername() {
        return required("TEST_USERNAME");
    }

    public static String getBaseUrl() {
        return value("TEST_BASE_URL", "https://demoqa.com");
    }

    private static String required(String key) {
        String value = EnvLoader.get(key);

        if (value == null || value.isBlank()) {
            throw new IllegalStateException("Missing required environment variable: " + key);
        }
        return value;
    }

    private static String value(String key, String defaultValue) {
        String value = EnvLoader.get(key);
        return value == null || value.isBlank() ? defaultValue : value;
    }
}