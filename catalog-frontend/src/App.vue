<template>
    <div id="app">
        <nav class="navbar">
            <router-link to="/" class="navbar-link">Home</router-link>
            <router-link to="/products" class="navbar-link"
                >Produtos</router-link
            >
            <router-link v-if="userIsLogged" to="/cart" class="navbar-link"
                >Carrinho</router-link
            >
            <router-link v-if="userIsLogged" to="/orders" class="navbar-link"
                >Meus pedidos</router-link
            >
            <router-link v-if="!userIsLogged" to="/login" class="navbar-link"
                >Login</router-link
            >
            <router-link v-if="!userIsLogged" to="/register" class="navbar-link"
                >Registrar</router-link
            >
            <button v-if="userIsLogged" id="btn-logout" @click="logout">
                Logout
            </button>
        </nav>

        <router-view />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { authState } from '@/store/useAuth.js';
import { onMounted, ref } from 'vue';
import axios from 'axios';

// Responsável por fazer o redirecionamento para o endereço correto
const router = useRouter();
const userIsLogged = ref(false);
const API_URL_LOGOUT = 'http://localhost:5000/api/auth/logout';

// Função executada quando o botao [Logout] é pressionado.
const logout = async () => {
    try {
        await axios.post(API_URL_LOGOUT, {}, { withCredentials: true });
        authState.logout();
        userIsLogged.value = false;
        router.push('/login');
    } catch (error) {
        console.error('Erro ao fazer logout!');
        alert('Erro ao fazer logout!');
    }
    // É chamado o método logout()

    // O usuario é redirecionado para a pagina de login
};

onMounted(async () => {
    await authState.checkAuthStatus();
    userIsLogged.value = authState.isAuthenticated.value;
});
</script>

<style>
#app {
    width: 100%;
}

.navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--blue-smoke);
    padding: 1rem 0;
    width: 100%;
    height: 2rem;
    font-weight: 300;
}

.navbar-link {
    color: var(--green-spring);
    text-decoration: none;
    margin: 0 1.3rem;
    font-size: 1.3rem;
    letter-spacing: 0.2px;
}

.navbar-link:hover {
    text-decoration: underline;
}

#btn-logout {
    align-self: stretch;

    width: 5rem;
    border: none;
    border-radius: 5px;
    padding: 0.3rem;
    background-color: var(--green-spring);
    color: #fff;
    font-size: 1rem;
    font-weight: 200;
    letter-spacing: 0.5px;

    transition:
        background-color 0.3s ease-in,
        border 0.3s ease-in;
}

#btn-logout:hover {
    cursor: pointer;
    background-color: var(--xanadu);
    border: 1px solid #fff;
}
</style>
