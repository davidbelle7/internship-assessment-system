-- 实习生评估系统初始数据

-- 插入部门数据
INSERT INTO departments (name, description) VALUES
('技术部', '负责公司产品的研发和技术支持'),
('市场部', '负责公司产品的市场推广和销售'),
('人力资源部', '负责公司人员招聘、培训和管理'),
('财务部', '负责公司财务管理和会计工作'),
('产品部', '负责公司产品的规划和设计');

-- 插入角色数据
INSERT INTO roles (name, description) VALUES
('ROLE_ADMIN', '系统管理员'),
('ROLE_MENTOR', '导师'),
('ROLE_INTERN', '实习生'),
('ROLE_HR', '人力资源');

-- 插入默认管理员用户
-- 密码为: admin123 (使用BCrypt加密)
INSERT INTO users (username, password, email, full_name) VALUES
('admin', '$2a$10$yfIAA1eBYS3KYH.Vt.wOVOPQJMeJ7J7/XW.N1XOBzGSQKFcQIVMPe', 'admin@example.com', '系统管理员');

-- 为管理员分配角色
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1); -- admin用户分配ROLE_ADMIN角色

-- 插入HR用户
-- 密码为: hr123 (使用BCrypt加密)
INSERT INTO users (username, password, email, full_name) VALUES
('hr', '$2a$10$yfIAA1eBYS3KYH.Vt.wOVOPQJMeJ7J7/XW.N1XOBzGSQKFcQIVMPe', 'hr@example.com', '人力资源专员');

-- 为HR用户分配角色
INSERT INTO user_roles (user_id, role_id) VALUES
(2, 4); -- hr用户分配ROLE_HR角色

-- 插入导师用户
-- 密码为: mentor123 (使用BCrypt加密)
INSERT INTO users (username, password, email, full_name) VALUES
('mentor1', '$2a$10$yfIAA1eBYS3KYH.Vt.wOVOPQJMeJ7J7/XW.N1XOBzGSQKFcQIVMPe', 'mentor1@example.com', '张导师'),
('mentor2', '$2a$10$yfIAA1eBYS3KYH.Vt.wOVOPQJMeJ7J7/XW.N1XOBzGSQKFcQIVMPe', 'mentor2@example.com', '李导师'),
('mentor3', '$2a$10$yfIAA1eBYS3KYH.Vt.wOVOPQJMeJ7J7/XW.N1XOBzGSQKFcQIVMPe', 'mentor3@example.com', '王导师');

-- 为导师用户分配角色
INSERT INTO user_roles (user_id, role_id) VALUES
(3, 2), -- mentor1用户分配ROLE_MENTOR角色
(4, 2), -- mentor2用户分配ROLE_MENTOR角色
(5, 2); -- mentor3用户分配ROLE_MENTOR角色

-- 插入导师信息
INSERT INTO mentors (user_id, department_id, position) VALUES
(3, 1, '高级开发工程师'),
(4, 5, '产品经理'),
(5, 2, '市场总监');

-- 插入实习生用户
-- 密码为: intern123 (使用BCrypt加密)
INSERT INTO users (username, password, email, full_name) VALUES
('intern1', '$2a$10$yfIAA1eBYS3KYH.Vt.wOVOPQJMeJ7J7/XW.N1XOBzGSQKFcQIVMPe', 'intern1@example.com', '赵实习'),
('intern2', '$2a$10$yfIAA1eBYS3KYH.Vt.wOVOPQJMeJ7J7/XW.N1XOBzGSQKFcQIVMPe', 'intern2@example.com', '钱实习'),
('intern3', '$2a$10$yfIAA1eBYS3KYH.Vt.wOVOPQJMeJ7J7/XW.N1XOBzGSQKFcQIVMPe', 'intern3@example.com', '孙实习'),
('intern4', '$2a$10$yfIAA1eBYS3KYH.Vt.wOVOPQJMeJ7J7/XW.N1XOBzGSQKFcQIVMPe', 'intern4@example.com', '李实习');

-- 为实习生用户分配角色
INSERT INTO user_roles (user_id, role_id) VALUES
(6, 3), -- intern1用户分配ROLE_INTERN角色
(7, 3), -- intern2用户分配ROLE_INTERN角色
(8, 3), -- intern3用户分配ROLE_INTERN角色
(9, 3); -- intern4用户分配ROLE_INTERN角色

