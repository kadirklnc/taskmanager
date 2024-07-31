package com.demo.demo.payload.request;

import com.demo.demo.models.EIsActive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePermissionRequest {
    private int id;
    private EIsActive isActive;
}
