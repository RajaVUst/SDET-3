package com.apitesting.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class EnvConfig {
    private static final Properties props = new Properties();

    static {
        try (FileInputStream fis = new FileInputStream("src/test/resources/config.properties")) {
            props.load(fis);
        } catch (IOException ignored) {
        }
    }

    public static String get(String key) {
        String envName = getEnvName(key);
        String value = System.getenv(envName);
        if (value != null && !value.isBlank()) {
            return value;
        }
        value = props.getProperty(key);
        if (value != null && !value.isBlank()) {
            return value;
        }
        throw new RuntimeException("Missing required configuration for key: " + key + " (env: " + envName + ")");
    }

    public static String baseUri() {
        return get("base.uri");
    }

    private static String getEnvName(String key) {
        return "API_" + key.toUpperCase().replace('.', '_');
    }
}