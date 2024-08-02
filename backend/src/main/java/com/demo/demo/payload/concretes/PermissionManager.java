package com.demo.demo.payload.concretes;


import com.demo.demo.models.EIsActive;
import com.demo.demo.models.Permission;
import com.demo.demo.models.User;
import com.demo.demo.payload.abstracts.PermissionService;
import com.demo.demo.payload.request.CreatePermissionRequest;
import com.demo.demo.payload.request.UpdatePermissionRequest;
import com.demo.demo.payload.response.GetAllPermissionResponse;

import com.demo.demo.payload.response.GetByIdPermissionResponse;
import com.demo.demo.payload.response.MessageResponse;
import com.demo.demo.repository.PermissionRepository;
import com.demo.demo.repository.UserRepository;
import com.demo.demo.security.services.UserDetailsImpl;
import com.demo.demo.utilities.mapper.ModelMapperService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class PermissionManager implements PermissionService {

    private PermissionRepository permissionRepository;

    private UserRepository userRepository;

    @Qualifier("customModelMapper")
    private ModelMapperService modelMapperService;

    public PermissionManager(PermissionRepository permissionRepository, UserRepository userRepository, ModelMapperService modelMapperService) {
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public List<GetAllPermissionResponse> getAllPermission() {
        List<Permission> permissions = permissionRepository.findAll();
        List<GetAllPermissionResponse> responses = permissions.stream()
                .map(permission -> modelMapperService.customModelMapper().map(permission, GetAllPermissionResponse.class))
                .collect(Collectors.toList());
        return responses;
    }

    @Override
    public GetByIdPermissionResponse getPermissionsByUserId(int id) {
        Permission permission = this.permissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permission not found with id " + id));

        GetByIdPermissionResponse response = this.modelMapperService.customModelMapper().map(permission, GetByIdPermissionResponse.class);
        return response;
    }

    @Override
    public ResponseEntity<?> add(CreatePermissionRequest createPermissionRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        int userId = userDetails.getId();


        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Permission permission = new Permission(
                createPermissionRequest.getStartDate(),
                createPermissionRequest.getEndDate(),
                createPermissionRequest.getDescription(),
                user
        );

        permission.calculateDaysBetweenDates();

        permissionRepository.save(permission);
        return ResponseEntity.ok(new MessageResponse("Permission created successfully"));

    }

    @Override
    public ResponseEntity<?> update(UpdatePermissionRequest updatePermissionRequest) {
        Permission permission = permissionRepository.findById(updatePermissionRequest.getId())
                .orElseThrow(() -> new RuntimeException("Permission not found"));

        EIsActive newStatus = updatePermissionRequest.getIsActive();



        if (newStatus == EIsActive.ACCEPT && permission.getIs_active() != EIsActive.ACCEPT) {
            User user = permission.getUser();
            long days = ChronoUnit.DAYS.between(permission.getStartdate().toInstant(), permission.getEnddate().toInstant()) + 1;
            user.setTotalLeaveDays(user.getTotalLeaveDays() - (int) days);
            userRepository.save(user);
        }

        permission.setIs_active(newStatus);
        permissionRepository.save(permission);

        return ResponseEntity.ok(new MessageResponse("Permission updated successfully"));
    }

    @Override
    public void delete(int id) {
        this.permissionRepository.deleteById(id);
    }


    public ResponseEntity<?> updateTotalLeaveDays(int userId, int newTotalLeaveDays) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setTotalLeaveDays(newTotalLeaveDays);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Total leave days updated successfully"));
    }
}

