<template>
    <div id="app">
        <header>
            <div class="container-logo"></div>
            <nav class="navbar">
                <div id="container-sections">
                    <router-link :to="PATH.HOME" class="navbar-link"
                        >Home</router-link
                    >
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
                </div>
            </nav>
            <div id="container-login">
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
            </div>
        </header>
        <main>
            <div>
                <router-view />
            </div>
        </main>
        <footer>
            <div id="container-footer">
                <div>
                    <div id="info-footer">
                        <div class="container-logo" id="logo-footer"></div>
                        <p>Seu estilo começa pelo seu pulso.</p>
                        <div id="container-logo-social-networks">
                            <div
                                id="logo-social-network"
                                v-for="item in socialNetworksLogos"
                                :key="item.nome">
                                <img
                                    :src="item.nome"
                                    :alt="`logo do ${item.nome}`" />
                            </div>
                        </div>
                    </div>
                    <div id="navigation-footer">
                        <div>
                            <p class="title-navigation">Informações</p>
                            <p class="option-navigation">Sobre nós</p>
                            <p class="option-navigation">Entrega</p>
                            <p class="option-navigation">Blog</p>
                        </div>
                        <div>
                            <p class="title-navigation">Empresa</p>
                            <p class="option-navigation">Comunidade</p>
                            <p class="option-navigation">Carreira</p>
                            <p class="option-navigation">Nossa história</p>
                        </div>
                        <div>
                            <p class="title-navigation">Navegação</p>
                            <p class="option-navigation">Home</p>
                            <p class="option-navigation">Produtos</p>
                            <p class="option-navigation">Contato</p>
                        </div>
                    </div>
                </div>
                <p>© 2025 ShopWatch - Todos os direitos reservados</p>
                <p id="author">
                    Made with 🧠 by
                    <a href="https://www.linkedin.com/in/leonardo-bern/"
                        >Leonardo Bernardo</a
                    >
                </p>
            </div>
        </footer>
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
import logoInstagram from './assets/icons/instagram1.svg';
import logoTwitter from './assets/icons/twitter1.svg';
import logoFacebook from './assets/icons/facebook1.svg';

// Responsável por fazer o redirecionamento para o endereço correto
const router = useRouter();
let userIsLogged = ref(false);
const socialNetworksLogos = [
    { nome: logoFacebook },
    { nome: logoInstagram },
    { nome: logoTwitter },
];

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
    console.log(userIsLogged.value);
});
</script>

<style scoped>
#app {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

header {
    width: 100%;
    height: 2rem;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    padding: 1rem 0;
}
.container-logo {
    background-image: var(--logo-shop-watch);
    background-repeat: no-repeat;
    background-size: contain;
    filter: opacity(0.7);

    width: 50px;
    height: 30px;
}

.navbar {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40%;
}

.navbar-link {
    color: #000000ad;
    text-decoration: none;
    margin: 0 1.3rem;
    font-size: 1rem;
    letter-spacing: 0.1px;
    transition: text-shadow 0.1s ease-in-out;
    font-weight: 400;
}

.navbar-link:hover {
    text-shadow: 2px 2px 2px var(--xanadu);
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

main {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

#container-footer {
    margin-top: 2rem;

    width: 100%;
    height: 100%;
    background-color: #d9d9d9;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

#container-footer > div {
    width: 80%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5rem 0;
}

#container-logo-social-networks {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 10rem;
}
footer {
    width: 100%;
    height: 100%;

    margin-top: 8rem;
}

#info-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    row-gap: 1rem;
}

#info-footer p {
    width: 70%;
}

#navigation-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    column-gap: 2rem;
    color: #000000ad;
}

.title-navigation {
    font-weight: 600;
    font-size: 1.3rem;
    color: black;
}

#logo-footer {
    width: 70px;
    height: 50px;
}

#author {
    line-height: 0.1rem;
}
#author a {
    text-decoration: none;
}

#logo-social-network:hover,
.option-navigation:hover {
    cursor: pointer;
}
</style>
