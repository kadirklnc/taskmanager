package com.demo.demo.security.services;

import com.demo.demo.models.User;
import com.demo.demo.payload.abstracts.AuthService;
import com.demo.demo.payload.request.LoginRequest;
import com.demo.demo.payload.request.SignupRequest;
import com.demo.demo.payload.response.JwtResponse;
import com.demo.demo.repository.UserRepository;
import com.demo.demo.security.jwt.JwtUtils;
import com.demo.demo.security.services.UserDetailsImpl;
import com.demo.demo.security.LoginAttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Primary;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Primary
public class AuthServiceImpl implements AuthService {
    private static final String TOO_MANY_ATTEMPTS_MSG = "Too many failed attempts. Please try again later.";
    private static final String INVALID_CREDENTIALS_MSG = "Invalid email or password.";

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private LoginAttemptService loginAttemptService;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private CaptchaService captchaService;


    @Override
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        String clientIdentifier = getClientIdentifier();

        if (loginAttemptService.isBlocked(clientIdentifier)) {
            return ResponseEntity.status(429).body(TOO_MANY_ATTEMPTS_MSG);
        }

        if (!captchaService.verifyCaptcha(loginRequest.getCaptcha())) {
            return ResponseEntity.badRequest().body("Invalid CAPTCHA. Please try again.");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            loginAttemptService.loginSucceeded(clientIdentifier);

            String jwt = jwtUtils.generateJwtToken(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(
                    jwt,
                    userDetails.getId(),
                    userDetails.getEmail(),
                    roles
            ));
        } catch (Exception e) {
            loginAttemptService.loginFailed(clientIdentifier);
            return ResponseEntity.status(401).body(INVALID_CREDENTIALS_MSG);
        }
    }

    @Override
    public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {
        // Implementation here
        return ResponseEntity.ok("Registration successful");
    }

    private String getClientIdentifier() {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0]; // First IP in the list is the original client
    }
}