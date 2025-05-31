package com.example.internship.repository;

import com.example.internship.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 角色仓库
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * 根据角色名查找角色
     * @param name 角色名
     * @return 角色
     */
    Optional<Role> findByName(Role.ERole name);
}
