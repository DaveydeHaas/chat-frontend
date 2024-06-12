import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import { BootstrapVueNext } from 'bootstrap-vue-next';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';


const vueApp = createApp(App).use(router);

// Make BootstrapVue available throughout your project
vueApp.use(BootstrapVueNext);

vueApp.mount('#app');