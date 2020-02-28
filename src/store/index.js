import Vue from 'vue';
import Vuex from 'vuex';

import demo from './modules/demo';
import home from './modules/home';
import organization from './modules/organization';
import department from './modules/department';
import staffs from './modules/staffs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    demo,
    home,
    organization,
    department,
    staffs
  }
});
