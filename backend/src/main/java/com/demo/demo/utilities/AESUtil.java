package com.demo.demo.utilities;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;

@Component
public class AESUtil {
    private static final Logger logger = LoggerFactory.getLogger(AESUtil.class);
    private static final String ALGORITHM = "AES";
    private static final String TRANSFORMATION = "AES/ECB/PKCS5Padding";
    // Use a 16-byte (128-bit) key. Store this securely!
    private static final String SECRET_KEY = "1234567890123456"; // Exactly 16 bytes in UTF-8

    @PostConstruct
    public void init() {
        logger.info("AESUtil initialized with key length: {}", SECRET_KEY.getBytes(StandardCharsets.UTF_8).length);
    }

    public static String encrypt(String value) throws Exception {
        if (value == null || value.trim().isEmpty()) {
            logger.debug("Empty value provided for encryption");
            return value;
        }
        try {
            logger.debug("Starting encryption for value: {}", value);
            byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
            SecretKeySpec key = new SecretKeySpec(keyBytes, ALGORITHM);
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] valueBytes = value.getBytes(StandardCharsets.UTF_8);
            byte[] encrypted = cipher.doFinal(valueBytes);
            String result = Base64.getEncoder().encodeToString(encrypted);
            logger.debug("Encryption successful. Result length: {}", result.length());
            return result;
        } catch (Exception e) {
            logger.error("Encryption failed for value: {}. Error: {}", value, e.getMessage(), e);
            throw new Exception("Encryption failed: " + e.getMessage(), e);
        }
    }

    public static String decrypt(String encrypted) throws Exception {
        if (encrypted == null || encrypted.trim().isEmpty()) {
            logger.debug("Empty value provided for decryption");
            return encrypted;
        }
        try {
            logger.debug("Starting decryption");
            byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
            SecretKeySpec key = new SecretKeySpec(keyBytes, ALGORITHM);
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] decoded = Base64.getDecoder().decode(encrypted);
            byte[] original = cipher.doFinal(decoded);
            String result = new String(original, StandardCharsets.UTF_8);
            logger.debug("Decryption successful");
            return result;
        } catch (Exception e) {
            logger.error("Decryption failed. Error: {}", e.getMessage(), e);
            throw new Exception("Decryption failed: " + e.getMessage(), e);
        }
    }
} 