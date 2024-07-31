package com.demo.demo.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreatePermissionRequest {
    private Date startDate;
    private Date endDate;
    private String description;

}
