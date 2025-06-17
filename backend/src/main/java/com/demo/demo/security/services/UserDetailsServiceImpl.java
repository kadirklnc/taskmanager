package com.demo.demo.security.services;

import com.demo.demo.models.User;
import com.demo.demo.repository.UserRepository;
import com.demo.demo.utilities.AESUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            String encryptedEmail = AESUtil.encrypt(email);
            User user = userRepository.findByEmail(encryptedEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));
            return UserDetailsImpl.build(user);
        } catch (UsernameNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new UsernameNotFoundException("Error loading user: " + e.getMessage());
        }
    }
}
