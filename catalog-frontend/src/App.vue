<script setup>
import { useAuthStore } from './store/useAuthStore';
import { onMounted, onUnmounted, ref } from 'vue';
import { watchEffect } from 'vue';
import PATH from './constants/PATH';
import logoInstagram from './assets/icons/instagram1.svg';
import logoTwitter from './assets/icons/twitter1.svg';
import logoFacebook from './assets/icons/facebook1.svg';
import signOut from './services/logoutService';
import { generateContent } from './services/appService';
import { useRouter } from 'vue-router';
import { hasPermission } from './services/roleService';
import gsap from 'gsap';
import logo from '@/assets/images/logo_ShopWatch.svg';
import Button from './components/Button.vue';

let menuMobileVisibility = ref(false);
let permitted = ref(false);
let userIsLogged = ref(false);
const useAuth = useAuthStore();
const router = useRouter();
const screenWidth = ref(window.innerWidth);
const socialNetworksLogos = [
    { nome: logoFacebook },
    { nome: logoInstagram },
    { nome: logoTwitter },
];

const updateScreenSize = () => (screenWidth.value = window.innerWidth);

// Função executada quando o botao [Logout] é pressionado.
const logout = async () => signOut(userIsLogged, useAuth, router, alert);

const changeMobileMenuVisibility = () => {
    menuMobileVisibility.value = !menuMobileVisibility.value;
    console.log(menuMobileVisibility.value);
};

onMounted(async () => {
    gsap.from('#header', { y: -100, autoAlpha: 0, duration: 1.2, delay: 0.5 });
    await generateContent(updateScreenSize, userIsLogged, useAuth);
    permitted.value = await hasPermission(useAuth, permitted);
});

watchEffect(async () => await hasPermission(useAuth, permitted));

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
});
</script>

<template>
    <div
        class="grid grid-rows-[4rem_auto_30rem] gap-y-8 grid-cols-1 justify-items-center items-center h-full">
        <header
            id="header"
            class="w-[90vw] sm:w-[80vw] flex justify-between items-center py-4 px-4 h-10 gap-x-8">
            <router-link :to="PATH.HOME" class="w-[10%] h-[2rem]">
                <img :src="logo" alt="" />
            </router-link>

            <nav
                v-if="screenWidth > 600"
                class="flex space-x-2 whitespace-nowrap gap-x-15 mx-8 w-[70%]">
                <router-link :to="PATH.HOME">Home</router-link>
                <router-link :to="PATH.PRODUCTS.ROOT">Produtos</router-link>
                <router-link v-if="useAuth.authenticated" :to="PATH.CART"
                    >Carrinho</router-link
                >
                <router-link v-if="useAuth.authenticated" :to="PATH.ORDERS"
                    >Meus pedidos</router-link
                >
                <router-link
                    v-if="permitted && useAuth.authenticated"
                    :to="PATH.ADMIN"
                    >Administração</router-link
                >
            </nav>

            <div
                v-if="screenWidth > 600"
                id="container-login"
                class="flex justify-between space-x-2 gap-x-2.5 w-[20%] min-w-fit">
                <router-link
                    v-if="!useAuth.authenticated"
                    :to="PATH.LOGIN"
                    class="navbar-link"
                    >Login</router-link
                >
                <router-link
                    v-if="!useAuth.authenticated"
                    :to="PATH.REGISTER"
                    class="navbar-link"
                    >Registrar</router-link
                >
                <Button
                    v-if="useAuth.authenticated"
                    id="btn-logout"
                    @click="logout"
                    button-name="Sair">
                </Button>
            </div>

            <div
                v-else
                @click="changeMobileMenuVisibility"
                id="menu-mobile"
                class="cursor-pointer">
                <div
                    id="container-options-mobile"
                    v-if="menuMobileVisibility"
                    class="absolute w-32 h-full bg-gray-300">
                    <nav>
                        <ul>
                            <li>Teste</li>
                            <li>Teste</li>
                            <li>Teste</li>
                            <li>Teste</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

        <main class="flex flex-col justify-between items-center h-full w-full">
            <router-view />
        </main>

        <footer
            class="mt-8 w-full h-full bg-gray-300 py-20 flex flex-col items-center justify-between">
            <div
                class="w-11/12 h-full flex flex-col sm:flex-row justify-between items-center">
                <div class="flex flex-col items-left gap-y-1 w-full px-3.5">
                    <div class="w-[15%] h-full flex flex-row">
                        <img class="w-full h-full" :src="logo" alt="" />
                    </div>
                    <p class="mt-4 w-[40%]">
                        Seu estilo começa pelo seu pulso.
                    </p>
                    <div
                        class="flex justify-between w-[40%] mt-4 gap-x-1 h-full">
                        <div
                            v-for="item in socialNetworksLogos"
                            :key="item.nome"
                            class="max-md:w-8 mx-1">
                            <img
                                :src="item.nome"
                                :alt="`logo do ${item.nome}`" />
                        </div>
                    </div>
                </div>
                <div
                    id="navigation-footer"
                    class="grid grid-cols-3 gap-3 text-gray-700 w-[80%] mt-6">
                    <div class="flex flex-col gap-y-1">
                        <p class="text-sm md:text-lg font-semibold text-black">
                            Info
                        </p>
                        <div
                            class="md:text-sm text-xs whitespace-nowrap flex flex-col">
                            <router-link :to="PATH.ABOUT_US"
                                >Sobre nós</router-link
                            >
                            <router-link :to="PATH.DELIVERY"
                                >Entrega</router-link
                            >
                            <p>Blog</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-1">
                        <p class="text-sm md:text-lg font-semibold text-black">
                            Empresa
                        </p>
                        <div
                            class="md:text-sm text-xs whitespace-nowrap flex flex-col">
                            <p>Comunidade</p>
                            <router-link :to="PATH.CARRER"
                                >Carreira</router-link
                            >
                            <router-link :to="PATH.OUR_HISTORY"
                                >Nossa história</router-link
                            >
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-1">
                        <p class="text-sm md:text-lg font-semibold text-black">
                            Navegação
                        </p>
                        <div
                            class="md:text-sm text-xs whitespace-nowrap flex flex-col">
                            <router-link :to="PATH.HOME">Home</router-link>
                            <router-link :to="PATH.PRODUCTS.ROOT"
                                >Produtos</router-link
                            >
                            <p>Contato</p>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-xs text-gray-600 text-center w-full mt-20">
                &copy; 2025 ShopWatch - Todos os direitos reservados
            </p>
            <p class="text-xs text-gray-600">
                Made with 🧠 by
                <a
                    href="https://www.linkedin.com/in/leonardo-bern/"
                    class="text-blue-500"
                    >Leonardo Bernardo</a
                >
            </p>
        </footer>
    </div>
</template>
