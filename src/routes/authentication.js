import { defineAsyncComponent } from 'vue';

const Login = defineAsyncComponent(() => import('../components/auth/LoginUser.vue'));
const Register = defineAsyncComponent(() => import('../components/auth/RegisterUser.vue'));
const ForgotPassword = defineAsyncComponent(() => import('../components/auth/ForgotPassword.vue'));

const loginRoute = [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false },
    }, 
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: false },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: { requiresAuth: false },
    },
  ];
  
  export default loginRoute;