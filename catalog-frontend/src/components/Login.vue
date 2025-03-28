<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/store/useAuthStore.js';
import signIn from '@/services/loginService';
import Input from './Input.vue';
import Button from './Button.vue';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const router = useRouter();
const auth = useAuthStore();
const toast = useToast();

// Método para login utilizando os dados do formulário
const login = async () =>
    await signIn(isLoading, email, password, auth, router, toast);
</script>

<template>
    <div class="flex flex-col justify-around items-center mt-8">
        <h2 class="text-2xl font-bold">Login</h2>
        <form
            @submit.prevent="login"
            class="flex flex-col items-center max-w-md mx-auto py-4">
            <Input v-model="email" type="email" placeholder="Email" />
            <Input v-model="password" type="password" placeholder="Senha" />
            <Button
                type="submit"
                :disabled="isLoading"
                :button-name="isLoading ? 'Entrando...' : 'Entrar'" />
        </form>
    </div>
</template>
