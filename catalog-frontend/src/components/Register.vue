<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const URL_REGISTER = 'http://localhost:5000/api/auth/register';
const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

async function register() {
    try {
        await axios.post(URL_REGISTER, {
            name: name.value,
            email: email.value,
            password: password.value,
        });
        router.push('/login');
    } catch (error) {
        alert('Erro ao registrar');
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
                required />
            <button type="submit">Registrar</button>
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
    background-color: green;
    color: white;
    border: none;
    font-size: 16px;
}
</style>
