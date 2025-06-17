package com.demo.demo.utilities;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class AESUtil {
    // 16 bytes (128 bits) key for AES-128
    private static final String SECRET_KEY = "1234567890123456"; // Exactly 16 bytes
    private static final String ALGORITHM = "AES/CBC/PKCS5Padding";
    private static final String IV = "1234567890123456"; // 16 bytes IV

    public static String encrypt(String value) {
        try {
            if (value == null || value.trim().isEmpty()) {
                return value;
            }

            SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "AES");
            IvParameterSpec iv = new IvParameterSpec(IV.getBytes(StandardCharsets.UTF_8));
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, key, iv);
            byte[] encryptedBytes = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting value: " + e.getMessage(), e);
        }
    }

    public static String decrypt(String encrypted) {
        try {
            if (encrypted == null || encrypted.trim().isEmpty()) {
                return encrypted;
            }

            SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "AES");
            IvParameterSpec iv = new IvParameterSpec(IV.getBytes(StandardCharsets.UTF_8));
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key, iv);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encrypted));
            return new String(decryptedBytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Error decrypting value: " + e.getMessage(), e);
        }
    }
}