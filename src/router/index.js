import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/demo',
      name: 'demo',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue')
    },
    {
      path: '/organization',
      name: 'organization',
      meta: { keepAlive: true },
      component: () =>
        import(/* webpackChunkName: "organization" */ '../views/organization/list.vue')
    },
    {
      path: '/organization/add',
      props: { action: 'A' },
      component: () =>
        import(/* webpackChunkName: "organization" */ '../views/organization/form.vue')
    },
    {
      path: '/organization/edit/:id',
      props: { action: 'E' },
      component: () =>
        import(/* webpackChunkName: "organization" */ '../views/organization/form.vue')
    },
    {
      path: '/department',
      name: 'department',
      meta: { keepAlive: true },
      component: () =>
        import(
          /* webpackChunkName: "department" */ '../views/department/departmentList.vue'
        )
    },
    {
      path: '/department/add',
      props: { action: 'A' },
      component: () =>
        import(
          /* webpackChunkName: "department" */ '../views/department/departmentForm.vue'
        )
    },
    {
      path: '/department/edit/:id',
      props: { action: 'E' },
      component: () =>
        import(
          /* webpackChunkName: "department" */ '../views/department/departmentForm.vue'
        )
    },
    {
      path: '/staff',
      name: 'staff',
      meta: { keepAlive: true },
      component: () =>
        import(/* webpackChunkName: "staffs" */ '../views/staffs/staffsList.vue')
    },
    {
      path: '/staff/add',
      props: { action: 'A' },
      component: () =>
        import(/* webpackChunkName: "staffs" */ '../views/staffs/staffsForm.vue')
    },
    {
      path: '/staff/edit/:id',
      props: { action: 'E' },
      component: () =>
        import(/* webpackChunkName: "staffs" */ '../views/staffs/staffsForm.vue')
    }
  ]
});
