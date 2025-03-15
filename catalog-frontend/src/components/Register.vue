<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from './Input.vue';
import signUp from '@/services/registerService';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => await signUp(name, email, password, router, alert);
</script>

<template>
    <div>
        <h2>Cadastrar</h2>
        <form @submit.prevent="register">
            <Input v-model="name" type="text" placeholder="Nome" />
            <Input v-model="email" type="email" placeholder="Email" required />
            <Input
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
