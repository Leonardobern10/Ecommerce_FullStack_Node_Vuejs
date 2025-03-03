import axios from 'axios';

// Rota que gerencia os pedidos
const API_URL = 'http://localhost:5000/api/orders';

/**
 *
 * @param {*} orderData - Dados de um pedido que são: Todos os itens que compõem o
 * carrinho na hora do pedio e o valor total do pedido.
 * @param {*} token - Token gerado pela sessão que indica que o usuário esta logado
 * e que o Token é valido para aquela sessão.
 * @returns - O objeto ORDER criado.
 */
export const createOrder = async (orderData) => {
    // Faz um POST para a rota de pedidos passando os dados do pedido e a rota
    return await axios.post(API_URL, orderData, { withCredentials: true });
};

export const getOrders = async () => {
    return await axios.get(API_URL, { withCredentials: true });
};
