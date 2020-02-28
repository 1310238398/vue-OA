import { Toast } from 'vant';
import { query, deldep, createdep, getdep, updatedep, queryQrg } from '@/services/staffs';
import router from '../../router';

const pagination = {
  current: 0,
  pageSize: 6
};

export default {
  namespaced: true,
  state: {
    loading: false,
    finished: false,
    data: [],
    formData: {},
    formTitle: '',
    formAction: '',
    formID: '',
    submitting: false,
    dataOrg: []
  },
  actions: {
    async fetch({ commit, state }, { search, load }) {
      if (state.finished) {
        commit('changeFinished', false);
      }
      commit('changeLoading', true);

      let current = 1;
      if (load) {
        current = pagination.current + 1;
      }
      pagination.current = current;

      let q = {
        pageSize: pagination.pageSize,
        current
      };
      if (search) {
        q = { ...q, ...search };
      }
      const response = await query(q);
      const data = response.list || [];
      commit('saveData', current > 1 ? [...state.data, ...data] : [...data]);
      commit('changeLoading', false);

      if (
        data.length == 0 ||
        response.pagination.total <=
          response.pagination.current * response.pagination.pageSize
      ) {
        commit('changeFinished', true);
      }
    },
    async fetchOrg({ commit }, { payload }) {
      const response = await queryQrg(payload);
      const data = response.list || [];
      commit('saveOrg', data);
    },
    async loadForm({ commit, dispatch }, { formAction, routeParams }) {
      let formTitle = formAction === 'A' ? '新建职工' : '编辑职工';
      commit('saveFormAction', formAction);
      commit('saveFormTitle', formTitle);
      commit('saveFormData', {});

      const { id } = routeParams;
      if (id) {
        commit('saveFormID', id);
      }

      if (formAction !== 'A') {
        await dispatch('fetchForm', { record_id: id });
      }
    },
    async fetchForm({ commit }, payload) {
      const response = await getdep(payload);
      commit('saveFormData', response || {});
    },
    async submit({ commit, state, dispatch }, payload) {
      commit('changeSubmitting', true);
      const { formID, formAction } = state;
      let response;
      if (formAction === 'A') {
        response = await createdep(payload);
      } else {
        const formData = { ...payload, record_id: formID };
        response = await updatedep(formData);
      }

      commit('changeSubmitting', false);
      if (response.record_id) {
        Toast.success({
          message: '保存成功',
          duration: 1000,
          async onClose() {
            router.back();
            await dispatch('fetch', {});
          }
        });
      }
    },
    async del({ dispatch }, payload) {
      const response = await deldep(payload);
      if (response.status === 'OK') {
        Toast.success('删除成功');
        await dispatch('fetch', {});
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
    },
    saveFormID(state, payload) {
      state.formID = payload;
    },
    saveFormTitle(state, payload) {
      state.formTitle = payload;
    },
    saveFormAction(state, payload) {
      state.formAction = payload;
    },
    saveFormData(state, payload) {
      state.formData = payload;
    },
    changeSubmitting(state, payload) {
      state.submitting = payload;
    },
    saveOrg(state, payload) {
      state.dataOrg = payload;
    }
  }
};
