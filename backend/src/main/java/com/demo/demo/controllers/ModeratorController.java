package com.demo.demo.controllers;


import com.demo.demo.payload.abstracts.UserService;
import com.demo.demo.payload.request.CreateUserRequest;
import com.demo.demo.payload.request.PasswordChangeRequest;
import com.demo.demo.payload.request.UpdateUserRequest;
import com.demo.demo.payload.response.GetAllUserResponse;
import com.demo.demo.payload.response.GetByIdUserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/mod")
public class ModeratorController {

    private final UserService userService;

    public ModeratorController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public List<GetAllUserResponse> getAll(){
        return userService.getAll();
    }

    @GetMapping("/getById/{id}")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public GetByIdUserResponse getByIdUser(@PathVariable int id){
        return userService.getById(id);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public void add(@RequestBody CreateUserRequest createUserRequest){
        this.userService.add(createUserRequest);
    }

    @DeleteMapping("/deleteUser/{id}")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public void delete(int id){
        this.userService.delete(id);
    }

    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    @PutMapping("/update/{id}")
    public void update(@PathVariable int id, @RequestBody UpdateUserRequest updateUserRequest){
        this.userService.update(id, updateUserRequest);
    }

    @PutMapping("/{id}/change-password")
    @PreAuthorize("hasAuthority('ROLE_MODERATOR')")
    public ResponseEntity<?> changePassword(@PathVariable int id, @RequestBody PasswordChangeRequest passwordChangeRequest){
        try {
            userService.changePassword(id,passwordChangeRequest);
            return ResponseEntity.ok("password changed successfully");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
