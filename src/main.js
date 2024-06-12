import { createApp } from 'vue';
import App from './App.vue';
import { VueSpinnersPlugin } from 'vue3-spinners';
import router from './routes';
import { createBootstrap } from 'bootstrap-vue-next';
import { createPinia } from 'pinia';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

const pinia = createPinia();

const vueApp = createApp(App).use(router);

// Make Vue spinners available throughout your project
vueApp.use(VueSpinnersPlugin);

// Make pinia available throughout your project
vueApp.use(pinia);

// Make BootstrapVue available throughout your project
vueApp.use(createBootstrap);

vueApp.mount('#app');