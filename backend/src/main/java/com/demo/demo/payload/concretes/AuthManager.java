package com.demo.demo.payload.concretes;

import com.demo.demo.models.ERole;
import com.demo.demo.models.Role;
import com.demo.demo.models.User;
import com.demo.demo.payload.abstracts.AuthService;
import com.demo.demo.payload.request.LoginRequest;
import com.demo.demo.payload.request.SignupRequest;
import com.demo.demo.payload.response.JwtResponse;
import com.demo.demo.payload.response.MessageResponse;
import com.demo.demo.payload.rules.UserBusinessRules;
import com.demo.demo.repository.RoleRepository;
import com.demo.demo.repository.UserRepository;
import com.demo.demo.security.jwt.JwtUtils;
import com.demo.demo.security.services.UserDetailsImpl;
import com.demo.demo.utilities.AESUtil;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthManager implements AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthManager.class);

    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder encoder;
    private UserBusinessRules userBusinessRules;

    @Override
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        if (userDetails.getIs_active() == 0) {
            throw new RuntimeException("User is not active");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                roles));
    }

    @Override
    public ResponseEntity<?> registerUser(SignupRequest signupRequest) {
        logger.debug("Starting user registration for email: {}", signupRequest.getEmail());
        
        try {
            // Validate required fields
            if (signupRequest.getEmail() == null || signupRequest.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new MessageResponse("Email is required"));
            }
            if (signupRequest.getPhone() == null || signupRequest.getPhone().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new MessageResponse("Phone number is required"));
            }

            userBusinessRules.checkIfEmailExists(signupRequest.getEmail());
            logger.debug("Email check passed");

            String encryptedEmail = null;
            String encryptedPhone = null;
            try {
                logger.debug("Attempting to encrypt email and phone");
                encryptedEmail = AESUtil.encrypt(signupRequest.getEmail());
                encryptedPhone = AESUtil.encrypt(signupRequest.getPhone());
                logger.debug("Encryption successful");
            } catch (Exception e) {
                logger.error("Encryption failed: {}", e.getMessage(), e);
                return ResponseEntity.badRequest().body(new MessageResponse("Encryption error: " + e.getMessage()));
            }

            // Create user with encrypted data
            User user = new User(
                    encryptedEmail,
                    encoder.encode(signupRequest.getPassword()),
                    signupRequest.getName(),
                    signupRequest.getSurname(),
                    signupRequest.getDepartment(),
                    signupRequest.getGender(),
                    signupRequest.getDate(),
                    encryptedPhone,
                    signupRequest.getIs_active());

            Set<String> strRoles = signupRequest.getRole();
            Set<Role> roles = new HashSet<>();

            if (strRoles == null) {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(adminRole);
                            break;
                        case "mod":
                            Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(modRole);
                            break;
                        default:
                            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);
                            break;
                    }
                });
            }

            user.setRoles(roles);
            userRepository.save(user);
            logger.debug("User registration completed successfully");

            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            logger.error("User registration failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(new MessageResponse("Registration failed: " + e.getMessage()));
        }
    }
}
