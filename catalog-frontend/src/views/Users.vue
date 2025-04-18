<script setup>
import AdminSidebar from '@/components/AdminSidebar.vue';
import Button from '@/components/Button.vue';
import { getOrdersById } from '@/services/orderService';
import getAllUsers from '@/services/userService';
import { onMounted, reactive, ref } from 'vue';

const listUsers = ref([]);
const pedidos = reactive([]);

const getOrders = async (id) => {
    pedidos.length = 0; // Limpar pedidos anteriores antes de atribuir novos
    const orders = await getOrdersById(id);
    pedidos.push(...orders); // Usando push(...) para adicionar novos pedidos ao array
    console.log(pedidos);
};

onMounted(async () => {
    const users = await getAllUsers();
    listUsers.value = users;
});
</script>

<template>
    <div class="flex flex-row max-md:flex-col h-screen">
        <AdminSidebar />
        <div
            class="flex flex-col justify-between items-center h-full overflow-y-auto w-full bg-white/80">
            <div class="text-justify p-4 w-full text-neutral-800">
                <h1 class="text-4xl font-bold p-2">Lista de Clientes</h1>
                <p class="text-sm font-andika font-medium p-2 w-5/6">
                    Aqui se encontram todos os clientes cadastrados em nosso
                    sistema. Para cada cliente é possível consultar seus pedidos
                    pressionando o botão "Pedidos". Caso haja pedidos para esse
                    cliente, ao fim da página serão mostrados.
                </p>
            </div>
            <div
                class="grid grid-flow-row grid-cols-2 max-lg:grid-cols-1 gap-4 w-6/8 max-md:w-full rounded-container p-5">
                <li
                    class="list-none my-4 h-fit bg-black/50 rounded-container border-black p-5 text-lg max-md:text-sm text-gray-200/80"
                    v-for="item in listUsers"
                    :key="item._id">
                    <!-- estava errado antes -->
                    <p><strong>ID:</strong> {{ item._id }}</p>
                    <p><strong>User:</strong> {{ item.name }}</p>
                    <p><strong>E-mail: </strong>{{ item.email }}</p>
                    <p class="mb-4">
                        <strong>Role: </strong
                        >{{ String(item.role).toUpperCase() }}
                    </p>
                    <Button
                        ref="#pedidos"
                        button-name="Pedidos"
                        @click="getOrders(item._id)" />
                </li>
                <div
                    v-if="pedidos.length !== 0"
                    class="h-full col-start-0"
                    id="pedidos ">
                    <li
                        class="list-none text-black text-sm m-4 p-4 bg-black/30 rounded-container"
                        v-for="pedido in pedidos"
                        :key="pedido.id">
                        <h3
                            class="flex flex-col items-center font-bold text-xl mb-4">
                            Nº Pedido: <span>{{ pedido._id }}</span>
                        </h3>
                        <div>
                            Data do pedido:
                            {{ new Date(pedido.createdAt).toLocaleString() }}
                        </div>
                        <div>
                            Valor total do pedido: R${{ pedido.totalAmount }}
                        </div>
                        <div>
                            Status do pedido:
                            <strong>{{ pedido.status }}</strong>
                        </div>
                        <div
                            class="flex flex-col gap-4 items-center justify-between text-gray-200/50 p-4 mt-5 rounded-container">
                            <p class="text-lg font-bold">Itens do pedido:</p>
                            <div
                                class="flex flex-col items-center justify-between w-full text-sm gap-4 p-3 h-fit"
                                v-for="item in pedido.items"
                                :key="item.product">
                                <div class="w-1/2">
                                    <img
                                        :src="item.imageUrl"
                                        alt=""
                                        class="bg-white rounded-container" />
                                </div>
                                <div
                                    class="flex flex-col justify-between items-center h-full">
                                    <p class="flex flex-col items-center">
                                        ID produto:
                                        <span>{{ item.product }}</span>
                                    </p>
                                    <p>Quantidade: {{ item.quantity }}</p>
                                    <p>Valor: R$ {{ item.price }}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
                <p v-else>O cliente não possui pedidos em nosso sistema.</p>
            </div>
        </div>
    </div>
</template>
