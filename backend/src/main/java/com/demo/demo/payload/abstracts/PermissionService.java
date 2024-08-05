package com.demo.demo.payload.abstracts;

import com.demo.demo.payload.request.CreatePermissionRequest;
import com.demo.demo.payload.request.UpdatePermissionRequest;
import com.demo.demo.payload.request.UpdateTotalLeaveDays;
import com.demo.demo.payload.response.GetAllPermissionResponse;
import com.demo.demo.payload.response.GetByIdPermissionResponse;
import com.demo.demo.payload.response.GetByUserIdPermissionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PermissionService {
    List<GetAllPermissionResponse> getAllPermission();
    GetByIdPermissionResponse getPermissionsById(int id);
    List<GetByUserIdPermissionResponse> getPermissionsByUserId(int userId);
    ResponseEntity<?> add(CreatePermissionRequest createPermissionRequest);
    ResponseEntity<?> update(UpdatePermissionRequest updatePermissionRequest);
    void delete(int id);
    ResponseEntity<?> updateTotalLeaveDays(UpdateTotalLeaveDays totalLeaveDays);
}
