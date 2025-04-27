package com.demo.demo.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
    private String captcha; // <<< BURAYI EKLE

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCaptcha() {    // <<< BURAYI EKLE
        return captcha;
    }

    public void setCaptcha(String captcha) {   // <<< BURAYI EKLE
        this.captcha = captcha;
    }
}
