import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const createOrder = async (orderData, token) => {
    return await axios.post(API_URL, orderData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getOrders = async (token) => {
    return await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
