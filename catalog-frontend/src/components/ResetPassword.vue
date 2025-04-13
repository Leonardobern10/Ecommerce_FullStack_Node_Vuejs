<script setup>
import { ref } from 'vue';
import { resetPassword } from '@/services/passwordService';
import Button from './Button.vue';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const password = ref('');
const passwordCheck = ref('');

const handleSubmit = async () => {
    await resetPassword(
        toast,
        route.params.token,
        password.value,
        passwordCheck.value,
        router,
    );
};
</script>
<template>
    <div class="h-screen flex items-center justify-center bg-gray-100/50">
        <div class="w-96 bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-center mb-4">
                Defina sua nova senha
            </h3>
            <form @submit.prevent="handleSubmit">
                <input
                    type="password"
                    placeholder="Senha"
                    v-model="password"
                    class="w-full p-2 mb-2 border rounded" />
                <input
                    type="password"
                    placeholder="Confirme sua senha"
                    v-model="passwordCheck"
                    class="w-full p-2 mb-4 border rounded" />
                <Button button-name="Nova senha" type="submit" class="w-full" />
            </form>
        </div>
    </div>
</template>
