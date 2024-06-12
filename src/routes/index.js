import { createRouter, createWebHistory } from 'vue-router';
import chatRoutes from './chatRoutes';
import authenticationRoutes from './authentication';

const routes = [
  ...authenticationRoutes,
  ...chatRoutes,
  // Catch-all route for undefined paths
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    beforeEnter: (to, from, next) => {
      // Implement your redirection logic here
      if (localStorage.getItem('token')) {
        // Redirect authenticated users to the list of chatrooms page
        next({ name: '/' });
      } else {
        // Redirect unauthenticated users to the login page
        next({ name: 'Login' });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (isAuthenticated && !to.meta.requiresAuth) {
    next({ name: '' });
  } else if (!isAuthenticated && to.meta.requiresAuth) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;