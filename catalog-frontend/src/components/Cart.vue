<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCart, clearCart } from '../services/cartService.js';
import { createOrder } from '@/services/orderService.js';
import { useRouter } from 'vue-router';
import { authState } from '@/store/useAuth.js';

const router = useRouter();
const cart = ref([]);
const token = localStorage.getItem('token');

const loadCart = () => {
    cart.value = getCart();
};

const clear = () => {
    clearCart();
    cart.value = [];
};

const totalAmount = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0),
);

const checkout = async () => {
    if (!token) {
        alert('Você precisa estar logado para finalizar a compra.');
        router.push('/login');
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

        await createOrder(orderData, token);
        alert('Pedido realizado com sucesso!');
        clearCart();
        router.push('/');
    } catch (error) {
        alert('Erro ao finalizar compra. Tente novamente.');
        console.error(error);
    }
};

onMounted(() => {
    if (authState.isAuthenticated.value) return loadCart;

    router.push('/login');
});
</script>

<template>
    <div>
        <h2>Carrinho de Compras</h2>
        <ul v-if="cart.length">
            <li class="item-cart" v-for="item in cart" :key="item._id">
                {{ item.name }} - R$ {{ item.price }} x {{ item.quantity }}
            </li>
        </ul>
        <p v-else>Seu carrinho está vazio.</p>
        <p>
            <strong>Total: R$ {{ totalAmount }}</strong>
        </p>
        <button @click="checkout" v-if="cart.length">Finalizar compra</button>
        <button @click="clear" v-if="cart.length">Limpar</button>
    </div>
</template>

<style scoped>
button {
    background-color: blue;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}
li {
    list-style: none;
}
</style>
