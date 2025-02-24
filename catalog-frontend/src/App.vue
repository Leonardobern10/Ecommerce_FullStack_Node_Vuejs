<template>
    <div id="app">
        <nav class="navbar">
            <router-link to="/" class="navbar-link">Home</router-link>
            <router-link to="/api/products" class="navbar-link"
                >Produtos</router-link
            >
            <router-link
                v-if="authState.isAuthenticated.value"
                to="/api/cart"
                class="navbar-link"
                >Carrinho</router-link
            >
            <router-link
                v-if="authState.isAuthenticated.value"
                to="/api/orders"
                class="navbar-link"
                >Meus pedidos</router-link
            >
            <router-link
                v-if="!authState.isAuthenticated.value"
                to="/api/auth/login"
                class="navbar-link"
                >Login</router-link
            >
            <router-link
                v-if="!authState.isAuthenticated.value"
                to="/api/auth/register"
                class="navbar-link"
                >Registrar</router-link
            >
            <button
                v-if="authState.isAuthenticated.value"
                class="navbar-link"
                @click="logout"
            >
                Logout
            </button>
        </nav>

        <router-view />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { authState } from '@/store/useAuth.js';

const router = useRouter();

const logout = () => {
    authState.logout();
    router.push('/api/auth/login');
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
}

.navbar {
    display: flex;
    justify-content: center;
    background-color: #333;
    padding: 10px;
}

.navbar-link {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-size: 1.2rem;
}

.navbar-link:hover {
    text-decoration: underline;
}
</style>
