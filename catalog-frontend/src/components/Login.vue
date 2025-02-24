<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authState } from '@/store/useAuth.js';

const router = useRouter();
const email = ref('');
const password = ref('');

async function login() {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/auth/login',
            { email: email.value, password: password.value },
        );

        const token = response.data.token;
        if (!token) throw new Error('Token inválido');

        localStorage.setItem('token', token);
        authState.login(token); // Corrigido: agora passa o token corretamente

        router.push('/api/products'); // Garante que o caminho é correto
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Login falhou! Verifique suas credenciais.');
    }
}
</script>

<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input
                v-model="password"
                type="password"
                placeholder="Senha"
                required
            />
            <button type="submit">Entrar</button>
        </form>
    </div>
</template>

<style scoped>
form {
    max-width: 400px;
    margin: auto;
}
input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
}
button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: blue;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
}
</style>
