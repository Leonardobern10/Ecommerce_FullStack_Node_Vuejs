import './main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes/router.js';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import naive from 'naive-ui';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true,
});
app.use(naive);
app.mount('#app');
