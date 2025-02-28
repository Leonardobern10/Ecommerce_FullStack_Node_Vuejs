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
<template>
    <div>
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
                    <div>
                        <p><strong>Itens do pedido:</strong></p>
                        <ul id="order-items">
                            <li
                                id="name-item"
                                v-for="item in order.items"
                                :key="item.product._id"
                            >
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
li {
    list-style: none;
}

#container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#order {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    width: 80%;

    background-color: rgba(71, 71, 71, 0.455);
    border: 2px solid black;
    margin: 1rem 0;
}

#order-items {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-end;
    row-gap: 1rem;

    max-height: 8rem;
    min-height: fit-content;

    padding: 0.5rem;
    margin: 1rem;

    color: white;
    background-color: rgb(83, 83, 83);
}

#name-item {
    width: 100%;
    text-align: center;
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
        width: 80%;
    }
}
</style>
