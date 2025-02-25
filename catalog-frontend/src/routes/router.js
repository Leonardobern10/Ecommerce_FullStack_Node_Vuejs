import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Home from '@/views/Home.vue';
import ProductList from '@/views/ProductList.vue';
import ProductForm from '@/views/ProductForm.vue';
import Cart from '@/components/Cart.vue';
import Orders from '@/views/Orders.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/products', component: ProductList },
    { path: '/products/add', component: ProductForm },
    { path: '/products/edit/:id', component: ProductForm, props: true },
    { path: '/cart', component: Cart },
    { path: '/orders', component: Orders },
];

export const router = createRouter({ history: createWebHistory(), routes });
