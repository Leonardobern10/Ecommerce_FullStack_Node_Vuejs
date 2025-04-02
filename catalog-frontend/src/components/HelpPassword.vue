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
    <div class="h-screen">
        <h3>
            Informe seu e-mail, enviaremos para você um link para que possa
            redefinir sua senha. Confira seu e-mail.
        </h3>
        <form @submit="handleSubmit">
            <label for="email">Email: </label>
            <input type="text" v-model="email" />
            <Button button-name="Redefinir senha" type="submit" />
        </form>
        <p>{{ email }}</p>
    </div>
</template>
