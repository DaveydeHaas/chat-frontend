// src/routes/index.js
import { createRouter, createWebHistory } from 'vue-router';
import chatRoutes from './chatRoutes';
import authentication from './authentication';


const routes = [
    ...authentication,
    ...chatRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (!localStorage.getItem('token')) {
      // Redirect to login if not authenticated
      next({ path: '/login' });
    } else {
      // Continue to the route
      next();
    }
  } else {
    // Continue to the route
    next();
  }
});

export default router;