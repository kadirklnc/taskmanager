package com.demo.demo.repository;

import com.demo.demo.models.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<Permission,Integer> {
    List<Permission> findByUserId(int userId);


}