-- 插入实习生信息
INSERT INTO interns (user_id, department_id, start_date, end_date, status, school, major, education_level) VALUES
(6, 1, '2023-07-01', '2023-12-31', 'ACTIVE', '北京大学', '计算机科学', '本科'),
(7, 5, '2023-07-15', '2024-01-15', 'ACTIVE', '清华大学', '产品设计', '硕士'),
(8, 2, '2023-06-01', '2023-11-30', 'ACTIVE', '复旦大学', '市场营销', '本科'),
(9, 1, '2023-08-01', '2024-02-28', 'ACTIVE', '上海交通大学', '软件工程', '硕士');

-- 插入评估标准
INSERT INTO assessment_criteria (name, description, category, weight) VALUES
('专业技能', '评估实习生的专业知识和技能水平', '技能', 1.0),
('学习能力', '评估实习生的学习新知识和技能的能力', '能力', 1.0),
('沟通能力', '评估实习生与团队成员和客户的沟通能力', '能力', 1.0),
('团队协作', '评估实习生在团队中的协作能力', '能力', 1.0),
('工作态度', '评估实习生的工作态度和责任心', '态度', 1.0),
('创新能力', '评估实习生的创新思维和解决问题的能力', '能力', 1.0),
('执行力', '评估实习生执行任务的效率和质量', '能力', 1.0),
('时间管理', '评估实习生的时间管理和任务优先级安排能力', '能力', 1.0);

-- 插入示例评估记录
INSERT INTO assessments (intern_id, mentor_id, assessment_date, period_start, period_end, overall_score, comments, status) VALUES
(1, 1, '2023-08-01', '2023-07-01', '2023-07-31', 4.2, '赵实习在第一个月的表现良好，特别是在学习新技术方面展现出很强的能力。', 'APPROVED'),
(2, 2, '2023-08-15', '2023-07-15', '2023-08-14', 4.5, '钱实习在产品设计方面表现出色，能够快速理解用户需求并提出创新解决方案。', 'APPROVED'),
(3, 3, '2023-07-01', '2023-06-01', '2023-06-30', 3.8, '孙实习在市场分析方面有很好的表现，但需要提高团队协作能力。', 'APPROVED');

-- 插入示例评估详情
INSERT INTO assessment_details (assessment_id, criteria_id, score, comments) VALUES
-- 赵实习的评估详情
(1, 1, 4.0, '具备良好的编程基础，能够独立完成分配的任务'),
(1, 2, 4.5, '学习新技术的能力很强，能够快速掌握新框架'),
(1, 3, 4.0, '沟通清晰，能够准确表达自己的想法'),
(1, 4, 4.0, '能够与团队成员良好协作'),
(1, 5, 4.5, '工作态度积极，责任心强'),
(1, 6, 4.2, '能够提出一些创新的解决方案'),
(1, 7, 4.0, '任务执行效率高，质量好'),
(1, 8, 4.2, '时间管理能力良好，能够按时完成任务'),

-- 钱实习的评估详情
(2, 1, 4.5, '产品设计专业知识扎实'),
(2, 2, 4.5, '学习能力强，能够快速掌握新工具'),
(2, 3, 4.8, '沟通能力出色，能够清晰表达设计理念'),
(2, 4, 4.2, '团队协作良好'),
(2, 5, 4.5, '工作态度认真负责'),
(2, 6, 4.8, '创新能力突出，能够提出独特的设计方案'),
(2, 7, 4.3, '执行力强，能够高质量完成设计任务'),
(2, 8, 4.4, '时间管理能力好，能够合理安排任务优先级'),

-- 孙实习的评估详情
(3, 1, 4.0, '市场营销专业知识良好'),
(3, 2, 4.0, '学习能力不错'),
(3, 3, 4.2, '沟通能力良好'),
(3, 4, 3.0, '团队协作需要提高'),
(3, 5, 4.0, '工作态度认真'),
(3, 6, 3.5, '创新能力一般'),
(3, 7, 4.0, '执行力不错'),
(3, 8, 3.8, '时间管理能力需要提高');
