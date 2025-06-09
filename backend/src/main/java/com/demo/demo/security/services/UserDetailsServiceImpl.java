package com.demo.demo.security.services;

import com.demo.demo.models.User;
import com.demo.demo.repository.UserRepository;
import com.demo.demo.utilities.AESUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            logger.debug("Attempting to load user by email: {}", email);
            
            // Try to find user with encrypted email
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));

            // Decrypt email for UserDetailsImpl
            try {
                String decryptedEmail = AESUtil.decrypt(user.getEmail());
                user.setEmail(decryptedEmail);
            } catch (Exception e) {
                logger.error("Failed to decrypt email: {}", e.getMessage());
                // Continue with encrypted email if decryption fails
            }

            logger.debug("User found successfully");
            return UserDetailsImpl.build(user);
        } catch (UsernameNotFoundException e) {
            logger.error("User not found: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error loading user: {}", e.getMessage());
            throw new UsernameNotFoundException("Error loading user: " + e.getMessage());
        }
    }
}
