package com.demo.demo.payload.rules;

import com.demo.demo.repository.UserRepository;
import com.demo.demo.utilities.exceptions.BusinessException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserBusinessRules {
    private UserRepository userRepository;

    public void checkIfUsernameExists(String username){
        if(this.userRepository.existsByUsername(username)){
            throw new BusinessException("username allready Exists");
        }
    }
    public void checkIfEmailExists(String email){
        if(this.userRepository.existsByEmail(email)){
            throw new BusinessException("email allready Exists");
        }
    }
}
