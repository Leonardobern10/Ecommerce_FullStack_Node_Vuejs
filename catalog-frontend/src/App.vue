<script setup>
import { useRouter } from 'vue-router';
import { authState } from '@/store/useAuth.js';
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import PATH from './constants/PATH';
import logoInstagram from './assets/icons/instagram1.svg';
import logoTwitter from './assets/icons/twitter1.svg';
import logoFacebook from './assets/icons/facebook1.svg';
import signOut from './services/logoutService';

let userIsLogged = ref(false);

const screenWidth = ref(window.innerWidth);
const socialNetworksLogos = [
    { nome: logoFacebook },
    { nome: logoInstagram },
    { nome: logoTwitter },
];

const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
};

// Função executada quando o botao [Logout] é pressionado.
const logout = async () => signOut(userIsLogged, alert);

onMounted(async () => {
    window.addEventListener('resize', updateScreenSize);
    await authState.checkAuthStatus();
    userIsLogged.value = authState.isAuthenticated.value;
});

onUpdated(() => screenWidth.value);

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
});
</script>

<template>
    <div id="app">
        <header>
            <router-link :to="PATH.HOME">
                <div class="container-logo"></div>
            </router-link>
            <nav v-if="screenWidth > 600" class="navbar">
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
            <div v-if="screenWidth > 600" id="container-login">
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
            <div v-else id="menu-mobile"></div>
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
                <p id="right-terms">
                    © 2025 ShopWatch - Todos os direitos reservados
                </p>
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

<style scoped>
@media (max-width: 600px) {
    header {
        width: 90%;
        height: 2rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 1rem 0;
    }
    .navbar {
        width: 30%;
    }
    #container-sections {
        justify-content: space-between;
    }
    #menu-mobile {
        content: url('./assets/icons/menu_icon.svg');
    }
    footer {
        margin-top: 4rem;
    }
    #container-footer > div {
        width: 90%;

        flex-direction: column;
        row-gap: 1rem;
        padding: 2rem 0;
    }
    #container-logo-social-networks {
        justify-content: space-evenly;
        width: 100%;
    }
    #info-footer {
        row-gap: 0.2rem;
    }
    #info-footer p {
        width: 100%;
    }
    #navigation-footer {
        width: 100%;
        line-height: 0.3rem;
    }
    .title-navigation {
        font-size: 1.1rem;
    }
    #author {
        font-size: 0.7rem;
    }

    #logo-social-network {
        width: 2rem;
    }
    #right-terms {
        font-size: 0.7rem;
        line-height: 0.2rem;
    }
}
@media (min-width: 600px) {
    header {
        width: 80%;
        height: 2rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 1rem 0;
    }
    .navbar {
        width: 50%;
    }
    #container-sections {
        justify-content: space-evenly;
    }
    .navbar-link:hover {
        text-shadow: 2px 2px 2px var(--xanadu);
    }
    #container-login {
        width: 15%;
    }
    #btn-logout {
        transition:
            background-color 0.3s ease-in,
            border 0.3s ease-in;
    }
    #btn-logout:hover {
        cursor: pointer;
        background-color: var(--xanadu);
        border: 1px solid #fff;
    }
    footer {
        margin-top: 8rem;
    }
    #container-footer > div {
        width: 80%;

        flex-direction: row;
        padding: 5rem 0;
    }
    #container-logo-social-networks {
        justify-content: space-between;
        width: 10rem;
    }
    #info-footer {
        row-gap: 1rem;
    }
    #info-footer p {
        width: 70%;
    }
    #navigation-footer {
        column-gap: 2rem;
    }
    .title-navigation {
        font-size: 1.3rem;
    }
    #logo-footer {
        width: 70px;
        height: 50px;
    }
    #logo-social-network:hover,
    .option-navigation:hover {
        cursor: pointer;
    }
}
#app {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.container-logo {
    background-image: var(--logo-shop-watch);
    background-repeat: no-repeat;
    background-size: contain;
    filter: opacity(0.7);

    width: 50px;
    height: 30px;
}
#container-sections {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.navbar-link {
    color: #000000ad;
    text-decoration: none;
    font-size: 1rem;
    letter-spacing: 0.1px;
    transition: text-shadow 0.1s ease-in-out;
    font-weight: 400;
    white-space: nowrap;
}
#container-login {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
}
main {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
footer {
    width: 100%;
    height: 100%;
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
    display: flex;
    justify-content: space-between;
}
#container-logo-social-networks {
    display: flex;
    flex-direction: row;
    align-items: center;
}
#info-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}
#navigation-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #000000ad;
}
.title-navigation {
    font-weight: 600;
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
</style>
