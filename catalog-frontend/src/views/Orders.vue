<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';
import { loadOrders } from '@/services/orderService';

const orders = ref([]);
const isLogged = ref(false);
const auth = useAuthStore();

onMounted(async () => await loadOrders(isLogged, auth, orders));
</script>

<template>
    <div id="view">
        <h1>Meus Pedidos</h1>
        <!-- Verifique se orders não é vazio ou indefinido antes de renderizar -->
        <div v-if="orders && orders.length > 0">
            <div id="container" v-for="order in orders" :key="order._id">
                <!-- Verifique se order e order._id estão definidos -->
                <div id="order" v-if="order && order._id">
                    <div id="description-order">
                        <p><strong>Pedido ID:</strong> {{ order._id }}</p>
                        <p><strong>Status:</strong> {{ order.status }}</p>
                        <p>
                            <strong>Data:</strong>
                            {{ new Date(order.createdAt).toLocaleString() }}
                        </p>
                        <p id="price-total">
                            <strong>Total:</strong> R$
                            {{
                                Number.parseFloat(order.totalAmount).toFixed(2)
                            }}
                        </p>
                    </div>
                    <div id="all-order-items">
                        <p><strong>Itens do pedido:</strong></p>
                        <ul id="order-item">
                            <li
                                id="name-item"
                                v-for="item in order.items"
                                :key="item.product._id">
                                {{ item.quantity }}x {{ item.product.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else>
                    <p>Erro ao carregar pedido.</p>
                </div>
            </div>
        </div>
        <div v-else><p>Nenhum pedido encontrado.</p></div>
    </div>
</template>

<style scoped>
#view {
    display: flex;
    flex-direction: column;
    align-items: center;
}
h1 {
    color: var(--green-spring);
    text-shadow: 5px 5px 5px black;
}
li {
    list-style: none;
}
#container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
#order {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    width: 100%;

    background-color: #d9d9d9;
    box-shadow:
        5px 5px 5px var(--blue-smoke),
        -5px 5px 5px var(--blue-smoke),
        5px -5px 5px var(--blue-smoke);
    border-radius: 15px;

    margin: 1rem 0;
    padding: 1rem;
}
#name-item {
    padding: 0.5rem;
    text-align: left;

    width: 100%;

    background-color: var(--green-spring);
    border-radius: 15px;
}
#order-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 1rem;

    padding: 0;
    margin: 0;

    width: 90%;

    text-align: left;
}
#all-order-items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    border-radius: 15px;
    padding: 0.5rem 1rem;

    height: 12rem;
    width: 45%;
}
#all-order-items > p {
    color: #000;
    font-size: 1.2rem;
}
#price-total {
    font-size: 1.5rem;
}
@media (max-width: 500px) {
    #order-items {
        width: 100%;
    }
}
@media (min-width: 500px) {
    #order-items {
        width: 100%;
    }
}
</style>
