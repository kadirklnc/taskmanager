package com.demo.demo.controllers;


import com.demo.demo.payload.abstracts.UserService;
import com.demo.demo.payload.request.PasswordChangeRequest;
import com.demo.demo.models.User;
import com.demo.demo.repository.UserRepository;
import com.demo.demo.utilities.AESUtil;
import com.demo.demo.utilities.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;
import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private  final UserService userService;
    @Autowired
    private UserRepository userRepository;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/change-password")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeRequest request) {
        try {
            userService.changeUserPass(request);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping(value = "/2fa/qr", produces = MediaType.IMAGE_PNG_VALUE)
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public @ResponseBody ResponseEntity<?> get2faQrCode(Principal principal) {
        try {
            String email = principal.getName();
            User user = userRepository.findByEmail(AESUtil.encrypt(email)).orElseThrow();
            String otpSecret = user.getOtpSecret();
            String issuer = "TaskManager";
            var qrImage = OtpUtil.generateOtpQrCode(email, otpSecret, issuer);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(qrImage, "png", baos);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(baos.toByteArray());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("QR kod oluşturulamadı: " + e.getMessage());
        }
    }

    @PostMapping("/2fa/verify")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> verify2faCode(@RequestParam String code, Principal principal) {
        try {
            String email = principal.getName();
            User user = userRepository.findByEmail(AESUtil.encrypt(email)).orElseThrow();
            String otpSecret = user.getOtpSecret();
            boolean isValid = OtpUtil.verifyOtpCode(otpSecret, code);
            if (isValid) {
                return ResponseEntity.ok("OTP doğrulandı.");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP geçersiz.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Hata: " + e.getMessage());
        }
    }
}
