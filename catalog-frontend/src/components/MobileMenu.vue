<script setup>
import { ref } from 'vue';
import Link from './Link.vue';
import Button from './Button.vue';
import PATH from '@/constants/PATH';
import mobileMenuIcon from '@/assets/icons/menu_icon.svg';
import { NButton, NDrawer, NDrawerContent } from 'naive-ui';

const props = defineProps({ auth: Boolean, permitted: Boolean });
const emit = defineEmits(['logout']);

// Menu fechado ou aberto
const isOpen = ref(false);

// Evento de logout
const emitLogout = () => {
    emit('logout');
};

const logoutAndExit = () => {
    emitLogout();
    toggleDropdown();
};

// Controla a exibição

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <div ref="dropdownRef">
        <!-- Botão do dropdown -->
        <n-button @click="toggleDropdown" quaternary round>
            <img :src="mobileMenuIcon" alt="" class="h-2 w-5" />
        </n-button>

        <n-drawer v-model:show="isOpen">
            <n-drawer-content
                title="Menu"
                closeable
                color="#000"
                class="bg-black/50 flex flex-col border-2">
                <div class="flex flex-col gap-y-4 mt-8">
                    <Link
                        @hide-menu="toggleDropdown"
                        :to="PATH.HOME"
                        name="Home" />
                    <Link
                        @hide-menu="toggleDropdown"
                        :to="PATH.PRODUCTS.ROOT"
                        name="Produtos" />
                    <Link
                        @hide-menu="toggleDropdown"
                        v-if="auth"
                        :to="PATH.CART"
                        name="Carrinho" />
                    <Link
                        @hide-menu="toggleDropdown"
                        v-if="auth"
                        :to="PATH.ORDERS"
                        name="Meus pedidos" />
                    <Link
                        @hide-menu="toggleDropdown"
                        v-if="permitted && auth"
                        :to="PATH.ADMIN"
                        name="Administração" />
                </div>

                <div
                    id="container-login"
                    class="flex flex-row justify-evenly mt-12">
                    <Link
                        @hide-menu="toggleDropdown"
                        v-if="!auth"
                        :to="PATH.LOGIN"
                        name="Login" />

                    <Link
                        @hide-menu="toggleDropdown"
                        v-if="!auth"
                        :to="PATH.REGISTER"
                        name="Registrar" />
                    <Button
                        v-if="auth"
                        id="btn-logout"
                        @click="logoutAndExit"
                        button-name="Sair">
                    </Button>
                </div>
            </n-drawer-content>
        </n-drawer>
    </div>
</template>
