package com.demo.demo.payload.rules;

import com.demo.demo.repository.UserRepository;
import com.demo.demo.utilities.exceptions.BusinessException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserBusinessRules {
    private static final Logger logger = LoggerFactory.getLogger(UserBusinessRules.class);
    
    private final UserRepository userRepository;

    public void checkIfEmailExists(String email) {
        logger.debug("Checking if email exists: {}", email);
        if (email == null || email.trim().isEmpty()) {
            throw new BusinessException("Email cannot be empty");
        }
        
        if (this.userRepository.existsByEmail(email)) {
            logger.debug("Email already exists: {}", email);
            throw new BusinessException("Email already exists");
        }
        logger.debug("Email is available: {}", email);
    }
}
