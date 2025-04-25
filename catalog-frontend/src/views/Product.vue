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
        class="w-full h-full min-h-screen flex flex-col lg:flex-row justify-around items-center">
        <div
            class="min-w-[15rem] max-w-[20rem] h-80 flex justify-center items-center max-lg:h-1/2 max-lg:w-1/2 max-md:mb-6 hover:scale-200">
            <img
                :src="product.imageUrl"
                alt=""
                class="w-full h-full object-cover bg-white rounded-container" />
        </div>

        <div
            class="w-full max-lg:w-[90%] lg:w-1/3 flex flex-col justify-between items-center text-center lg:text-left text-gray-400/80">
            <h1 class="text-2xl max-md:text-lg font-bold">
                {{ product.name }}
            </h1>
            <p class="text-base max-md:text-xs mt-2">
                {{ product.description }}
            </p>

            <div
                class="w-full max-md:w-[90%] flex flex-row justify-between items-center mt-4">
                <p
                    class="text-3xl max-md:text-lg font-semibold text-gray-100/50">
                    R$ <strong>{{ Number(product.price).toFixed(2) }}</strong>
                </p>
                <p class="text-gray-200 max-md:text-xs">
                    Quantidade: {{ product.stock }}
                </p>
            </div>

            <Button
                @click="addToCart(product)"
                button-name="Adicionar ao carrinho"
                class="mt-6 py-2 px-6 transition-all duration-300" />
        </div>
    </div>
</template>
