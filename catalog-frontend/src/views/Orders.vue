<script setup>
import { ref, onMounted } from 'vue';
import { getOrders } from '@/services/orderService.js';

const orders = ref([]);
const token = localStorage.getItem('token');

const loadOrders = async () => {
    if (!token) return;
    try {
        const response = await getOrders(token);
        orders.value = response.data;
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
    }
};

onMounted(loadOrders);
</script>

<template>
    <div>
        <h2>Meus Pedidos</h2>
        <ul v-if="orders.length">
            <li v-for="order in orders" :key="order._id">
                <p><strong>Status:</strong> {{ order.status }}</p>
                <ul>
                    <li v-for="item in orders" :key="item.product._id">
                        {{ item.product.name }} - {{ item.quantity }}x
                    </li>
                </ul>
                <p><strong>Total:</strong>R$ {{ order.totalAmount }}</p>
            </li>
        </ul>
        <p v-else>Você ainda não fez pedidos.</p>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}
</style>
