package com.demo.demo.payload.response;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;




@NoArgsConstructor
@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private int id;
    private String email;
    private List<String> roles;

    public JwtResponse(String token, int id,  String email,List<String> roles) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.roles = roles;
    }
}