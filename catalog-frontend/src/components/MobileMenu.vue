<script setup>
import { ref } from 'vue';
import Link from './Link.vue';
import Button from './Button.vue';
import PATH from '@/constants/PATH';
import mobileMenuIcon from '@/assets/icons/menu_icon.svg';

const props = defineProps({ auth: Boolean, permitted: Boolean });
const emit = defineEmits(['logout']);

// Menu fechado ou aberto
const isOpen = ref(false);

// Fechar o menu quando clicar fora
const dropdownRef = ref(null);
document.addEventListener('click', (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false;
    }
});
// Evento de logout
const emitLogout = () => emit('logout');
// Controla a exibição
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <div class="relative inline-block" ref="dropdownRef">
        <!-- Botão do dropdown -->
        <button @click="toggleDropdown" class="w-[30px] h-[30px]">
            <img :src="mobileMenuIcon" alt="" class="h-2 w-5" />
        </button>

        <!-- Itens do dropdown -->
        <transition
            enter-active-class="transition transform duration-200 ease-out scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition transform duration-300 ease scale-100 opacity-100"
            leave-to-class="scale-70 opacity-0">
            <div
                v-if="isOpen"
                class="absolute flex flex-col gap-y-6 w-[50vw] h-screen bg-xanadu top-[-10%] right-[-70%] shadow-lg rounded-lg text-2xl p-8">
                <div class="flex flex-col gap-y-6 mt-8">
                    <Link :to="PATH.HOME" name="Home" />
                    <Link :to="PATH.PRODUCTS.ROOT" name="Produtos" />
                    <Link v-if="auth" :to="PATH.CART" name="Carrinho" />
                    <Link v-if="auth" :to="PATH.ORDERS" name="Meus pedidos" />
                    <Link
                        v-if="permitted && auth"
                        :to="PATH.ADMIN"
                        name="Administração" />
                </div>

                <div id="container-login" class="flex flex-col gap-y-6">
                    <Link v-if="!auth" :to="PATH.LOGIN" name="Login" />
                    <Link v-if="!auth" :to="PATH.REGISTER" name="Registrar" />
                    <Button
                        v-if="auth"
                        id="btn-logout"
                        @click="emitLogout"
                        button-name="Sair">
                    </Button>
                </div>
            </div>
        </transition>
    </div>
</template>
