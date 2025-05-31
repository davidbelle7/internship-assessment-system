import axios from 'axios';

/**
 * 评估模块
 */
export default {
  namespaced: true,
  state: {
    assessments: [],
    currentAssessment: null
  },
  mutations: {
    SET_ASSESSMENTS(state, assessments) {
      state.assessments = assessments;
    },
    SET_CURRENT_ASSESSMENT(state, assessment) {
      state.currentAssessment = assessment;
    },
    ADD_ASSESSMENT(state, assessment) {
      state.assessments.push(assessment);
    },
    UPDATE_ASSESSMENT(state, updatedAssessment) {
      const index = state.assessments.findIndex(assessment => assessment.id === updatedAssessment.id);
      if (index !== -1) {
        state.assessments.splice(index, 1, updatedAssessment);
      }
    },
    DELETE_ASSESSMENT(state, assessmentId) {
      state.assessments = state.assessments.filter(assessment => assessment.id !== assessmentId);
    }
  },
  actions: {
    /**
     * 获取所有评估
     * @param {Object} context - Vuex上下文
     */
    async fetchAssessments({ commit, dispatch }) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        const response = await axios.get('/api/assessments');
        commit('SET_ASSESSMENTS', response.data);
        return response.data;
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '获取评估列表失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    },
    
    /**
     * 获取单个评估
     * @param {Object} context - Vuex上下文
     * @param {number} id - 评估ID
     */
    async fetchAssessment({ commit, dispatch }, id) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        const response = await axios.get(`/api/assessments/${id}`);
        commit('SET_CURRENT_ASSESSMENT', response.data);
        return response.data;
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '获取评估详情失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    },
    
    /**
     * 创建评估
     * @param {Object} context - Vuex上下文
     * @param {Object} assessmentData - 评估数据
     */
    async createAssessment({ commit, dispatch }, assessmentData) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        const response = await axios.post('/api/assessments', assessmentData);
        commit('ADD_ASSESSMENT', response.data);
        return response.data;
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '创建评估失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    },
    
    /**
     * 更新评估
     * @param {Object} context - Vuex上下文
     * @param {Object} assessmentData - 评估数据
     */
    async updateAssessment({ commit, dispatch }, assessmentData) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        const response = await axios.put(`/api/assessments/${assessmentData.id}`, assessmentData);
        commit('UPDATE_ASSESSMENT', response.data);
        return response.data;
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '更新评估失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    },
    
    /**
     * 删除评估
     * @param {Object} context - Vuex上下文
     * @param {number} id - 评估ID
     */
    async deleteAssessment({ commit, dispatch }, id) {
      try {
        dispatch('setLoading', true, { root: true });
        // 实际项目中应替换为真实API调用
        await axios.delete(`/api/assessments/${id}`);
        commit('DELETE_ASSESSMENT', id);
      } catch (error) {
        dispatch('setError', error.response?.data?.message || '删除评估失败', { root: true });
        throw error;
      } finally {
        dispatch('setLoading', false, { root: true });
      }
    }
  },
  getters: {
    allAssessments: state => state.assessments,
    assessmentById: state => id => state.assessments.find(assessment => assessment.id === id),
    currentAssessment: state => state.currentAssessment
  }
};
