package com.demo.demo.security.services;

import com.demo.demo.models.User;
import com.demo.demo.models.Role;
import com.demo.demo.models.ERole;
import com.demo.demo.payload.abstracts.AuthService;
import com.demo.demo.payload.request.LoginRequest;
import com.demo.demo.payload.request.SignupRequest;
import com.demo.demo.payload.response.JwtResponse;
import com.demo.demo.payload.response.MessageResponse;
import com.demo.demo.repository.UserRepository;
import com.demo.demo.repository.RoleRepository;
import com.demo.demo.security.jwt.JwtUtils;
import com.demo.demo.security.services.UserDetailsImpl;
import com.demo.demo.security.LoginAttemptService;
import com.demo.demo.utilities.AESUtil;
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
import java.util.Set;
import java.util.HashSet;

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
    private RoleRepository roleRepository;

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
        String email = loginRequest.getEmail();

        if (loginAttemptService.isBlocked(email)) {
            return ResponseEntity.status(429).body(TOO_MANY_ATTEMPTS_MSG);
        }

        if (!captchaService.verifyCaptcha(loginRequest.getCaptcha())) {
            loginAttemptService.loginFailed(email);
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
            loginAttemptService.loginSucceeded(email);

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
            loginAttemptService.loginFailed(email);
            return ResponseEntity.status(401).body(INVALID_CREDENTIALS_MSG);
        }
    }

    @Override
    public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {
        // Check if email already exists
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        String encryptedEmail = null;
        String encryptedPhone = null;
        try {
            encryptedEmail = AESUtil.encrypt(signUpRequest.getEmail());
            encryptedPhone = AESUtil.encrypt(signUpRequest.getPhone());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Encryption error"));
        }

        // Create new user
        User user = new User(
            encryptedEmail,
            passwordEncoder.encode(signUpRequest.getPassword()),
            signUpRequest.getName(),
            signUpRequest.getSurname(),
            signUpRequest.getDepartment(),
            signUpRequest.getGender(),
            signUpRequest.getDate(),
            encryptedPhone,
            signUpRequest.getIs_active()
        );

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    private String getClientIdentifier() {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0]; // First IP in the list is the original client
    }
}