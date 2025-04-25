<script setup>
import AdminSidebar from '@/components/AdminSidebar.vue';
import { getOrdersById } from '@/services/orderService';
import getAllUsers from '@/services/userService';
import { onMounted, reactive, ref } from 'vue';

const listUsers = ref([]);
const pedidos = reactive([]);

const getOrders = async (id) => {
    pedidos.length = 0; // Limpar pedidos anteriores antes de atribuir novos
    const orders = await getOrdersById(id);
    pedidos.push(...orders); // Usando push(...) para adicionar novos pedidos ao array
};

onMounted(async () => {
    const users = await getAllUsers();
    listUsers.value = users;
});
</script>

<template>
    <div class="flex flex-row max-md:flex-col h-screen w-full">
        <AdminSidebar />
        <div
            class="flex flex-col justify-between items-center h-full overflow-y-auto w-full bg-white">
            <div class="text-justify p-4 w-full text-neutral-800">
                <h1 class="text-4xl font-bold p-2">Lista de Clientes</h1>
                <p class="text-sm font-andika font-medium p-2 w-5/6">
                    Aqui se encontram todos os clientes cadastrados em nosso
                    sistema. Para cada cliente é possível consultar seus pedidos
                    pressionando o botão "Pedidos". Caso haja pedidos para esse
                    cliente, à direita eles serão mostrados.
                </p>
            </div>
            <div
                class="flex flex-row justify-between max-lg:grid-cols-1 gap-2 w-full rounded-container p-5">
                <table class="w-1/2 table-auto border-collapse">
                    <caption class="font-bold text-lg">
                        Tabela com todos os usuários cadastrados
                    </caption>
                    <thead>
                        <tr>
                            <th class="table-head">ID</th>
                            <th class="table-head">Username</th>
                            <th class="table-head">E-mail</th>
                            <th class="table-head">Nivel de acesso</th>
                            <th class="table-head">Buscar pedidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in listUsers" :key="user._id">
                            <td class="table-definition">
                                {{ user._id }}
                            </td>
                            <td class="border-2 p-0.5 text-center">
                                {{ user.name }}
                            </td>
                            <td class="border-2 p-0.5 text-center">
                                {{ user.email }}
                            </td>
                            <td class="border-2 p-0.5 text-center">
                                {{ user.role }}
                            </td>
                            <td class="border-2 p-0.5 text-center">
                                <button
                                    @click="getOrders(user._id)"
                                    class="p-1 text-xs border-2 rounded-container bg-xanadu/50">
                                    Pesquisar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div
                    v-if="pedidos.length !== 0"
                    class="h-full col-start-0 gap-2"
                    id="pedidos">
                    <h2 class="font-bold text-lg">Pedidos buscados abaixo:</h2>
                    <li
                        class="list-none text-black text-xs p-4 bg-black/30 mb-1"
                        v-for="pedido in pedidos"
                        :key="pedido.id">
                        <h3
                            class="flex flex-col items-center font-bold text-sm mb-4">
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
                            class="flex flex-col gap-4 items-center justify-between mt-5">
                            <table class="w-full">
                                <caption class="font-bold text-lg">
                                    Itens do pedido
                                </caption>
                                <thead>
                                    <tr>
                                        <th class="p-1 border-2 text-center">
                                            Produto
                                        </th>
                                        <th class="p-1 border-2 text-center">
                                            Quantidade
                                        </th>
                                        <th class="p-1 border-2 text-center">
                                            Valor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in pedido.items"
                                        :key="item.product">
                                        <td class="p-1 border-2 text-center">
                                            {{ item._id }}
                                        </td>
                                        <td class="p-1 border-2 text-center">
                                            {{ item.quantity }}
                                        </td>
                                        <td class="p-1 border-2 text-center">
                                            {{ item.price }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                </div>
                <p v-else>O cliente não possui pedidos em nosso sistema.</p>
            </div>
        </div>
    </div>
</template>
