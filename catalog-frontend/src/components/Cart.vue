<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCart, clearCart } from '../services/cartService.js';
import { createOrder } from '@/services/orderService.js';
import { useRouter } from 'vue-router';
import CartItemView from './CartItemView.vue';
import { useAuthStore } from '@/store/useAuthStore.js';
import PATH from '@/constants/PATH.js';
import MESSAGE from '@/constants/MESSAGE.js';

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

// Finaliza a compra
const checkout = async () => {
    await auth.checkAuthStatus();
    isLogged.value = auth.authenticated;

    if (!isLogged.value) {
        alert(MESSAGE.ALERT.ORDER.NEED_AUTHENTICATE);
        router.push(PATH.LOGIN);
        return;
    }

    try {
        const orderData = {
            items: cart.value.map((item) => ({
                product: item._id,
                quantity: item.quantity,
            })),
            totalAmount: totalAmount.value,
        };

        await createOrder(orderData);
        alert(MESSAGE.SUCESS.ORDER);
        clear();
        router.push(PATH.HOME);
    } catch (error) {
        alert(MESSAGE.ERROR.ORDER.DEFAULT);
        console.error(error);
    }
};

// Verifica se o usuário está logado e carrega o carrinho
onMounted(loadCart);
</script>

<template>
    <div id="view">
        <h2>Carrinho de Compras</h2>
        <ul id="items-cart" v-if="cart.length">
            <li class="item-cart" v-for="item in cart" :key="item._id">
                <CartItemView
                    :name="item.name"
                    :price="item.price"
                    :quantity="item.quantity"
                    :image-url="item.imageUrl" />
            </li>
        </ul>
        <p v-else>Seu carrinho está vazio.</p>
        <p id="total-value">
            <strong>Total: R$ {{ totalAmount.toFixed(2) }}</strong>
        </p>
        <div id="container-buttons">
            <button @click="checkout" v-if="cart.length">
                Finalizar compra
            </button>
            <button @click="clear" v-if="cart.length">Limpar</button>
        </div>
    </div>
</template>

<style scoped>
#view {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
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
}

button:hover {
    cursor: pointer;
    background-color: var(--xanadu);
    border: 1px solid #fff;
}

li {
    list-style: none;
}
button {
    margin: 0 2rem;
}
#items-cart {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.item-cart {
    padding: 1rem 0;
}

#container-buttons {
    margin-bottom: 1rem;
}

#total-value {
    font-size: 1.5rem;
    font-weight: 800;
    text-shadow: 4px 4px 10px var(--blue-smoke);
    color: var(--xanadu);
}
</style>
