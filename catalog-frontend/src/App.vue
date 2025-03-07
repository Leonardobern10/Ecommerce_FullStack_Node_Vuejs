<template>
    <div id="app">
        <nav class="navbar">
            <router-link :to="PATH.HOME" class="navbar-link">Home</router-link>
            <router-link :to="PATH.PRODUCTS.ROOT" class="navbar-link"
                >Produtos</router-link
            >
            <router-link
                v-if="authState.isAuthenticated.value"
                :to="PATH.CART"
                class="navbar-link"
                >Carrinho</router-link
            >
            <router-link
                v-if="authState.isAuthenticated.value"
                :to="PATH.ORDERS"
                class="navbar-link"
                >Meus pedidos</router-link
            >
            <router-link
                v-if="!authState.isAuthenticated.value"
                :to="PATH.LOGIN"
                class="navbar-link"
                >Login</router-link
            >
            <router-link
                v-if="!authState.isAuthenticated.value"
                :to="PATH.REGISTER"
                class="navbar-link"
                >Registrar</router-link
            >
            <button
                v-if="authState.isAuthenticated.value"
                id="btn-logout"
                @click="logout">
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
import { URL } from './constants/URL';
import PATH from './constants/PATH';
import axios from 'axios';
import MESSAGE from './constants/MESSAGE';

// Responsável por fazer o redirecionamento para o endereço correto
const router = useRouter();
let userIsLogged = ref(false);

// Função executada quando o botao [Logout] é pressionado.
const logout = async () => {
    try {
        await axios.post(URL.LOGOUT, {}, { withCredentials: true });
        authState.logout();
        userIsLogged.value = false;
        router.push(PATH.LOGIN);
    } catch (error) {
        console.error(MESSAGE.ERROR.LOGOUT);
        alert(MESSAGE.ERROR.LOGOUT);
    }
    // É chamado o método logout()

    // O usuario é redirecionado para a pagina de login
};

onMounted(async () => {
    await authState.checkAuthStatus();
    userIsLogged.value = authState.isAuthenticated.value;
});
</script>

<style scoped>
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
    transition: text-shadow 0.1s ease-in-out;
}

.navbar-link:hover {
    text-shadow: 2px 2px 10px var(--green-spring);
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
