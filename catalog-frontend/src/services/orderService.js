import axios from 'axios';
import { URL } from '@/constants/URL';
import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';

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
    } catch (error) {
        console.error(MESSAGE.ERROR.ORDER.GET_PRODUCTS);
    }
};

export const checkoutOrder = async (
    auth,
    state,
    cb_ALERT,
    router,
    array,
    cb_CREATE,
    cb_CLEAR,
    totalAmount,
) => {
    await auth.checkAuthStatus();
    state.value = auth.authenticated;

    if (!state.value) {
        cb_ALERT(MESSAGE.ALERT.ORDER.NEED_AUTHENTICATE);
        router.push(PATH.LOGIN);
        return;
    }

    try {
        const orderData = {
            items: array.value.map((item) => ({
                product: item._id,
                quantity: item.quantity,
            })),
            totalAmount: totalAmount.value,
        };

        await cb_CREATE(orderData);
        cb_ALERT(MESSAGE.SUCESS.ORDER);
        cb_CLEAR();
        router.push(PATH.HOME);
    } catch (error) {
        cb_ALERT(MESSAGE.ERROR.ORDER.DEFAULT);
        console.error(error);
    }
};
