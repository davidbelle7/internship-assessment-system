# 实习生评估系统 - 后端

基于Spring Boot的实习生评估系统后端项目。

## 技术栈

- Spring Boot
- Spring Data JPA
- Spring Security
- MySQL
- Maven

## 项目设置

```bash
# 使用Maven包装器运行应用
./mvnw spring-boot:run

# 构建项目
./mvnw clean package
```

## 项目结构

- `src/main/java`: Java源代码
  - `controller`: REST API控制器
  - `service`: 业务逻辑
  - `repository`: 数据访问层
  - `model`: 数据模型
  - `config`: 配置类
  - `security`: 安全配置
- `src/main/resources`: 配置文件
  - `application.properties`: 应用配置
- `src/test`: 测试代码
