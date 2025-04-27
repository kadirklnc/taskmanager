package com.demo.demo.payload.concretes;


import com.demo.demo.models.ERole;
import com.demo.demo.models.Role;
import com.demo.demo.models.User;
import com.demo.demo.payload.request.PasswordChangeRequest;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
        return users.stream()
                .map(user -> {
                    Set<Role> roles = user.getRoles();
                    GetAllUserResponse response = modelMapperService.roleMapper().map(user, GetAllUserResponse.class);
                    response.setRole(roles != null ? roles.stream()
                            .map(role -> role.getName().name())
                            .collect(Collectors.toSet()) : null);
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public GetByIdUserResponse getById(int id) {
        User user = this.userRepository.findById(id).orElseThrow();

        GetByIdUserResponse response = modelMapperService.roleMapper().map(user, GetByIdUserResponse.class);

        Set<Role> roles = user.getRoles();
        response.setRole(roles != null ? roles.stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet()) : null);

        return response;
    }

    @Override
    public ResponseEntity<?> add(CreateUserRequest createUserRequest) {

        userBusinessRules.checkIfEmailExists(createUserRequest.getEmail());


        User user = new User(
                createUserRequest.getEmail(),
                encoder.encode(createUserRequest.getPassword()),
                createUserRequest.getName(),
                createUserRequest.getSurname(),
                createUserRequest.getDepartment(),
                createUserRequest.getGender(),
                createUserRequest.getDate(),
                createUserRequest.getPhone(),
                createUserRequest.getIs_active());

        Set<String> strRoles = createUserRequest.getRole();
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

        return ResponseEntity.ok(new MessageResponse("User Registered Successfully"));
    }



    @Override
    public ResponseEntity<?> update(int id, UpdateUserRequest updateUserRequest) {

            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: User is not found."));


        if (updateUserRequest.getEmail() != null && !updateUserRequest.getEmail().trim().isEmpty()) {
            userBusinessRules.checkIfEmailExists(updateUserRequest.getEmail());
            user.setEmail(updateUserRequest.getEmail());
        }

        if (updateUserRequest.getName() != null && !updateUserRequest.getName().trim().isEmpty()) {
            user.setName(updateUserRequest.getName());
        }

        if (updateUserRequest.getSurname() != null && !updateUserRequest.getSurname().trim().isEmpty()) {
            user.setSurname(updateUserRequest.getSurname());
        }

        if (updateUserRequest.getDepartment() != null && !updateUserRequest.getDepartment().trim().isEmpty()) {
            user.setDepartment(updateUserRequest.getDepartment());
        }

        if (updateUserRequest.getGender() != null && !updateUserRequest.getGender().trim().isEmpty()) {
            user.setGender(updateUserRequest.getGender());
        }

        if (updateUserRequest.getDate() != null && !updateUserRequest.getDate().trim().isEmpty()) {
            user.setDate(updateUserRequest.getDate());
        }

        if (updateUserRequest.getPhone() != null && !updateUserRequest.getPhone().trim().isEmpty()) {
            user.setPhone(updateUserRequest.getPhone());
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

        user.setIs_active(updateUserRequest.getIs_active());

            userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User Updated Successfully"));

    }

    @Override
    public void delete(int id) {
        this.userRepository.deleteById(id);
    }

    @Override
    public void changePassword(int userId, PasswordChangeRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getOldPass(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(encoder.encode(request.getNewPass()));
        userRepository.save(user);
    }

    public void changeUserPass(PasswordChangeRequest passwordChangeRequest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            throw new RuntimeException("User is not authenticated");
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(passwordChangeRequest.getOldPass(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(encoder.encode(passwordChangeRequest.getNewPass()));
        userRepository.save(user);
    }
}



