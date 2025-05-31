package com.example.internship.payload.response;

import lombok.Data;

import java.util.List;

/**
 * JWT响应
 */
@Data
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private List<String> roles;

    /**
     * 构造JWT响应
     * @param accessToken 访问令牌
     * @param id 用户ID
     * @param username 用户名
     * @param email 邮箱
     * @param fullName 全名
     * @param roles 角色列表
     */
    public JwtResponse(String accessToken, Long id, String username, String email, String fullName, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }
}
