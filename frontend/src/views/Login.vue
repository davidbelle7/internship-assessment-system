<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="logo">
        <h1>实习生评估系统</h1>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" @submit.native.prevent="handleLogin">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" class="login-button" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

/**
 * 登录页面组件
 */
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      error: 'error'
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      setError: 'setError',
      clearError: 'clearError'
    }),
    
    /**
     * 处理登录表单提交
     */
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            this.clearError();
            await this.login(this.loginForm);
          } catch (error) {
            console.error('登录失败:', error);
          }
        } else {
          this.setError('请填写所有必填字段');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
  padding: 20px 0;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.login-button {
  width: 100%;
}
</style>
