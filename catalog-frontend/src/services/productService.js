import axios from 'axios';
import { URL } from '@/constants/URL';
import { mergeSort } from './sort';
import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';

export const getProducts = async () => {
    const response = await axios.get(URL.PRODUCTS);
    return response.data;
};

export const getProduct = async (id) => {
    const response = await axios.get(`${URL.PRODUCTS}/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(URL.PRODUCTS, product, {
        withCredentials: true,
    });
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

export const accessProductById = async (id, store, router) => {
    store.save(id);
    await router.push(`/products/${id}`);
};

export const sortProductsByPrice = (array) => mergeSort([...array.value]);

export const filterProducts = (search, array, target) => {
    if (!search.value.trim()) return array.value;
    return array.value.filter((el) => el[target] === search.value);
};

export const saveProduct = async (edit, route, product, router, cb) => {
    try {
        if (edit.value) {
            await updateProduct(route.params.id, product.value);
            cb(MESSAGE.SUCESS.PRODUCTS.UPDATE);
        } else {
            await createProduct(product.value);
            cb(MESSAGE.SUCESS.PRODUCTS.ADD);
        }
        router.push(PATH.PRODUCTS.ROOT);
    } catch (error) {
        console.error(error);
        cb(MESSAGE.ERROR.PRODUCTS.ADD);
    }
};

export const loadProducts = async (auth, state, array) => {
    await auth.checkAuthStatus();
    state.value = auth.isAuthenticated.value;
    array.value = await getProducts();
};
