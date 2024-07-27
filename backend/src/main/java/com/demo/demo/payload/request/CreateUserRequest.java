package com.demo.demo.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateUserRequest {

    private String username;
    private String email;
    private String password;
    private Set<String> role;

}
