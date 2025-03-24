<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from './Input.vue';
import signUp from '@/services/registerService';
import Button from './Button.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => await signUp(name, email, password, router, alert);
</script>

<template>
    <div class="flex flex-col justify-around items-center mt-8">
        <h2 class="text-2xl font-bold">Cadastrar</h2>
        <form
            @submit.prevent="register"
            class="flex flex-col items-center max-w-md py-8">
            <Input v-model="name" type="text" placeholder="Nome" />
            <Input v-model="email" type="email" placeholder="Email" required />
            <Input
                v-model="password"
                type="password"
                placeholder="Senha"
                required />
            <Button type="submit" button-name="Registar" />
        </form>
    </div>
</template>
