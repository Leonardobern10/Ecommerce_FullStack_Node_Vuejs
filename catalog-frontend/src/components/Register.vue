<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

async function register() {
    try {
        await axios.post('http://localhost:5000/api/auth/register', {
            name: name.value,
            email: email.value,
            password: password.value,
        });
        router.push('/api/auth/login');
    } catch (error) {
        alert('Error ao registrar');
        console.log(error);
    }
}
</script>

<template>
    <div>
        <h2>Cadastrar</h2>
        <form @submit.prevent="register">
            <input v-model="name" type="text" placeholder="Nome" required />
            <input v-model="email" type="email" placeholder="Email" required />
            <input
                v-model="password"
                type="password"
                placeholder="Senha"
                required
            />
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>

<style scoped>
/* Estilos para o formulário de registro */
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
    background-color: green;
    color: white;
    border: none;
    font-size: 16px;
}
</style>
