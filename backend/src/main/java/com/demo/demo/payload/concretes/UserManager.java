package com.demo.demo.payload.concretes;

import com.demo.demo.models.ERole;
import com.demo.demo.models.Role;
import com.demo.demo.models.User;
import com.demo.demo.payload.response.MessageResponse;
import com.demo.demo.payload.rules.UserBusinessRules;
import com.demo.demo.repository.RoleRepository;
import com.demo.demo.utilities.mapper.ModelMapperService;
import com.demo.demo.payload.abstracts.UserService;
import com.demo.demo.payload.request.CreateUserRequest;
import com.demo.demo.payload.request.UpdateUserRequest;
import com.demo.demo.payload.response.GetAllUserResponse;
import com.demo.demo.payload.response.GetByIdUserResponse;
import com.demo.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserManager implements UserService {

    private UserRepository userRepository;
    private ModelMapperService modelMapperService;
    private UserBusinessRules userBusinessRules;
    private RoleRepository roleRepository;
    private PasswordEncoder encoder;


    @Override
    public List<GetAllUserResponse> getAll() {
    List<User> users = userRepository.findAll();
    List<GetAllUserResponse> userResponses = users.stream().map(user -> this.modelMapperService.forResponse().map(user,GetAllUserResponse.class)).collect(Collectors.toList());
    return userResponses;
    }

    @Override
    public GetByIdUserResponse getById(int id) {
        User user =this.userRepository.findById(id).orElseThrow();

        GetByIdUserResponse response = this.modelMapperService.forResponse().map(user,GetByIdUserResponse.class);
         return  response;
    }

    @Override
    public ResponseEntity<?> add(CreateUserRequest createUserRequest) {

        this.userBusinessRules.checkIfUsernameExists(createUserRequest.getUsername());
        this.userBusinessRules.checkIfEmailExists(createUserRequest.getEmail());


        User user = new User(encoder.encode(createUserRequest.getPassword()),createUserRequest.getEmail(),createUserRequest.getUsername());

        Set<String> strRoles = createUserRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles==null){
            Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: role is not found."));
            roles.add(userRole);
        }else{
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
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User Registered Successfully"));
    }



    @Override
    public ResponseEntity<?> update(int id, UpdateUserRequest updateUserRequest) {

            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: User is not found."));

        if (updateUserRequest.getUsername() != null && !updateUserRequest.getUsername().trim().isEmpty()) {
            userBusinessRules.checkIfUsernameExists(updateUserRequest.getUsername());
            user.setUsername(updateUserRequest.getUsername());
        }

        if (updateUserRequest.getEmail() != null && !updateUserRequest.getEmail().trim().isEmpty()) {
            userBusinessRules.checkIfEmailExists(updateUserRequest.getEmail());
            user.setEmail(updateUserRequest.getEmail());
        }

        if (updateUserRequest.getPassword() != null && !updateUserRequest.getPassword().trim().isEmpty()) {
            user.setPassword(encoder.encode(updateUserRequest.getPassword()));
        }

        if (updateUserRequest.getRole() != null && !updateUserRequest.getRole().isEmpty()) {
            Set<String> strRoles = updateUserRequest.getRole();
            Set<Role> roles = new HashSet<>();

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
                }
            });
            user.setRoles(roles);
        }

            userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User Updated Successfully"));

    }

    @Override
    public void delete(int id) {
        this.userRepository.deleteById(id);
    }
}


