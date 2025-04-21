<script setup>
import { computed } from 'vue';
import Button from './Button.vue';
import {
    calculatePixDiscount,
    viewFinancedValue,
} from '@/services/productService';

const props = defineProps({ product: Object });
const emit = defineEmits(['acessProduct', 'addToCart']);
const pixPrice = computed(() => calculatePixDiscount(props.product.price));
const financedPrice = computed(() => viewFinancedValue(props.product.price));

const acess = () => emit('acessProduct');
const add = () => emit('addToCart');
</script>

<template>
    <div
        id="view-product-offer"
        @click="acess"
        class="flex flex-col items-center gap-y-8 max-md:gap-y-4 p-4 max-md:px-2 w-full h-full hover:cursor-pointer hover:text-xanadu/90 text-white/90">
        <div class="w-50 max-md:w-30 h-50 max-md:h-30">
            <img
                class="bg-white product-shadow rounded-2xl hover:scale-105"
                :src="product.imageUrl"
                :alt="`imagem do ${product.name}`" />
        </div>
        <div class="max-md:text-xs max-md:px-4">
            <p class="font-bold max-md:text-sm">{{ product.name }}</p>
            <div id="info-numbers">
                <p class="p-price">
                    <strong>
                        R$
                        <span class="text-xl max-md:text-sm font-bold">{{
                            pixPrice
                        }}</span></strong
                    >
                    no pix
                </p>
                <p class="p-price">
                    {{ financedPrice }}
                </p>
            </div>
        </div>
        <Button
            id="button-add-product"
            @click.stop="add"
            button-name="Adicionar ao carrinho" />
    </div>
</template>
