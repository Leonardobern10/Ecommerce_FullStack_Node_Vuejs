<script setup>
import { ref, computed, onMounted } from 'vue';
import {
    getCart,
    updateQuantity,
    removeFromCart,
    clearCart,
} from '../services/cartService.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const cart = ref([]);

const loadCart = () => {
    cart.value = getCart();
};

const totalAmount = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0),
);

const uppdateItemQuantity = (item, quantity) => {
    updateQuantity(item._id, quantity);
    loadCart();
};

const removeItem = (item) => {
    removeFromCart(item._id);
    loadCart();
};

const checkout = () => {
    alert('Compra finalizada com sucesso!');
    clearCart();
    router.push('/');
};

onMounted(loadCart);
</script>

<template>
    <div>
        <h2>Carrinho de Compras</h2>
        <ul v-if="cart.length">
            <li v-for="item in cart" :key="item._id">
                {{ item.name }} - R$ {{ item.price }}
                <input
                    type="number"
                    v-model="item.quantity"
                    @change="uppdateItemQuantity(item, parseInt(item.quantity))"
                    min="1"
                />
                <button @click="removeItem(item)">Remover</button>
            </li>
        </ul>
        <p v-else>Seu carrinho está vazio.</p>
        <p>
            <strong>Total: R$ {{ totalAmount }}</strong>
        </p>
        <button @click="checkout" v-if="cart.length">Finalizar compra</button>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
}
button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
}
</style>
