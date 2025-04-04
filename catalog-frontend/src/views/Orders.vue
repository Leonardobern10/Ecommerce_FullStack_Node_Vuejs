<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/useAuthStore';
import { loadOrders } from '@/services/orderService';

const orders = ref([]);
const isLogged = ref(false);
const auth = useAuthStore();
const router = useRouter();

onMounted(async () => await loadOrders(isLogged, router, auth, orders));
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
                        <p id="date-order">
                            <strong>Data:</strong>
                            {{ new Date(order.createdAt).toLocaleString() }}
                        </p>
                        <p><strong>Status:</strong> {{ order.status }}</p>
                        <p id="price-total">
                            <strong>Total:</strong> R$
                            {{
                                Number.parseFloat(order.totalAmount).toFixed(2)
                            }}
                        </p>
                    </div>
                    <div id="all-order-items">
                        <ul id="order-item">
                            <li
                                id="name-item"
                                v-for="item in order.items"
                                :key="item._id">
                                <div id="container-item-order">
                                    <div id="container-image-item-order">
                                        <img :src="item.imageUrl" alt="foto" />
                                    </div>
                                    <p>
                                        {{ item.quantity }}x
                                        {{ item.product.name }}
                                    </p>
                                    <p>R${{ item.price }}</p>
                                </div>
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

    width: 100%;
    min-height: 100vh;
}
h1 {
    color: #000000b4;
}
li {
    list-style: none;
}
#container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
#order {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    width: 70%;
    height: fit-content;

    background-color: #d9d9d9;
    border: 2px solid rgba(0, 0, 0, 0.658);

    margin: 1rem 0;
    padding: 1rem;
}
#description-order {
    width: 30%;
}
#date-order {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--xanadu);
    color: #fff;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    width: 16rem;
    padding: 0 1rem;
}
#name-item {
    padding: 0.5rem;
    text-align: left;

    width: 100%;

    background-color: #fff;
}
#order-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 1rem;

    padding: 0;
    margin: 0;

    width: 100%;

    text-align: left;
}
#all-order-items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 0 1rem;

    background-color: #fff;

    height: 100%;
    width: 60%;
}
#all-order-items > p {
    color: #000;
    font-size: 1.2rem;
}
#price-total {
    font-size: clamp(0.7rem, 1rem, 2rem);
}
#container-image-item-order {
    width: 20%;
    height: 20%;
}
#container-item-order {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
