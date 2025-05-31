import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import intern from './modules/intern';
import assessment from './modules/assessment';

Vue.use(Vuex);

/**
 * Vuex 存储
 */
export default new Vuex.Store({
  modules: {
    auth,
    intern,
    assessment
  },
  state: {
    loading: false,
    error: null
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    }
  },
  actions: {
    setLoading({ commit }, loading) {
      commit('SET_LOADING', loading);
    },
    setError({ commit }, error) {
      commit('SET_ERROR', error);
    },
    clearError({ commit }) {
      commit('CLEAR_ERROR');
    }
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error
  }
});
