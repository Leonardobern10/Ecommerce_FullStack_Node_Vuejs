//
const CART_KEY = 'shopping_cart';

/**
 * A função `getCart()` recupera os itens armazenados no localStorage
 * usando a chave `CART_KEY`. Como o localStorage só armazena strings,
 * o método `JSON.parse()` é utilizado para converter essa string JSON
 * de volta para um array de objetos JavaScript. Se não houver itens
 * no carrinho, a função retorna um array vazio ([]) como valor padrão.
 * @returns Um Array de objetos JS ou [].
 */
export const getCart = () => {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

/**
 *
 * A função `addToCart()` adiciona um produto ao carrinho. Primeiro,
 * recupera os itens do carrinho chamando `getCart()`. Em seguida,
 * verifica se o item já está no carrinho, comparando o **_id.**.
 *
 * Se o item já existe, sua quantidade **(quantity)** é incrementada.
 *
 * Se o item ainda não está no carrinho, ele é adicionado ao array
 * com uma quantidade inicial de 1.
 *
 * Por fim, o carrinho atualizado é salvo novamente no localStorage,
 * substituindo o estado anterior.
 */
export const addToCart = (product) => {
    // Variavel responsavel por armaz
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
