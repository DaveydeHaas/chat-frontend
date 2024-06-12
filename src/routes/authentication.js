import { defineAsyncComponent } from 'vue';

const Login = defineAsyncComponent(() => import('../components/auth/LoginUser.vue'));
const Register = defineAsyncComponent(() => import('../components/auth/RegisterUser.vue'));

const loginRoute = [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }, // Does not require authentication
    },

      
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: false }, // Does not require authentication
    },
  ];
  
  export default loginRoute;