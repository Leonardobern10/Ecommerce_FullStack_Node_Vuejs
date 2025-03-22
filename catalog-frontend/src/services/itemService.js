const changeItem = (operation, index, array, item) => {
    switch (operation) {
        case 'next':
            index.value = index.value < array.length - 1 ? index.value + 1 : 0;
            break;
        case 'previous':
            index.value = index.value > 0 ? index.value - 1 : array.length - 1;
            break;
        default:
            break;
    }
    item.value = array[index.value]; // Certifique-se de que "item" seja uma ref também
    return item;
};

export const nextNewestItem = (index, array, item) => {
    item = changeItem('next', index, array, item);
};

export const previousNewestItem = (index, array, item) => {
    item = changeItem('previous', index, array, item);
};
