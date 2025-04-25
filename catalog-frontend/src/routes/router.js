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
import AdminPanel from '@/views/AdminPanel.vue';
import { checkRole } from '@/services/roleService';
import AboutUs from '@/views/AboutUs.vue';
import RemoveProduct from '@/views/RemoveProduct.vue';
import Delivery from '@/views/Delivery.vue';
import Carrer from '@/views/Carrer.vue';
import History from '@/views/History.vue';
import EditProductView from '@/views/EditProductView.vue';

import ResetPassword from '@/components/ResetPassword.vue';
import HelpPassword from '@/components/HelpPassword.vue';
import Users from '@/views/Users.vue';
import NotFound from '@/views/NotFound.vue';

// Define para cada rota um componente correspondente
// que será renderizado no momento que a rota for acessada
const routes = [
    { path: PATH.HOME, component: Home },
    { path: PATH.LOGIN, component: Login },
    { path: PATH.REGISTER, component: Register },
    { path: PATH.PRODUCTS.ROOT, component: ProductList },
    { path: PATH.PRODUCTS.ADD, component: ProductForm },
    { path: PATH.PRODUCTS.UPDATE_INSTRUCTIONS, component: EditProductView },
    { path: PATH.PRODUCTS.UPDATE, component: ProductForm, props: true },
    { path: PATH.PRODUCTS.REMOVE, component: RemoveProduct },
    { path: PATH.PRODUCTS.GET_BY_ID, component: Product, props: true },
    { path: PATH.CART, component: Cart },
    { path: PATH.ORDERS, component: Orders },
    { path: PATH.ADMIN.ROOT, component: AdminPanel },
    { path: PATH.ABOUT_US, component: AboutUs },
    { path: PATH.DELIVERY, component: Delivery },
    { path: PATH.CARRER, component: Carrer },
    { path: PATH.OUR_HISTORY, component: History },
    { path: PATH.PASSWORD.HELP, component: HelpPassword },
    { path: PATH.PASSWORD.RESET, component: ResetPassword, props: true },
    { path: PATH.ADMIN.CUSTOMERS, component: Users },
    { path: PATH.JOKER, name: 'NotFound', component: NotFound },
];

export const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, from, next) => {
    let permitted = false;
    const role = await checkRole();

    if (role === 'admin') permitted = true;

    if (PATH.RESTRICTED.includes(to.path) && !permitted) {
        next('/');
    } else {
        next();
    }
});
