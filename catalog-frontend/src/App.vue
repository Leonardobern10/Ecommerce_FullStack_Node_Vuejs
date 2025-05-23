<script setup>
import { useAuthStore } from './store/useAuthStore';
import { onMounted, onUnmounted, ref, computed } from 'vue';
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
import Link from './components/Link.vue';
import MobileMenu from './components/MobileMenu.vue';
import NavBarDesktop from './components/NavBarDesktop.vue';
import { useToast } from 'vue-toastification';
import { useHeaderStore } from './store/useHeaderStore';

let permitted = ref(false);
const userIsLogged = computed(() => useAuth.authenticated);
const useAuth = useAuthStore();
const router = useRouter();
const screenWidth = ref(window.innerWidth);
const socialNetworksLogos = [
    { nome: logoFacebook },
    { nome: logoInstagram },
    { nome: logoTwitter },
];
const toast = useToast();
const useHeader = useHeaderStore();
const updateScreenSize = () => (screenWidth.value = window.innerWidth);

// Função executada quando o botao [Logout] é pressionado.
const logout = async () => signOut(userIsLogged, useAuth, router, toast);
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
        id="app"
        :class="{
            'grid grid-rows-[4rem_auto_auto] grid-cols-1 justify-items-center items-center h-full':
                useHeader.header,
            'flex flex-col items-center': !useHeader.header,
        }">
        <header
            v-show="useHeader.header"
            id="header"
            class="rounded-container max-md:relative w-[95vw] flex justify-between items-center p-6 h-5 gap-x-22 font-lato z-100">
            <div class="max-md:w-[20%] h-[2rem]">
                <router-link :to="PATH.HOME">
                    <img :src="logo" alt="" class="w-full h-full" />
                </router-link>
            </div>
            <NavBarDesktop
                v-if="screenWidth > 768"
                :auth="userIsLogged"
                :permitted="permitted"
                @logout="logout" />
            <MobileMenu
                :auth="userIsLogged"
                :permitted="permitted"
                @logout="logout"
                v-else />
        </header>

        <main
            class="flex flex-col justify-between items-center h-full min-h-screen w-full font-andika">
            <router-view />
        </main>

        <footer
            class="font-lato w-full flex flex-col items-center justify-between bg-black/50 p-8"
            v-show="useHeader.header">
            <div
                class="w-11/12 h-full flex flex-col sm:flex-row justify-between items-center">
                <div class="flex flex-col items-left gap-y-1 w-full px-3.5">
                    <div class="w-[15%] h-full flex flex-row">
                        <img class="w-full h-full" :src="logo" alt="" />
                    </div>
                    <p class="mt-4 w-[40%]">
                        Seu estilo começa pelo seu pulso.
                    </p>
                    <div class="flex justify-start gap-x-2 w-[80%] mt-4 h-full">
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
                    <div class="footer-container-options">
                        <p class="footer-title-options">Info</p>
                        <div class="footer-options">
                            <Link :to="PATH.ABOUT_US" name="Sobre nós" />
                            <Link :to="PATH.DELIVERY" name="Entrega" />
                            <Link :to="PATH.HOME" name="Blog" />
                        </div>
                    </div>
                    <div class="footer-container-options">
                        <p class="footer-title-options">Empresa</p>
                        <div class="footer-options">
                            <Link :to="PATH.HOME" name="Comunidade" />
                            <Link :to="PATH.CARRER" name="Carreira" />
                            <Link
                                :to="PATH.OUR_HISTORY"
                                name="Nossa história" />
                        </div>
                    </div>
                    <div class="footer-container-options">
                        <p class="footer-title-options">Navegação</p>
                        <div class="footer-options">
                            <Link :to="PATH.HOME" name="Home" />
                            <Link :to="PATH.PRODUCTS.ROOT" name="Produtos" />
                            <Link :to="PATH.HOME" name="Contato" />
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

<style scoped>
#app {
    background: linear-gradient(-45deg, #12140faf, #191a19, #444444, #949494);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
