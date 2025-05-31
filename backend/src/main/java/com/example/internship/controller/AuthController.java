package com.example.internship.controller;

import com.example.internship.model.Role;
import com.example.internship.model.User;
import com.example.internship.payload.request.LoginRequest;
import com.example.internship.payload.request.SignupRequest;
import com.example.internship.payload.response.JwtResponse;
import com.example.internship.payload.response.MessageResponse;
import com.example.internship.repository.RoleRepository;
import com.example.internship.repository.UserRepository;
import com.example.internship.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 认证控制器
 * 处理用户注册和登录
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    /**
     * 用户登录
     * @param loginRequest 登录请求
     * @return JWT响应
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        org.springframework.security.core.userdetails.UserDetails userDetails = 
                (org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal();
        
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                roles
        ));
    }

    /**
     * 用户注册
     * @param signupRequest 注册请求
     * @return 消息响应
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        // 检查用户名是否已存在
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("错误: 用户名已被使用!"));
        }

        // 检查邮箱是否已存在
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("错误: 邮箱已被使用!"));
        }

        // 创建新用户
        User user = new User(
                signupRequest.getUsername(),
                encoder.encode(signupRequest.getPassword()),
                signupRequest.getEmail(),
                signupRequest.getFullName()
        );

        Set<String> strRoles = signupRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            // 默认角色为实习生
            Role internRole = roleRepository.findByName(Role.ERole.ROLE_INTERN)
                    .orElseThrow(() -> new RuntimeException("错误: 角色未找到"));
            roles.add(internRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(Role.ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("错误: 角色未找到"));
                        roles.add(adminRole);
                        break;
                    case "mentor":
                        Role mentorRole = roleRepository.findByName(Role.ERole.ROLE_MENTOR)
                                .orElseThrow(() -> new RuntimeException("错误: 角色未找到"));
                        roles.add(mentorRole);
                        break;
                    case "hr":
                        Role hrRole = roleRepository.findByName(Role.ERole.ROLE_HR)
                                .orElseThrow(() -> new RuntimeException("错误: 角色未找到"));
                        roles.add(hrRole);
                        break;
                    default:
                        Role internRole = roleRepository.findByName(Role.ERole.ROLE_INTERN)
                                .orElseThrow(() -> new RuntimeException("错误: 角色未找到"));
                        roles.add(internRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("用户注册成功!"));
    }
}
