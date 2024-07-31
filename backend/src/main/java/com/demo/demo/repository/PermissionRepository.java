package com.demo.demo.repository;

import com.demo.demo.models.Permission;
import com.demo.demo.payload.response.GetAllPermissionResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<Permission,Integer> {
    List<GetAllPermissionResponse> findByUserId(int userId);
}
