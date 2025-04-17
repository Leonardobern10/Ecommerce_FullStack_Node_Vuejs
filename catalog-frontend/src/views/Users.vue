<script setup>
import Button from '@/components/Button.vue';
import getAllUsers from '@/services/userService';
import { onMounted, ref } from 'vue';

const listUsers = ref([]);

onMounted(async () => {
    console.log('Chamando..');
    const users = await getAllUsers();
    listUsers.value = users;
    console.log('Chamada encerrada!');
});
</script>

<template>
    <div
        class="grid grid-flow-row grid-cols-2 max-lg:grid-cols-1 gap-4 w-5/8 max-md:w-full bg-white/80 rounded-container p-5">
        <li
            class="list-none my-4 bg-black/50 rounded-container border-2 border-black p-5 text-lg max-md:text-sm text-gray-200/80"
            v-for="item in listUsers"
            :key="item._id">
            <!-- estava errado antes -->
            <p><strong>ID:</strong> {{ item._id }}</p>
            <p><strong>User:</strong> {{ item.name }}</p>
            <p><strong>E-mail: </strong>{{ item.email }}</p>
            <p><strong>Role: </strong>{{ String(item.role).toUpperCase() }}</p>
            <Button
                button-name="Pedidos"
                @click="console.log(item._id + ' ' + item.name)" />
        </li>
    </div>
</template>
