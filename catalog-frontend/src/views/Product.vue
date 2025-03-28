<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useProductStore } from '@/store/userProductStore';
import { useAuthStore } from '@/store/useAuthStore.js';
import Button from '@/components/Button.vue';
import { searchProduct } from '@/services/productService';
import { addOnCart } from '@/services/cartService';

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const product = ref({});
const useAuth = useAuthStore();
const toast = useToast();

onBeforeMount(async () => await searchProduct(product, route, productStore));

const addToCart = async (product) =>
    await addOnCart(product, router, useAuth.authenticated, toast);
</script>

<template>
    <div
        class="w-full h-full py-12 flex flex-col md:flex-row justify-around items-center gap-5 bg-white/80">
        <div
            class="min-w-[15rem] max-w-[20rem] h-80 flex justify-center items-center">
            <img
                :src="product.imageUrl"
                alt=""
                class="w-full h-full object-cover" />
        </div>

        <div
            class="w-full max-md:w-[90%] md:w-1/3 flex flex-col justify-between items-center text-center md:text-left">
            <h1 class="text-2xl font-bold">{{ product.name }}</h1>
            <p class="text-gray-600 text-base mt-2">
                {{ product.description }}
            </p>

            <div
                class="w-full max-md:w-[90%] flex flex-row justify-between items-center mt-4">
                <p class="text-3xl font-semibold text-xanadu">
                    R$ <strong>{{ Number(product.price).toFixed(2) }}</strong>
                </p>
                <p class="text-gray-700">Quantidade: {{ product.stock }}</p>
            </div>

            <Button
                @click="addToCart(product)"
                button-name="Adicionar ao carrinho"
                class="mt-6 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300" />
        </div>
    </div>
</template>
