import { query } from '@/services/demo';

export default {
  namespaced: true,
  state: {
    loading: false,
    finished: false,
    data: []
  },
  actions: {
    async fetch({ commit, state }, payload) {
      if (state.finished) {
        commit('changeFinished', false);
      }

      commit('changeLoading', true);
      const response = await query(payload);
      const data = response.list || [];
      commit('saveData', [...state.data, ...data]);
      commit('changeLoading', false);

      if (
        data.length == 0 ||
        response.pagination.total <
          response.pagination.current * response.pagination.pageSize
      ) {
        commit('changeFinished', true);
      }
    }
  },
  mutations: {
    changeLoading(state, payload) {
      state.loading = payload;
    },
    changeFinished(state, payload) {
      state.finished = payload;
    },
    saveData(state, payload) {
      state.data = payload;
    }
  }
};
