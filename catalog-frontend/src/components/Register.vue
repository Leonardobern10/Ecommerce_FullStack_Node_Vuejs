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
    <div id="view">
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
#view {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    margin-top: 2rem;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 400px;

    padding: 2rem 0;
}
button {
    width: fit-content;
    border: 2px solid #d9d9d9;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    background-color: var(--green-spring);
    color: #fff;
    font-size: 1rem;
    font-weight: 200;
    letter-spacing: 0.5px;
    margin-top: 4rem;
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
