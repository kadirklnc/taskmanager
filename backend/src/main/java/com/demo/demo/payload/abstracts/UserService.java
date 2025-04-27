package com.demo.demo.payload.abstracts;

import com.demo.demo.payload.request.CreateUserRequest;
import com.demo.demo.payload.request.PasswordChangeRequest;
import com.demo.demo.payload.request.UpdateUserRequest;
import com.demo.demo.payload.response.GetAllUserResponse;
import com.demo.demo.payload.response.GetByIdUserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    List<GetAllUserResponse> getAll();
    GetByIdUserResponse getById(int id);
    ResponseEntity<?> add(CreateUserRequest createUserRequest);
    ResponseEntity<?> update(int id, UpdateUserRequest updateUserRequest);
    void delete(int id);
    void changePassword(int id ,PasswordChangeRequest passwordChangeRequest);
    void changeUserPass(PasswordChangeRequest passwordChangeRequest);
}
