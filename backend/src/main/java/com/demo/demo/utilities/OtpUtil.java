package com.demo.demo.utilities;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;
import java.awt.image.BufferedImage;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.common.BitMatrix;
import org.jboss.aerogear.security.otp.Totp;

public class OtpUtil {
    // Kullanıcıya özel OTP secret key üretir
    public static String generateOtpSecret() throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA1");
        keyGenerator.init(160); // 160 bit
        SecretKey secretKey = keyGenerator.generateKey();
        return Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }

    // Google Authenticator için QR kodu üretir
    public static BufferedImage generateOtpQrCode(String userEmail, String otpSecret, String issuer) {
        try {
            String otpAuthUrl = String.format(
                "otpauth://totp/%s:%s?secret=%s&issuer=%s",
                issuer, userEmail, otpSecret, issuer
            );
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(otpAuthUrl, BarcodeFormat.QR_CODE, 250, 250);
            BufferedImage image = new BufferedImage(250, 250, BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 250; x++) {
                for (int y = 0; y < 250; y++) {
                    image.setRGB(x, y, bitMatrix.get(x, y) ? 0x000000 : 0xFFFFFF);
                }
            }
            return image;
        } catch (Exception e) {
            return null;
        }
    }

    // OTP doğrulama (Google Authenticator kodunu kontrol eder)
    public static boolean verifyOtpCode(String otpSecret, String code) {
        try {
            Totp totp = new Totp(otpSecret);
            return totp.verify(code);
        } catch (Exception e) {
            return false;
        }
    }
} 