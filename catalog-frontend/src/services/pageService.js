import { SortType } from '@/model/Sort';
import {
    getProductsByPriceToHigh,
    getProductsByPriceToLow,
    loadProducts,
} from './productService';
import { PageCommand } from '@/model/Page';

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
        if (local === PageCommand.NEXT) {
            nextPage(current, total);
        } else if (local === PageCommand.PREVIOUS) {
            previousPage(current);
        }

        switch (order.value) {
            case SortType.FALSE:
                array.value = loadProducts(
                    auth,
                    state,
                    array,
                    current,
                    total,
                    limit,
                );
                break;
            case SortType.TO_HIGH:
                array.value = await getProductsByPriceToHigh(current.value);
                break;
            case SortType.TO_LOW:
                array.value = array.value = await getProductsByPriceToLow(
                    current.value,
                );
                break;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
    }
};
