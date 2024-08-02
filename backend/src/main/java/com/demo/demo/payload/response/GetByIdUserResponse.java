package com.demo.demo.payload.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdUserResponse {
    private int id;
    private String name;
    private String surname;
    private String department;
    private String gender;
    private String date;
    private String phone;
    private String email;
    private Set<String> role;
    private int is_active;
    private int totalLeaveDays;
}
