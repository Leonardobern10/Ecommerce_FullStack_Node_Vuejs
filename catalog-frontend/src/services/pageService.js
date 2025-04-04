import { SortType } from '@/model/Sort';
import {
    getProductsByPriceToHigh,
    getProductsByPriceToLow,
    loadProducts,
} from './productService';

const nextPage = (current, total) => {
    if (current.value < total.value) current.value++;
};

const previousPage = (current) => {
    if (current.value > 1) current.value -= 1;
};

export const goToPage = async (
    local,
    auth,
    state,
    array,
    current,
    total,
    limit,
    order,
) => {
    // ! - Corrigir esses aninhamentos de if - elses
    try {
        if (local === 'next') {
            nextPage(current, total);
        } else if (local === 'previous') {
            previousPage(current);
        }

        if (order.value === SortType.FALSE) {
            loadProducts(auth, state, array, current, total, limit);
        } else if (order.value === SortType.TO_HIGH) {
            console.log(current.value);
            array.value = await getProductsByPriceToHigh(current.value);
        } else if (order.value === SortType.TO_LOW) {
            array.value = await getProductsByPriceToLow(current.value);
        }
    } catch (error) {
        console.error(error);
    }
};
