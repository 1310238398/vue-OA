import { query, get, create, update, del } from '@/services/organization';
import { Toast } from 'vant';
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
    submitting: false
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
    async loadForm({ commit, dispatch }, { formAction, routeParams }) {
      let formTitle = formAction === 'A' ? '创建组织机构' : '编辑组织机构';
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
      const response = await get(payload);
      commit('saveFormData', response || {});
    },
    async submit({ commit, state, dispatch }, payload) {
      commit('changeSubmitting', true);
      const { formID, formAction } = state;
      let response;
      if (formAction === 'A') {
        response = await create(payload);
      } else {
        const formData = { ...payload, record_id: formID };
        response = await update(formData);
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
      const response = await del(payload);
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
    }
  }
};
