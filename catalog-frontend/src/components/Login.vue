<script setup>
import { ref, defineEmits, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/store/useAuthStore.js';
import signIn from '@/services/loginService';
import Input from './Input.vue';
import Button from './Button.vue';
import LOGINIMAGES from '@/constants/LOGINIMAGES';
import PATH from '@/constants/PATH';

const currentIndex = ref(0);
const currentImage = computed(() => LOGINIMAGES[currentIndex.value]);
const fading = ref(false);
const transitionTime = 800; // Tempo da transição de fade (1.5s)
const intervalTime = 7000; // Tempo de exibição de cada imagem (7s)

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const router = useRouter();
const auth = useAuthStore();
const toast = useToast();

const emit = defineEmits(['hideHeader']);
const emitHideHeader = () => emit('hideHeader');

// Alternar imagens automaticamente
const changeImage = () => {
    fading.value = true;

    setTimeout(() => {
        currentIndex.value = (currentIndex.value + 1) % LOGINIMAGES.length;
        fading.value = false; // Remove o efeito após a troca
    }, transitionTime); // Tempo igual ao da animação CSS
};
// Método para login utilizando os dados do formulário
const login = async () =>
    await signIn(isLoading, email, password, auth, router, toast);

onMounted(() => {
    emitHideHeader();
    setInterval(changeImage, intervalTime);
});
</script>

<template>
    <div class="flex flex-row w-full h-screen font-lato">
        <div
            :style="{ backgroundImage: `url(${currentImage})` }"
            class="flex flex-col justify-between items-center w-[50vw] h-50vh p-8 rounded-r-4xl bg-center bg-cover bg-no-repeat text-white transition-opacity duration-[1500ms] ease-in-out"
            :class="{ 'opacity-0': fading, 'opacity-100': !fading }">
            <div class="flex flex-row justify-end w-[90%]">
                <router-link :to="PATH.HOME">
                    <Button button-name="Voltar à página inicial" />
                </router-link>
            </div>

            <div class="flex flex-row justify-between items-center w-70">
                <div class="option bg-gray-400/90"></div>
                <div class="option bg-black/50"></div>
                <div class="option bg-gray-400/90"></div>
            </div>
        </div>
        <div
            class="flex flex-col justify-center items-center h-full gap-y-8 w-[45vw] text-white">
            <h2 class="text-4xl font-medium">Entre na sua conta</h2>
            <p class="font-light">
                Ainda não é cadastrado?
                <router-link :to="PATH.REGISTER" class="text-xanadu"
                    >Registrar</router-link
                >
            </p>
            <form
                @submit.prevent="login"
                class="flex flex-col items-center max-w-md mx-auto py-4">
                <div class="mb-8 flex flex-col items-center">
                    <Input v-model="email" type="email" placeholder="Email" />
                    <Input
                        v-model="password"
                        type="password"
                        placeholder="Senha" />
                    <router-link
                        :to="PATH.PASSWORD.HELP"
                        class="text-xanadu text-center font-light"
                        >Esqueceu sua senha?</router-link
                    >
                </div>
                <Button
                    type="submit"
                    :disabled="isLoading"
                    :button-name="isLoading ? 'Entrando...' : 'Entrar'" />
            </form>
        </div>
    </div>
</template>

<style scoped>
.option {
    width: 50px;
    height: 5px;
    border-radius: 10px;
}
</style>
