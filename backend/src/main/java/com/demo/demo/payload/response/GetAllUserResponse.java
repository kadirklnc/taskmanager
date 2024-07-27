package com.demo.demo.payload.response;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllUserResponse {
    private int id;
    private String username;
    private String email;


}
