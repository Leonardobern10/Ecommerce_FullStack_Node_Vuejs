<script setup>
import PATH from '@/constants/PATH';
</script>

<template>
    <aside
        class="w-64 max-md:w-full bg-gray-800 text-white p-6 flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">Admin Panel</h2>
        <nav class="flex flex-col max-md:flex-row gap-2">
            <router-link
                to="/dashboard"
                class="p-2 rounded bg-gray-700 hover:bg-gray-600 transition">
                Dashboard
            </router-link>
            <router-link
                to="/products"
                class="p-2 rounded bg-gray-700 hover:bg-gray-600 transition">
                Produtos
            </router-link>
            <router-link
                to="/orders/all"
                class="p-2 rounded bg-gray-700 hover:bg-gray-600 transition">
                Pedidos
            </router-link>
            <router-link
                to="/admin/customers"
                class="p-2 rounded bg-gray-700 hover:bg-gray-600 transition">
                Clientes
            </router-link>
        </nav>
    </aside>
</template>
