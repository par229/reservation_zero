package com.zeroton.reservation.reservation_zeroton.config;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;

@Component
public class EnvConfig {
    private static final Dotenv dotenv = Dotenv.load();

    public static String getSecretKey() {
        return dotenv.get("JWT_SECRET_KEY");
    }
}

