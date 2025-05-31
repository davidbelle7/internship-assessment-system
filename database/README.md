# 数据库设计

## 概述

本目录包含实习生评估系统的数据库设计和SQL脚本。系统使用MySQL数据库，通过Spring Boot的JPA进行数据访问。

## 文件说明

- `schema.sql`: 数据库表结构定义
- `data.sql`: 初始数据插入脚本

## 数据库模型

系统包含以下主要表：

1. `users`: 用户信息
2. `roles`: 角色定义
3. `user_roles`: 用户角色关联
4. `departments`: 部门信息
5. `interns`: 实习生信息
6. `mentors`: 导师信息
7. `assessment_criteria`: 评估标准
8. `assessments`: 评估记录
9. `assessment_details`: 评估详情

## 数据库关系图

```
+---------------+       +---------------+       +---------------+
|     users     |       |     roles     |       | departments   |
+---------------+       +---------------+       +---------------+
| id            |       | id            |       | id            |
| username      |       | name          |       | name          |
| password      |       | description   |       | description   |
| email         |       +---------------+       +---------------+
| full_name     |              ^                       ^
| enabled       |              |                       |
+---------------+              |                       |
        ^                      |                       |
        |                      |                       |
        |                +---------------+       +---------------+
        +----------------|  user_roles   |       |    interns    |
                         +---------------+       +---------------+
                         | user_id       |       | id            |
                         | role_id       |       | user_id       |
                         +---------------+       | department_id |
                                                | start_date    |
                                                | end_date      |
                                                | status        |
                                                +---------------+
                                                        ^
                                                        |
                                                        |
+---------------+       +---------------+       +---------------+
|    mentors    |       | assessments   |       | assessment    |
+---------------+       +---------------+       | criteria      |
| id            |       | id            |       +---------------+
| user_id       |------>| intern_id     |       | id            |
| department_id |       | mentor_id     |<----->| name          |
+---------------+       | date          |       | description   |
        ^               | overall_score |       | category      |
        |               | comments      |       | weight        |
        |               +---------------+       +---------------+
        |                       ^                       ^
        |                       |                       |
        |                       |                       |
        |               +---------------+               |
        +---------------|assessment_det|---------------+
                        +---------------+
                        | assessment_id |
                        | criteria_id   |
                        | score         |
                        | comments      |
                        +---------------+
```

## 安装和配置

1. 确保已安装MySQL 8.0或更高版本
2. 创建名为`internship_assessment`的数据库
3. 执行`schema.sql`创建表结构
4. 执行`data.sql`插入初始数据
5. 在Spring Boot应用的`application.properties`中配置数据库连接

## 数据库维护

- 定期备份数据库
- 使用Spring Boot的JPA自动更新表结构
- 重要数据变更应通过版本控制的SQL脚本进行
