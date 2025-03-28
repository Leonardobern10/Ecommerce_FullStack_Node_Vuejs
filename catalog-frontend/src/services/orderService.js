import axios from 'axios';
import { URL } from '@/constants/URL';
import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { changeProduct } from './productService';
import {
    notifyError,
    notifySuccess,
    notifyWarning,
} from '@/notifications/notify';

// Cria um pedido e o armazena no banco
export const createOrder = async (orderData) => {
    // Faz um POST para a rota de pedidos passando os dados do pedido e a rota
    return await axios.post(URL.ORDER, orderData, { withCredentials: true });
};

// Obtem todos os pedidos registrados no banco
export const getOrders = async () => {
    return await axios.get(URL.ORDER, { withCredentials: true });
};

export const fetchOrders = async (state, router, array) => {
    try {
        if (!state.value) {
            return await router.push(PATH.LOGIN);
        }
        const response = await getOrders();
        array.value = response.data;
    } catch (error) {}
};

export const loadOrders = async (state, router, auth, array) => {
    await auth.checkAuthStatus();
    state.value = auth.authenticated;
    await fetchOrders(state, router, array);
};

export const checkoutOrder = async (
    auth,
    state,
    router,
    array,
    cb_CREATE,
    cb_CLEAR,
    totalAmount,
    toast,
) => {
    await auth.checkAuthStatus();
    state.value = auth.authenticated;

    if (!state.value) {
        notifyWarning(toast, MESSAGE.ALERT.ORDER.NEED_AUTHENTICATE);
        router.push(PATH.LOGIN);
        return;
    }

    try {
        const orderData = {
            items: array.value.map((item) => ({
                product: item._id,
                quantity: item.quantity,
                imageUrl: item.imageUrl,
                price: item.price,
            })),
            totalAmount: totalAmount.value,
        };

        await cb_CREATE(orderData);

        await Promise.all(
            array.value.map((item) =>
                changeProduct(item._id, { stock: item.stock - item.quantity }),
            ),
        );
        notifySuccess(toast, MESSAGE.SUCCESS.ORDER);
        cb_CLEAR();
        router.push(PATH.HOME);
    } catch (error) {
        notifyError(toast, MESSAGE.ERROR.ORDER.DEFAULT);
    }
};
