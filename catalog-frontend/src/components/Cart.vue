<script setup>
import { ref, computed, onMounted } from 'vue';
import {
    clearCart,
    removeFromCart,
    loadCart,
    getTotalValueOnCart,
    updateItemQuantityOnCart,
} from '../services/cartService.js';
import { checkoutOrder, createOrder } from '@/services/orderService.js';
import { useRouter } from 'vue-router';
import CartItemView from './CartItemView.vue';
import { useAuthStore } from '@/store/useAuthStore.js';
import ResumeCard from './ResumeCard.vue';

const router = useRouter(); // Direcionador de endereços
const isLogged = ref(false); // Armazena o estado do usuario
const cart = ref([]); // Responsável por receber os produtos
const auth = useAuthStore();

// Limpa o carrinho
const clear = () => {
    clearCart();
    cart.value = [];
};

// Calcula o valor total de compra para os itens no carrinho
const totalAmount = computed(() => getTotalValueOnCart(cart));

// 🔥 Função para atualizar a quantidade no carrinho
const updateItemQuantity = (productId, newQuantity) =>
    updateItemQuantityOnCart(productId, newQuantity, cart);

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
onMounted(async () => loadCart(cart));
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
        <div v-if="cart.length">
            <ResumeCard
                :length="cart.length"
                :total-amount="totalAmount"
                @event-checkout="checkout" />
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
</style>
