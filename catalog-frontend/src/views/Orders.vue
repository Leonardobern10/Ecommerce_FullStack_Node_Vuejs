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
                    class="relative flex flex-row max-md:flex-col-reverse justify-around items-center w-[70%] bg-black/50 border-2 border-gray-500/20 my-4 p-4 max-md:py-10 rounded-container">
                    <!-- Descrição do pedido -->
                    <div class="w-[30%] max-md:w-full text-white/50">
                        <p
                            class="absolute top-0 left-0 w-64 px-4 py-1 max-md:w-full">
                            <strong>Data:</strong>
                            {{ new Date(order.createdAt).toLocaleString() }}
                        </p>
                        <div class="mt-2">
                            <p class="text-white/50">
                                <strong class="mr-2">Status: </strong>
                                <span>{{ order.status }}</span>
                            </p>
                            <p
                                class="text-[clamp(0.7rem,1rem,2rem)] text-white/50">
                                <strong class="mr-2">Total:</strong> R$
                                {{
                                    Number.parseFloat(
                                        order.totalAmount,
                                    ).toFixed(2)
                                }}
                            </p>
                        </div>
                    </div>

                    <!-- Itens do pedido -->
                    <div
                        class="flex flex-col items-start px-4 h-full w-[60%] max-md:w-full max-md:rounded-container max-md:p-4">
                        <ul
                            class="flex flex-col items-start gap-4 p-0 m-0 w-full text-left">
                            <li
                                v-for="item in order.items"
                                :key="item._id"
                                class="p-2 text-left w-full">
                                <div
                                    class="flex flex-row md:gap-x-6 max-md:flex-col justify-between items-center max-md:py-3">
                                    <div
                                        class="w-[20%] md:w-12 xl:w-20 md:h-12 xl:h-20 max-md:w-full h-[20%] max-md:h-full">
                                        <img
                                            :src="item.imageUrl"
                                            alt="foto"
                                            class="w-full h-full object-cover rounded-2xl max-md:mb-4" />
                                    </div>
                                    <p
                                        class="text-gray-200/50 max-md:mb-4 md:text-xs">
                                        {{ item.quantity }}x
                                        {{ item.product.name }}
                                    </p>
                                    <p
                                        class="text-gray-200/50 max-md:mb-4 max-md:text-lg">
                                        R${{ Number(item.price).toFixed(2) }}
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
