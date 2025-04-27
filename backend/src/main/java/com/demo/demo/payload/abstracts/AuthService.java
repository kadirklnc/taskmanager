package com.demo.demo.payload.abstracts;

import com.demo.demo.payload.request.LoginRequest;
import com.demo.demo.payload.request.SignupRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public interface AuthService {
    ResponseEntity<?> authenticateUser(LoginRequest loginRequest);
    ResponseEntity<?> registerUser(SignupRequest signupRequest);

}
