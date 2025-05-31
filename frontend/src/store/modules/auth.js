import axios from 'axios';
import router from '../../router';

/**
 * 认证模块
 */
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
    SET_AUTH(state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    CLEAR_AUTH(state) {
      state.token = '';
      state.user = null;
    }
  },
  actions: {
    /**
     * 用户登录
     * @param {Object} context - Vuex上下文
     * @param {Object} credentials - 登录凭证
     */
    async login({ commit, dispatch }, credentials) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        const response = await axios.post('/api/auth/login', credentials);
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        commit('SET_AUTH', { token, user });
        
        router.push('/dashboard');
        return response;
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '登录失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    },
    
    /**
     * 用户登出
     * @param {Object} context - Vuex上下文
     */
    logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      commit('CLEAR_AUTH');
      router.push('/login');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user
  }
};
