import axios from 'axios';
import { URL } from '@/constants/URL';

export const getProducts = async () => {
    const response = await axios.get(URL.PRODUCTS);
    return response.data;
};

export const getProduct = async (id) => {
    const response = await axios.get(`${URL.PRODUCTS}/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(URL.PRODUCTS, product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await axios.put(`${URL.PRODUCTS}/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    await axios.delete(`${URL.PRODUCTS}/${id}`);
};

export const pixValue = (price) => Number(price - price * 0.05).toFixed(2);

export const financedValue = (price) => Number(price / 10).toFixed(2);

export const viewFinancedValue = (price) =>
    `R$ ${Number(price).toFixed(2)} em até 10x de R$ ${financedValue(price)}`;
