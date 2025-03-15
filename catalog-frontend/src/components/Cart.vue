<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCart, clearCart, removeFromCart } from '../services/cartService.js';
import { checkoutOrder, createOrder } from '@/services/orderService.js';
import { updateCart } from '../services/cartService.js';
import { useRouter } from 'vue-router';
import CartItemView from './CartItemView.vue';
import { useAuthStore } from '@/store/useAuthStore.js';
import PATH from '@/constants/PATH.js';
import MESSAGE from '@/constants/MESSAGE.js';
import { financedValue } from '@/services/productService.js';

const router = useRouter(); // Direcionador de endereços
const isLogged = ref(false); // Armazena o estado do usuario
const cart = ref([]); // Responsável por receber os produtos
const auth = useAuthStore();

// Carrega os itens do carrinho
const loadCart = () => {
    cart.value = getCart();
};

// Limpa o carrinho
const clear = () => {
    clearCart();
    cart.value = [];
};

// Calcula o valor total de compra para os itens no carrinho
const totalAmount = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0),
);

// 🔥 Função para atualizar a quantidade no carrinho
const updateItemQuantity = (productId, newQuantity) => {
    const item = cart.value.find((item) => item._id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart(cart.value); // Salva a alteração no localStorage ou API
    }
};

const removeItem = (productId) => {
    cart.value = cart.value.filter((item) => item._id !== productId);
    removeFromCart(productId);
};

// Finaliza a compra
const checkout = async () => {
    await checkoutOrder(
        auth,
        isLogged,
        alert,
        router,
        cart,
        createOrder,
        clear,
        totalAmount,
    );
};

// Verifica se o usuário está logado e carrega o carrinho
onMounted(loadCart);
</script>

<template>
    <div id="view">
        <ul id="items-cart" v-if="cart.length">
            <li class="item-cart" v-for="item in cart" :key="item._id">
                <CartItemView
                    :name="item.name"
                    :price="item.price"
                    :quantity="item.quantity"
                    :image-url="item.imageUrl"
                    @update-quantity="
                        (newQuantity) =>
                            updateItemQuantity(item._id, newQuantity)
                    "
                    @remove-item="removeItem(item._id)" />
            </li>
        </ul>
        <p v-else>Seu carrinho está vazio.</p>
        <div v-if="cart.length" id="resume-cart">
            <p>Resumo da compra</p>
            <hr />
            <div>
                <p>Produtos:</p>
                <p>{{ cart.length }}</p>
            </div>
            <div>
                <p>Frete:</p>
                <p style="color: var(--xanadu)">Grátis</p>
            </div>
            <div>
                <p id="total-value">
                    <strong>Total:</strong>
                </p>
                <div id="price-values">
                    <p>R$ {{ totalAmount.toFixed(2) }}</p>
                    <p>em até 10x de R$ {{ financedValue(totalAmount) }}</p>
                </div>
            </div>
            <div id="container-buttons">
                <button @click="checkout" v-if="cart.length">
                    Finalizar compra
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 2rem;

    height: 100%;
    width: 80vw;
}
button {
    max-width: 15rem;
    min-width: fit-content;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 0.7rem;
    background-color: var(--green-spring);
    color: #fff;
    font-size: 1rem;
    font-weight: 200;
    letter-spacing: 0.5px;

    transition:
        background-color 0.3s ease-in,
        border 0.3s ease-in;

    margin: 1rem 0;
}

button:hover {
    cursor: pointer;
    background-color: var(--xanadu);
    border: 1px solid #fff;
}

li {
    list-style: none;
}

#items-cart {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0 1rem;
}

#resume-cart {
    margin-top: 1rem;
    width: 30%;
    height: fit-content;

    padding: 1rem 2rem;

    background-color: #8181813b;
    border-radius: 15px;
}

#resume-cart > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

#total-value {
    font-size: 1.3rem;
    font-weight: 800;
    color: #000000ab;
}
#price-values {
    line-height: 0.1px;
    text-align: center;
}
#price-values > p:first-child {
    font-size: 1.2rem;
}
#price-values > p:last-child {
    font-size: 0.7rem;
    opacity: 0.7;
}
</style>
