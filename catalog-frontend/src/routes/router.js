import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Home from '@/views/Home.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/api/auth/login', component: Login },
    { path: '/api/auth/register', component: Register },
];

export const router = createRouter({ history: createWebHistory(), routes });
