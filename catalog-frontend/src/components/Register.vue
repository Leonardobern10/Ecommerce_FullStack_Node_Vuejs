<script setup>
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Input from './Input.vue';
import Button from './Button.vue';
import signUp from '@/services/registerService';
import { registerImages } from '@/constants/REGISTERIMAGES';
import PATH from '@/constants/PATH';
/* Importar o useHeaderStore */
import { useHeaderStore } from '@/store/useHeaderStore';

const useHeader = useHeaderStore();
const currentIndex = ref(0);
const currentImage = computed(() => registerImages[currentIndex.value]);
const fading = ref(false);
const transitionTime = 800; // Tempo da transição de fade (1.5s)
const intervalTime = 7000; // Tempo de exibição de cada imagem (7s)

const name = ref('');
const email = ref('');
const password = ref('');
const passwordCheck = ref('');
const toast = useToast();
const router = useRouter();

const changeImage = () => {
    fading.value = true;

    setTimeout(() => {
        currentIndex.value = (currentIndex.value + 1) % registerImages.length;
        fading.value = false; // Remove o efeito após a troca
    }, transitionTime); // Tempo igual ao da animação CSS
};

const register = async () =>
    await signUp(name, email, password, passwordCheck, router, toast);

onMounted(() => {
    useHeader.hideHeader();
    setInterval(changeImage, intervalTime);
});

onUnmounted(() => useHeader.showHeader());
</script>

<template>
    <div
        class="flex flex-row max-ml:flex-col-reverse max-md:gap-y-4 w-full h-screen font-lato">
        <div
            class="flex flex-col justify-center items-center h-full max-md:h-[70%] gap-y-8 max-md:gap-y-2 w-[50vw] max-md:w-screen text-white p-2">
            <h2 class="text-2xl max-md:text-xl font-bold">Crie sua conta</h2>
            <p class="font-light">
                Já tem conta?
                <router-link :to="PATH.LOGIN" class="text-xanadu"
                    >Entrar</router-link
                >
            </p>
            <form
                @submit.prevent="register"
                class="flex flex-col items-center max-w-md mx-auto py-4">
                <div class="flex flex-row justify-between items-center gap-x-4">
                    <Input v-model="name" type="text" placeholder="Nome" />
                    <Input
                        v-model="email"
                        type="email"
                        placeholder="Email"
                        required />
                </div>
                <Input
                    v-model="password"
                    type="password"
                    placeholder="Senha"
                    required />
                <Input
                    v-model="passwordCheck"
                    type="password"
                    placeholder="Confirme sua senha"
                    required />
                <Button
                    class="mt-8 w-full"
                    type="submit"
                    button-name="Criar conta" />
            </form>
        </div>
        <div
            :style="{ backgroundImage: `url(${currentImage})` }"
            class="flex flex-col justify-between items-center w-[50vw] max-md:w-screen h-50vh max-md:h-full p-8 max-md:p-2 rounded-l-4xl max-md:rounded-l-none max-md:rounded-b-4xl bg-center bg-cover bg-no-repeat text-white transition-opacity duration-[1500ms] ease-in-out"
            :class="{ 'opacity-0': fading, 'opacity-100': !fading }">
            <div class="flex flex-row justify-start w-[90%]">
                <router-link :to="PATH.HOME">
                    <Button button-name="Voltar à página inicial" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.shadow-charge {
    box-shadow: -10px 5px 20px #000;
}
</style>
