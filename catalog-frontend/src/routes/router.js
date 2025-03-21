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
import EditInstructions from '@/views/EditInstructions.vue';

// Define para cada rota um componente correspondente
// que será renderizado no momento que a rota for acessada
const routes = [
    { path: PATH.HOME, component: Home },
    { path: PATH.LOGIN, component: Login },
    { path: PATH.REGISTER, component: Register },
    { path: PATH.PRODUCTS.ROOT, component: ProductList },
    { path: PATH.PRODUCTS.ADD, component: ProductForm },
    { path: PATH.PRODUCTS.UPDATE_INSTRUCTIONS, component: EditInstructions },
    { path: PATH.PRODUCTS.UPDATE, component: ProductForm, props: true },
    { path: PATH.PRODUCTS.GET_BY_ID, component: Product, props: true },
    { path: PATH.CART, component: Cart },
    { path: PATH.ORDERS, component: Orders },
    { path: PATH.ADMIN, component: AdminPanel },
];

export const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, from, next) => {
    let permitted = false;
    const role = await checkRole();

    if (role === 'admin') permitted = true;

    if (
        (to.path === '/admin' ||
            to.path === '/products/add' ||
            to.path === '/products/edit') &&
        !permitted
    ) {
        next('/');
    } else {
        next();
    }
});
