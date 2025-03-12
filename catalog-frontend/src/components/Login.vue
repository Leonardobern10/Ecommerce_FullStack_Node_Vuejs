<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/useAuthStore.js';
import { URL } from '@/constants/URL';
import PATH from '@/constants/PATH';
import MESSAGE from '@/constants/MESSAGE';
import Input from './Input.vue';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const router = useRouter();
const auth = useAuthStore();

// Faz login utilizando os dados do formulário
async function login() {
    isLoading.value = true;

    try {
        await axios.post(
            URL.LOGIN,
            { email: email.value, password: password.value },
            { withCredentials: true },
        );
        auth.authenticated = true;
        auth.checkAuthStatus();
        router.push(PATH.PRODUCTS.ROOT);
    } catch (error) {
        console.error('Erro no login:', error);
        alert(MESSAGE.ERROR.LOGIN.CHECK_CREDENTIALS);
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div id="view">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <Input v-model="email" type="email" placeholder="Email" />
            <Input v-model="password" type="password" placeholder="Senha" />
            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Entrando...' : 'Entrar' }}
            </button>
        </form>
    </div>
</template>

<style scoped>
#view {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 400px;
    margin: auto;

    padding: 1rem 0;
}
button {
    width: fit-content;
    border: 2px solid #d9d9d9;
    border-radius: 5px;
    padding: 0.3rem;
    background-color: var(--green-spring);
    color: #fff;
    font-size: 1rem;
    font-weight: 200;
    letter-spacing: 0.5px;
    margin-top: 2rem;
    transition:
        background-color 0.3s ease-in,
        border 0.3s ease-in;
}

button:hover {
    cursor: pointer;
    background-color: var(--xanadu);
    border: 1px solid #fff;
}
</style>
