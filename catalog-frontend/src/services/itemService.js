function changeItem(operation, index, array, item) {
    switch (operation) {
        case 'next':
            console.log(index.value < array.length - 1);
            index.value = index.value < array.length - 1 ? index.value + 1 : 0;
            break;
        case 'previous':
            index.value = index.value > 0 ? index.value - 1 : array.length - 1;
            break;
        default:
            console.log('Operation invalid');
            break;
    }
    item.value = array[index.value]; // Certifique-se de que "item" seja uma ref também
    return item;
}

export default changeItem;
