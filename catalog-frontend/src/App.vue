<template>
    <div id="app">
        <nav class="navbar">
            <router-link to="/" class="navbar-link">Home</router-link>
            <router-link to="/products" class="navbar-link"
                >Produtos</router-link
            >
            <router-link
                v-if="authState.isAuthenticated.value"
                to="/cart"
                class="navbar-link"
                >Carrinho</router-link
            >
            <router-link
                v-if="authState.isAuthenticated.value"
                to="/orders"
                class="navbar-link"
                >Meus pedidos</router-link
            >
            <router-link
                v-if="!authState.isAuthenticated.value"
                to="/login"
                class="navbar-link"
                >Login</router-link
            >
            <router-link
                v-if="!authState.isAuthenticated.value"
                to="/register"
                class="navbar-link"
                >Registrar</router-link
            >
            <button
                v-if="authState.isAuthenticated.value"
                id="btn-logout"
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
    router.push('/login');
};

if (!authState.isAuthenticated.value) {
    alert('Desconectado!');
    router.push('/login');
}
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
    width: 100%;
}

.navbar-link {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-size: 1.2rem;

    font-weight: 500;
}

.navbar-link:hover {
    text-decoration: underline;
}

#btn-logout {
    width: 4rem;
    border: none;
    background-color: #0e6402;
    color: #fff;
}
</style>
