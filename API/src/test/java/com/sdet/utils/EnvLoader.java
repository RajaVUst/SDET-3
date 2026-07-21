package com.sdet.utils;

import io.github.cdimascio.dotenv.Dotenv;

public final class EnvLoader {

    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

    private EnvLoader() {}
    public static String get(String key) {
        String value = System.getenv(key);
        if (value == null || value.isBlank()) {
            value = dotenv.get(key);
        }
        return value;
    }
}