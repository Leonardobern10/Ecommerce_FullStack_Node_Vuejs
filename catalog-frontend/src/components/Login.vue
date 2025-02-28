<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authState } from '@/store/useAuth.js';

// Direcionador de rotas
const router = useRouter();
const email = ref('');
const password = ref('');

// Metodo que cuida do login
async function login() {
    try {
        // Faz um POST para uma URI passando email e senha
        const response = await axios.post(
            'http://localhost:5000/api/auth/login',
            { email: email.value, password: password.value },
        );

        // Recebe e armazena o token de resposta

        const token = response.data.token;

        // Se não vou token, lança um erro
        if (!token) throw new Error('Token inválido');

        // Insere
        localStorage.setItem('token', token);
        authState.login(token); // Corrigido: agora passa o token corretamente

        router.push('/products'); // Garante que o caminho é correto
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
