package com.demo.demo.controllers;

import com.demo.demo.payload.abstracts.PermissionService;
import com.demo.demo.payload.request.CreatePermissionRequest;
import com.demo.demo.payload.request.UpdatePermissionRequest;
import com.demo.demo.payload.request.UpdateUserRequest;
import com.demo.demo.payload.response.GetAllPermissionResponse;
import com.demo.demo.payload.response.GetByIdPermissionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permission")
public class PermissionController {

        private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public List<GetAllPermissionResponse> getAll(){
        return permissionService.getAllPermission();
    }

    @GetMapping("/getById/{id}")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public GetByIdPermissionResponse getByIdPermissionResponse(@PathVariable int id){
        return permissionService.getPermissionsByUserId(id);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public void add(@RequestBody CreatePermissionRequest createPermissionRequest){
        this.permissionService.add(createPermissionRequest);
    }

    @DeleteMapping("/delete-status/{id}")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public void delete(int id){
        this.permissionService.delete(id);
    }

    @PutMapping("/update-status")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public ResponseEntity<?> updatePermissionStatus(@RequestBody UpdatePermissionRequest updateRequest) {
        return permissionService.update(updateRequest);
    }


}
