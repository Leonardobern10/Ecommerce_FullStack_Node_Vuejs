import axios from 'axios';
import { URL } from '@/constants/URL';

// Cria um pedido e o armazena no banco
export const createOrder = async (orderData) => {
    // Faz um POST para a rota de pedidos passando os dados do pedido e a rota
    return await axios.post(URL.ORDER, orderData, { withCredentials: true });
};

// Obtem todos os pedidos registrados no banco
export const getOrders = async () => {
    return await axios.get(URL.ORDER, { withCredentials: true });
};
