<script setup>
import AdminSidebar from '@/components/AdminSidebar.vue';
import { getOrders } from '@/services/orderService';
import { onMounted, ref } from 'vue';

const orders = ref([]);

const getAllOrders = async () => (orders.value = await getOrders());

onMounted(async () => await getAllOrders());
</script>

<template>
    <div class="w-full h-full flex flex-row bg-white">
        <AdminSidebar />
        <table class="w-full text-black">
            <caption>
                <h3 class="text-lg">Lista de pedidos do sistema</h3>
                <p>
                    Aqui se encontram todos os pedidos registrados no sistema
                    até então.
                </p>
            </caption>
            <thead>
                <tr>
                    <th class="table-head">Pedido</th>
                    <th class="table-head">Status</th>
                    <th class="table-head">Criado em</th>
                    <th class="table-head">Items do pedido</th>
                    <th class="table-head">Valor total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order._id">
                    <td class="table-definition">{{ order._id }}</td>
                    <td class="table-definition">{{ order.status }}</td>
                    <td class="table-definition">
                        {{ new Date(order.createdAt).toLocaleString() }}
                    </td>
                    <td class="table-definition">
                        <ul class="list-none flex-col">
                            <li
                                class="m-2 bg-gray-200/50"
                                v-for="item in order.items"
                                :key="item._id">
                                Produto: {{ item.product }}<br />
                                Quantidade: {{ item.quantity }}<br />
                                Valor: R$ {{ item.price.toFixed(2) }}
                            </li>
                        </ul>
                    </td>
                    <td class="table-definition">
                        R$ {{ order.totalAmount.toFixed(2) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
