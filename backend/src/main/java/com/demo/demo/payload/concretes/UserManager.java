package com.demo.demo.payload.concretes;


import com.demo.demo.models.ERole;
import com.demo.demo.models.Role;
import com.demo.demo.models.User;
import com.demo.demo.payload.request.PasswordChangeRequest;
import com.demo.demo.payload.response.MessageResponse;
import com.demo.demo.payload.rules.UserBusinessRules;
import com.demo.demo.repository.RoleRepository;
import com.demo.demo.utilities.AESUtil;
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
                    try {
                        user.setPhone(AESUtil.decrypt(user.getPhone()));
                        user.setEmail(AESUtil.decrypt(user.getEmail()));
                    } catch (Exception e) {
                        // handle decryption error (log or set as null)
                        user.setPhone(null);
                        user.setEmail(null);
                    }
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
        try {
            user.setPhone(AESUtil.decrypt(user.getPhone()));
            user.setEmail(AESUtil.decrypt(user.getEmail()));
        } catch (Exception e) {
            user.setPhone(null);
            user.setEmail(null);
        }
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
        String encryptedEmail = null;
        String encryptedPhone = null;
        try {
            encryptedEmail = AESUtil.encrypt(createUserRequest.getEmail());
            encryptedPhone = AESUtil.encrypt(createUserRequest.getPhone());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Encryption error"));
        }
        User user = new User(
                encryptedEmail,
                encoder.encode(createUserRequest.getPassword()),
                createUserRequest.getName(),
                createUserRequest.getSurname(),
                createUserRequest.getDepartment(),
                createUserRequest.getGender(),
                createUserRequest.getDate(),
                encryptedPhone,
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
    public ResponseEntity<?> update(int id, UpdateUserRequest updateRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));

        if (updateRequest.getEmail() != null && !updateRequest.getEmail().trim().isEmpty()) {
            userBusinessRules.checkIfEmailExists(updateRequest.getEmail());
            try {
                user.setEmail(AESUtil.encrypt(updateRequest.getEmail()));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(new MessageResponse("Encryption error"));
            }
        }

        if (updateRequest.getName() != null && !updateRequest.getName().trim().isEmpty()) {
            user.setName(updateRequest.getName());
        }

        if (updateRequest.getSurname() != null && !updateRequest.getSurname().trim().isEmpty()) {
            user.setSurname(updateRequest.getSurname());
        }

        if (updateRequest.getDepartment() != null && !updateRequest.getDepartment().trim().isEmpty()) {
            user.setDepartment(updateRequest.getDepartment());
        }

        if (updateRequest.getGender() != null && !updateRequest.getGender().trim().isEmpty()) {
            user.setGender(updateRequest.getGender());
        }

        if (updateRequest.getDate() != null && !updateRequest.getDate().trim().isEmpty()) {
            user.setDate(updateRequest.getDate());
        }

        if (updateRequest.getPhone() != null && !updateRequest.getPhone().trim().isEmpty()) {
            try {
                user.setPhone(AESUtil.encrypt(updateRequest.getPhone()));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(new MessageResponse("Encryption error"));
            }
        }

        if (updateRequest.getPassword() != null && !updateRequest.getPassword().trim().isEmpty()) {
            user.setPassword(encoder.encode(updateRequest.getPassword()));
        }


        if (updateRequest.getRole() != null && !updateRequest.getRole().isEmpty()) {
            Set<String> strRoles = updateRequest.getRole();
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

        user.setIs_active(updateRequest.getIs_active());

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



