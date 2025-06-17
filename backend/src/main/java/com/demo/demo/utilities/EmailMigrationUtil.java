package com.demo.demo.utilities;

import com.demo.demo.models.User;
import com.demo.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class EmailMigrationUtil {
    private static final Logger logger = LoggerFactory.getLogger(EmailMigrationUtil.class);

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void encryptAllEmailsAndPhones() {
        logger.info("Starting email and phone encryption migration...");
        List<User> users = userRepository.findAll();
        int successCount = 0;
        int failCount = 0;

        for (User user : users) {
            try {
                // Check if email is already encrypted
                if (user.getEmail() != null && !user.getEmail().contains("@")) {
                    logger.debug("Email already encrypted for user: {}", user.getId());
                    continue;
                }

                // Encrypt email
                if (user.getEmail() != null) {
                    String encryptedEmail = AESUtil.encrypt(user.getEmail());
                    user.setEmail(encryptedEmail);
                }

                // Encrypt phone
                if (user.getPhone() != null) {
                    String encryptedPhone = AESUtil.encrypt(user.getPhone());
                    user.setPhone(encryptedPhone);
                }

                userRepository.save(user);
                successCount++;
                logger.debug("Successfully encrypted data for user: {}", user.getId());
            } catch (Exception e) {
                failCount++;
                logger.error("Failed to encrypt data for user: {}. Error: {}", user.getId(), e.getMessage());
            }
        }

        logger.info("Migration completed. Success: {}, Failed: {}", successCount, failCount);
    }
} 