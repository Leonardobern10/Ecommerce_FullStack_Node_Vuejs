const CART_KEY = 'shopping_cart';

export const getCart = () => {
    console.log(localStorage.getItem(CART_KEY));
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const addToCart = (product) => {
    const cart = getCart();
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
    let cart = getCart();
    cart = cart.filter((item) => item._id !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const updateQuantity = (productId, quantity) => {
    const cart = getCart();
    const item = cart.find((item) => item._id === productId);

    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        }
    }
};

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
};
