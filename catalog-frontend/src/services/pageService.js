import { loadProducts } from './productService';

const nextPage = (current, total) => {
    if (current.value < total.value) current.value += 1;
};

const previousPage = (current) => {
    if (current.value > 1) current.value -= 1;
};

export const goToPage = (local, auth, state, array, current, total, limit) => {
    try {
        if (local === 'next') nextPage(current, total);
        if (local === 'previous') previousPage(current);

        loadProducts(auth, state, array, current, total, limit);
    } catch (error) {
        console.error(error);
    }
};
