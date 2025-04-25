<script setup>
import PATH from '@/constants/PATH';
</script>

<template>
    <aside class="admin-sidebar-style">
        <h2 class="text-2xl font-semibold">Admin Panel</h2>
        <nav class="flex flex-col max-md:flex-row gap-2">
            <router-link to="/dashboard" class="admin-sidebar-link">
                Dashboard
            </router-link>
            <router-link :to="PATH.PRODUCTS.ROOT" class="admin-sidebar-link">
                Produtos
            </router-link>
            <router-link to="/orders/all" class="admin-sidebar-link">
                Pedidos
            </router-link>
            <router-link :to="PATH.ADMIN.CUSTOMERS" class="admin-sidebar-link">
                Clientes
            </router-link>
        </nav>
    </aside>
</template>
