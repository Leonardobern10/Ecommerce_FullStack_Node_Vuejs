import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Home from '@/views/Home.vue';
import ProductList from '@/views/ProductList.vue';
import ProductForm from '@/views/ProductForm.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/api/auth/login', component: Login },
    { path: '/api/auth/register', component: Register },
    { path: '/api/products', component: ProductList },
    { path: '/api/products/add', component: ProductForm },
    { path: '/api/products/edit/:id', component: ProductForm, props: true },
];

export const router = createRouter({ history: createWebHistory(), routes });
