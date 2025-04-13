<script setup>
import { ref, defineEmits, onBeforeMount } from 'vue';
import { forgotPassword } from '@/services/passwordService';
import Button from './Button.vue';
import { useToast } from 'vue-toastification';

const emit = defineEmits(['hideHeader']);
const toast = useToast();
const email = ref('');

const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o recarregamento da página
    await forgotPassword(toast, email.value);
};
const emitHideHeader = () => emit('hideHeader');

onBeforeMount(() => emitHideHeader());
</script>

<template>
    <div
        class="h-screen flex flex-row max-md:flex-col-reverse justify-center gap-x-10 p-8">
        <div
            class="border-2 rounded-container bg-neutral-300/50 w-1/2 max-md:w-full h-2/3 flex flex-col justify-evenly items-center text-center">
            <h1 class="text-3xl max-xl:text-2xl max-md:text-2xl">
                Esqueceu sua senha?
            </h1>
            <p class="text-lg max-lg:text-sm max-md:text-sm w-4/5">
                Para redefinir, informe seu e-mail no campo abaixo. Enviaremos
                um link para que possa alterar sua senha.
            </p>
            <form
                class="flex flex-row items-center gap-x-2 max-md:p-4"
                @submit="handleSubmit">
                <label for="email">Email: </label>
                <input
                    class="h-8 border-2 rounded-lg"
                    type="text"
                    v-model="email" />
                <button class="border-2 rounded-lg p-1" type="submit">
                    Enviar
                </button>
            </form>
        </div>
        <div class="w-1/2 max-md:h-1/2 max-md:w-full">
            <img src="../assets//images//help_password.svg" alt="" />
        </div>
    </div>
</template>
