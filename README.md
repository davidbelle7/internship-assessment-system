# 实习生评估系统

一个用于管理和评估实习生表现的综合系统。

## 项目结构

- `frontend/`: Vue前端项目
- `backend/`: Spring Boot后端项目
- `database/`: 数据库SQL脚本

## 技术栈

### 前端
- Vue.js
- Vuex
- Vue Router
- Element UI

### 后端
- Spring Boot
- Spring Data JPA
- Spring Security
- MySQL

### 数据库
- MySQL

## 开发指南

### 前端开发
```bash
cd frontend
npm install
npm run serve
```

### 后端开发
```bash
cd backend
./mvnw spring-boot:run
```

## Git提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范：
- 格式：`<type>(<scope>): <description>`
- 常用类型：
  - `feat`：新功能
  - `fix`：修复问题
  - `docs`：文档更新
  - `style`：代码格式（不影响功能）
  - `refactor`：重构（非修复或新增功能）
  - `test`：添加或修改测试
  - `chore`：构建过程或辅助工具的变动
