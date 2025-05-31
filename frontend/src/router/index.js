import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

/**
 * 路由配置
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

/**
 * 路由守卫，处理身份验证
 */
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
