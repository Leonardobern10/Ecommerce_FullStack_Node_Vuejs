<template>
    <div id="app">
        <!-- Navbar - Barra de navegação -->
        <nav class="navbar">
            <router-link to="/" class="navbar-link">Home</router-link>
            <router-link to="/api/products" class="navbar-link"
                >Produtos</router-link
            >
            <router-link v-if="isLoggedIn" to="/api/cart" class="navbar-link"
                >Carrinho</router-link
            >
            <router-link v-if="isLoggedIn" to="/api/orders" class="navbar-link"
                >Meus pedidos</router-link
            >
            <router-link
                v-if="!isLoggedIn"
                to="/api/auth/login"
                class="navbar-link"
                >Login</router-link
            >
            <router-link
                v-if="!isLoggedIn"
                to="/api/auth/register"
                class="navbar-link"
                >Registrar</router-link
            >
        </nav>

        <!-- Área onde os componentes da rota serão renderizados -->
        <router-view />
    </div>
</template>

<script setup>
import { ref } from 'vue';
const isLoggedIn = ref(!!localStorage.getItem('token'));
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
