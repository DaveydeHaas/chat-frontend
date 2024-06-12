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
        // Redirect authenticated users to the home page
        next({ name: '' });
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
  // Your existing navigation guard logic
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;