export default {
  namespaced: true,
  state: {
    funcList: [
      { icon: 'idcard', text: '项目管理', id: 1, to: '' },
      { icon: 'label-o', text: '任务管理', id: 2, to: '' },
      { icon: 'cluster-o', text: '组织管理', id: 3, to: 'organization' },
      { icon: 'cluster-o', text: '部门管理', id: 4, to: 'department' },
      { icon: 'friends-o', text: '成员管理', id: 5, to: 'staff' },
      { icon: 'photo-o', text: 'Demo', id: 6, to: 'demo' }
    ]
  },
  actions: {},
  mutations: {}
};
