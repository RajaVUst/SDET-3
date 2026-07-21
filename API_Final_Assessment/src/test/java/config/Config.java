package config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {

    private static final Dotenv dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .load();

    public static final String BASE_URL =
            System.getenv("BASE_URL") != null
                    ? System.getenv("BASE_URL")
                    : dotenv.get("BASE_URL");

    private Config() {}
}