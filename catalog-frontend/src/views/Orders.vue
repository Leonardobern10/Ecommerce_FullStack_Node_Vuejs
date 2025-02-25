<template>
    <div>
        <h1>Meus Pedidos</h1>
        <!-- Verifique se orders não é vazio ou indefinido antes de renderizar -->
        <div v-if="orders && orders.length > 0">
            <div v-for="order in orders" :key="order._id">
                <!-- Verifique se order e order._id estão definidos -->
                <div v-if="order && order._id">
                    <p><strong>Pedido ID:</strong> {{ order._id }}</p>
                    <p><strong>Status:</strong> {{ order.status }}</p>
                    <p><strong>Total:</strong> R$ {{ order.totalAmount }}</p>
                    <p><strong>Itens:</strong></p>
                    <ul>
                        <li v-for="item in order.items" :key="item.product._id">
                            {{ item.product.name }} -
                            {{ item.quantity }} unidades
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <p>Erro ao carregar pedido.</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Nenhum pedido encontrado.</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: 'Orders',
    setup() {
        const orders = ref([]);

        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/orders',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    },
                );
                orders.value = response.data; // Armazena os pedidos no estado
            } catch (error) {
                console.error('Erro ao carregar os pedidos:', error);
            }
        };

        onMounted(() => {
            fetchOrders();
        });

        return { orders };
    },
};
</script>

<style scoped>
li {
    list-style: none;
}
</style>
