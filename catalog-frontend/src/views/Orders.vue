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
    <div class="flex flex-col items-center w-full min-h-screen">
        <h1 class="text-black/70 text-2xl font-semibold mb-4">Meus Pedidos</h1>

        <div v-if="orders && orders.length > 0" class="w-full">
            <div
                v-for="order in orders"
                :key="order._id"
                class="flex flex-col items-center w-full">
                <div
                    v-if="order && order._id"
                    class="relative flex flex-row max-md:flex-col-reverse justify-around items-center w-[70%] bg-black/50 border-2 border-gray-500/20 my-4 p-4 max-md:py-10">
                    <!-- Descrição do pedido -->
                    <div class="w-[30%]">
                        <p
                            class="absolute top-0 left-0 bg-[var(--xanadu)] text-white border-r border-b border-black w-64 px-4 py-1">
                            <strong>Data:</strong>
                            {{ new Date(order.createdAt).toLocaleString() }}
                        </p>
                        <p><strong>Status:</strong> {{ order.status }}</p>
                        <p class="text-[clamp(0.7rem,1rem,2rem)]">
                            <strong>Total:</strong> R$
                            {{
                                Number.parseFloat(order.totalAmount).toFixed(2)
                            }}
                        </p>
                    </div>

                    <!-- Itens do pedido -->
                    <div
                        class="flex flex-col items-start px-4 bg-gray-500/20 h-full w-[60%]">
                        <ul
                            class="flex flex-col items-start gap-4 p-0 m-0 w-full text-left">
                            <li
                                v-for="item in order.items"
                                :key="item._id"
                                class="p-2 text-left w-full">
                                <div
                                    class="flex flex-row max-md:flex-col justify-between items-center">
                                    <div
                                        class="w-[20%] max-md:w-full h-[20%] max-md:h-full">
                                        <img
                                            :src="item.imageUrl"
                                            alt="foto"
                                            class="w-full h-full object-cover rounded-2xl" />
                                    </div>
                                    <p class="text-gray-200/50">
                                        {{ item.quantity }}x
                                        {{ item.product.name }}
                                    </p>
                                    <p class="text-gray-200/50">
                                        R${{ item.price }}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div v-else>
                    <p class="text-red-500">Erro ao carregar pedido.</p>
                </div>
            </div>
        </div>

        <div v-else>
            <p class="text-gray-600">Nenhum pedido encontrado.</p>
        </div>
    </div>
</template>
