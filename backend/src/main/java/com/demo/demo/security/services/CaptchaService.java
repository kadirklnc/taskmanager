package com.demo.demo.security.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class CaptchaService {

    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret; // application.properties içinde tanımladık

    private static final String GOOGLE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    public boolean verifyCaptcha(String captchaResponse) {
        if (captchaResponse == null || captchaResponse.isEmpty()) {
            return false;
        }

        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> body = new HashMap<>();
        body.put("secret", recaptchaSecret);
        body.put("response", captchaResponse);

        try {
            GoogleResponse googleResponse = restTemplate.postForObject(
                    GOOGLE_VERIFY_URL + "?secret={secret}&response={response}",
                    null,
                    GoogleResponse.class,
                    body
            );

            return googleResponse != null && googleResponse.isSuccess();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // İç class: Google'ın döndürdüğü cevabı tutmak için
    private static class GoogleResponse {
        private boolean success;

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }
    }
}
