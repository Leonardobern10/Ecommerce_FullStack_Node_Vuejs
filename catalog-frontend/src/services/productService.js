import axios from 'axios';
import { URL } from '@/constants/URL';
import { mergeSort } from './sort';
import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { notifyError, notifySuccess } from '@/notifications/notify';

export const getProducts = async (page, limit) => {
    try {
        const response = await axios.get(`${URL.PRODUCTS}`, {
            params: { page, limit },
        });
        // console.log(response.data.data);
        return response.data;
    } catch (error) {
        // console.error('Erro ao buscar produtos:', error);
        return { data: [], currentPage: 1, totalPages: 1 }; // Retorna um fallback seguro
    }
};

export const getProduct = async (id) => {
    const response = await axios.get(`${URL.PRODUCTS}/${id}`);
    // console.log('URL: ', `${URL.PRODUCTS}/${id}`);
    // console.log('RESPOSTA: ', response.data);
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

export const changeProduct = async (id, changes) => {
    // console.log('Iniciou changeProduct');
    try {
        const response = await axios.patch(
            `${URL.PRODUCTS_CHANGE}/${id}`,
            changes,
            { withCredentials: true },
        );
        return response.data;
    } catch (erro) {
        // console.log(erro);
    }
};

export const deleteProduct = async (id, toast) => {
    try {
        await axios.delete(`${URL.PRODUCTS}/${id}`);
        notifySuccess(toast, MESSAGE.SUCCESS.PRODUCTS.REMOVE);
    } catch (error) {
        notifyError(toast, MESSAGE.ERROR.PRODUCTS.REMOVE);
    }
};

export const calculatePixDiscount = (price) =>
    Number(price - price * 0.05).toFixed(2);

export const financedValue = (price) => Number(price / 10).toFixed(2);

export const viewFinancedValue = (price) =>
    `R$ ${Number(price).toFixed(2)} em até 10x de R$ ${financedValue(price)}`;

export const accessProductById = async (id, store, router) => {
    store.save(id);
    await router.push(`/products/${id}`);
};

export const sortProductsByProp = (array, prop) =>
    mergeSort([...array.value], prop);

export const filterProducts = (search, array, target) => {
    if (!search.value.trim()) return array.value;
    return array.value.filter((el) => el[target] === search.value);
};

export const saveProduct = async (edit, route, product, router, toast) => {
    try {
        if (edit.value) {
            await updateProduct(route.params.id, product.value);
            notifySuccess(toast, MESSAGE.SUCCESS.PRODUCTS.UPDATE);
        } else {
            await createProduct(product.value);
            notifySuccess(toast, MESSAGE.SUCCESS.PRODUCTS.ADD);
        }
        router.push(PATH.PRODUCTS.ROOT);
    } catch (error) {
        // console.error(error);
        notifyError(toast, MESSAGE.ERROR.PRODUCTS.ADD);
    }
};

export const loadProducts = async (
    auth,
    state,
    array,
    pageRef,
    totalRef,
    limit,
) => {
    await auth.checkAuthStatus();
    state.value = auth.isAuthenticated.value;

    const result = await getProducts(pageRef.value, limit.value); // Usa pageRef.value corretamente
    array.value = result.data;

    // ✅ Garante que os valores sejam atualizados corretamente
    pageRef.value = result.currentPage;
    totalRef.value = result.totalPages;
};

export const saveUpdate = async (currentProduct, cb_ALERT) => {
    try {
        const updateProduct = await changeProduct(
            currentProduct.value._id,
            currentProduct.value,
        );
        currentProduct.value = updateProduct;
        cb_ALERT('Produto atualizado com sucesso!');
    } catch (error) {
        cb_ALERT('Erro ao atualizar o produto!');
    }
};

export const searchProduct = async (product, route, store) => {
    try {
        product.value = await getProduct(route.params.id);
        store.clean();
    } catch (error) {
        // console.error(error);
    }
};

export const getProductsByType = async (type) => {
    console.log(type);
    try {
        const response = await axios.get(URL.SEARCH, {
            params: { type: `${type}` },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

// Retornam os produtos com o nome correspondente
export const getProductsByName = async (name) => {
    try {
        const response = await axios.get(URL.SEARCH, {
            params: { name: `${name}` },
        });
        return response.data.data;
    } catch (error) {
        // console.log(error);
    }
};

// Retornam os produtos com a marca correspondente
export const getProductsByBrand = async (brand) => {
    const response = await axios.get(URL.SEARCH, {
        params: { brand: `${brand}` },
    });
    return response.data.data;
};

export const getProductsByPriceToLow = async (page = 1) => {
    const response = await axios.get(URL.SEARCH, {
        params: { sortBy: 'price', order: 'desc', page: `${page}` },
    });
    return response.data.data;
};

export const getProductsByPriceToHigh = async (page = 1) => {
    const response = await axios.get(URL.SEARCH, {
        params: { sortBy: 'price', page: `${page}` },
    });
    return response.data.data;
};

export const getNewestProducts = async () => {
    const response = await axios.get(
        'http://localhost:5000/api/products/search?sortBy=createdAt&order=desc&limit=4',
        { withCredentials: true },
    );
    console.log(response.data.data);
    return response.data.data;
};
