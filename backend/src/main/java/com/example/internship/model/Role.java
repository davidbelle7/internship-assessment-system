package com.example.internship.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 角色实体类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    private String description;

    /**
     * 角色枚举
     */
    public enum ERole {
        ROLE_ADMIN,    // 管理员
        ROLE_MENTOR,   // 导师
        ROLE_INTERN,   // 实习生
        ROLE_HR        // 人力资源
    }

    /**
     * 创建角色
     * @param name 角色名称
     * @param description 角色描述
     */
    public Role(ERole name, String description) {
        this.name = name;
        this.description = description;
    }
}
