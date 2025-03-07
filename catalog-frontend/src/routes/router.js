import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Home from '@/views/Home.vue';
import ProductList from '@/views/ProductList.vue';
import ProductForm from '@/views/ProductForm.vue';
import Cart from '@/components/Cart.vue';
import Orders from '@/views/Orders.vue';
import PATH from '@/constants/PATH';
import Product from '@/views/Product.vue';

// Define para cada rota um componente correspondente
// que será renderizado no momento que a rota for acessada
const routes = [
    { path: PATH.HOME, component: Home },
    { path: PATH.LOGIN, component: Login },
    { path: PATH.REGISTER, component: Register },
    { path: PATH.PRODUCTS.ROOT, component: ProductList },
    { path: PATH.PRODUCTS.ADD, component: ProductForm },
    { path: PATH.PRODUCTS.UPDATE, component: ProductForm, props: true },
    { path: PATH.PRODUCTS.GET_BY_ID, component: Product, props: true },
    { path: PATH.CART, component: Cart },
    { path: PATH.ORDERS, component: Orders },
];

export const router = createRouter({ history: createWebHistory(), routes });
