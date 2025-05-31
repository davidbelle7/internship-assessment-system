import axios from 'axios';

/**
 * 实习生模块
 */
export default {
  namespaced: true,
  state: {
    interns: [],
    currentIntern: null
  },
  mutations: {
    SET_INTERNS(state, interns) {
      state.interns = interns;
    },
    SET_CURRENT_INTERN(state, intern) {
      state.currentIntern = intern;
    },
    ADD_INTERN(state, intern) {
      state.interns.push(intern);
    },
    UPDATE_INTERN(state, updatedIntern) {
      const index = state.interns.findIndex(intern => intern.id === updatedIntern.id);
      if (index !== -1) {
        state.interns.splice(index, 1, updatedIntern);
      }
    },
    DELETE_INTERN(state, internId) {
      state.interns = state.interns.filter(intern => intern.id !== internId);
    }
  },
  actions: {
    /**
     * 获取所有实习生
     * @param {Object} context - Vuex上下文
     */
    async fetchInterns({ commit, dispatch }) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        const response = await axios.get('/api/interns');
        commit('SET_INTERNS', response.data);
        return response.data;
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '获取实习生列表失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    },
    
    /**
     * 获取单个实习生
     * @param {Object} context - Vuex上下文
     * @param {number} id - 实习生ID
     */
    async fetchIntern({ commit, dispatch }, id) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        const response = await axios.get(`/api/interns/${id}`);
        commit('SET_CURRENT_INTERN', response.data);
        return response.data;
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '获取实习生详情失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    },
    
    /**
     * 创建实习生
     * @param {Object} context - Vuex上下文
     * @param {Object} internData - 实习生数据
     */
    async createIntern({ commit, dispatch }, internData) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        const response = await axios.post('/api/interns', internData);
        commit('ADD_INTERN', response.data);
        return response.data;
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '创建实习生失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    },
    
    /**
     * 更新实习生
     * @param {Object} context - Vuex上下文
     * @param {Object} internData - 实习生数据
     */
    async updateIntern({ commit, dispatch }, internData) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        const response = await axios.put(`/api/interns/${internData.id}`, internData);
        commit('UPDATE_INTERN', response.data);
        return response.data;
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '更新实习生失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    },
    
    /**
     * 删除实习生
     * @param {Object} context - Vuex上下文
     * @param {number} id - 实习生ID
     */
    async deleteIntern({ commit, dispatch }, id) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        await axios.delete(`/api/interns/${id}`);
        commit('DELETE_INTERN', id);
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '删除实习生失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    }
  },
  getters: {
    allInterns: state => state.interns,
    internById: state => id => state.interns.find(intern => intern.id === id),
    currentIntern: state => state.currentIntern
  }
};
