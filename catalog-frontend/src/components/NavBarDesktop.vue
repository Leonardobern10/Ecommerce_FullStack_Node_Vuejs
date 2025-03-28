<script setup>
import { defineProps, defineEmits } from 'vue';
import Link from './Link.vue';
import Button from './Button.vue';
import PATH from '@/constants/PATH';

const props = defineProps({ auth: Boolean, permitted: Boolean });
const emit = defineEmits(['logout']);

const emitLogout = () => emit('logout');
</script>

<template>
    <nav class="flex flex-row justify-between items-center w-[90%] text-lg">
        <div class="flex flex-row gap-x-12">
            <Link :to="PATH.HOME" name="Home" />
            <Link :to="PATH.PRODUCTS.ROOT" name="Produtos" />
            <Link v-if="auth" :to="PATH.CART" name="Carrinho" />
            <Link v-if="auth" :to="PATH.ORDERS" name="Meus pedidos" />
            <Link
                v-if="permitted && auth"
                :to="PATH.ADMIN"
                name="Administração" />
        </div>

        <div
            id="container-login"
            class="flex justify-end space-x-2 gap-x-3 w-[20%] min-w-fit">
            <Link v-if="!auth" :to="PATH.LOGIN" name="Login" />
            <Link v-if="!auth" :to="PATH.REGISTER" name="Registrar" />
            <Button
                v-if="auth"
                id="btn-logout"
                @click="emitLogout"
                button-name="Sair">
            </Button>
        </div>
    </nav>
</template>
