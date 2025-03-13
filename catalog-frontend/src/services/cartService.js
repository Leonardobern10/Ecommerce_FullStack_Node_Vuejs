import KEY from '@/constants/KEY';

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

// Remove os itens do carrinho
export const clearCart = () => {
    localStorage.removeItem(KEY.CART);
};
