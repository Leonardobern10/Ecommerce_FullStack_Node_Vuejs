import KEY from '@/constants/KEY';
import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';

// Obtém os itens do carrinho
export const getCart = () => {
    return JSON.parse(localStorage.getItem(KEY.CART)) || [];
};

// Adiciona um item no carrinho
export const addToCart = (product) => {
    const cart = getCart();
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(KEY.CART, JSON.stringify(cart));
};

export const addOnCart = (product, router, state, cb) => {
    if (!state) {
        cb(MESSAGE.ALERT.CART.NEED_AUTHENTICATE);
        return router.push(PATH.LOGIN);
    }

    addToCart(product);
    cb(MESSAGE.SUCESS.CART.ADD);
};

// Remove um item do carrinho
export const removeFromCart = (productId) => {
    let cart = getCart();
    cart = cart.filter((item) => item._id !== productId);
    localStorage.setItem(KEY.CART, JSON.stringify(cart));
};

// Atualiza a quantidade dos itens do carrinho
export const updateQuantity = (productId, quantity) => {
    const cart = getCart();
    const item = cart.find((item) => item._id === productId);

    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem(KEY.CART, JSON.stringify(cart));
        }
    }
};

export const updateCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateItemQuantityOnCart = (productId, newQuantity, array) => {
    const item = array.value.find((item) => item._id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart(array.value);
    }
};

// Remove os itens do carrinho
export const clearCart = () => {
    localStorage.removeItem(KEY.CART);
};

export const loadCart = async (array) => {
    array.value = await getCart();
};

export const getTotalValueOnCart = (array) =>
    array.value.reduce((total, item) => total + item.price * item.quantity, 0);
