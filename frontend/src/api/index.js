import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 请求拦截器
 * 在请求发送前添加认证信息
 */
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 处理响应错误，如401未授权等
 */
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // 清除本地存储的认证信息
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // 重定向到登录页
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
