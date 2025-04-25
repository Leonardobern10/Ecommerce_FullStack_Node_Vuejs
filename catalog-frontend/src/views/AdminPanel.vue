<script setup>
import PATH from '@/constants/PATH';
</script>

<template>
    <div class="flex h-full w-full bg-gray-100">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-800 text-white p-6 flex flex-col gap-4">
            <h2 class="text-2xl font-semibold">Admin Panel</h2>
            <nav class="flex flex-col gap-2">
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
                    to="/orders"
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

        <!-- Main Content -->
        <main class="flex-1 p-6">
            <h1 class="text-3xl font-semibold mb-6">Gerenciar Produtos</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <router-link
                    to="/products/add"
                    class="group flex items-center justify-center h-40 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
                    <span
                        class="text-xl font-semibold group-hover:scale-105 transition"
                        >Adicionar Produto</span
                    >
                </router-link>

                <router-link
                    to="/products/edit"
                    class="group flex items-center justify-center h-40 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                    <span
                        class="text-xl font-semibold group-hover:scale-105 transition"
                        >Editar Produto</span
                    >
                </router-link>

                <router-link
                    :to="PATH.PRODUCTS.REMOVE"
                    class="group flex items-center justify-center h-40 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
                    <span
                        class="text-xl font-semibold group-hover:scale-105 transition"
                        >Remover Produto</span
                    >
                </router-link>
            </div>
        </main>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=BioRhyme&display=swap');
</style>

<style scoped>
.font-biorhyme {
    font-family: 'BioRhyme', serif;
}
</style>
