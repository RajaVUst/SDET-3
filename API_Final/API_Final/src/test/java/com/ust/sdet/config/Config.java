package com.ust.sdet.config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {

        private static final Dotenv dotenv = Dotenv.load();

        public static final String BASE_URL = dotenv.get("BASE_URL");
    private static String getValue(String key) {

        String value = System.getProperty(key);

        if (value == null || value.isEmpty()) {
            value = System.getenv(key);
        }

        if (value == null || value.isEmpty()) {
            value = dotenv.get(key);
        }

        if (value == null || value.isEmpty()) {
            throw new RuntimeException(key + " is not configured");
        }

        return value;
    }
        private Config() {
        }
    }
