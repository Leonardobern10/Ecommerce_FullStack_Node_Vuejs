<script setup>
import { computed } from 'vue';
import { calculatePixDiscount } from '@/services/productService';
import Button from './Button.vue';

const props = defineProps({
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String,
});

const emit = defineEmits(['update-quantity', 'remove-item']);

const updateQuantity = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
        emit('update-quantity', newQuantity);
    }
};

const totalPrice = computed(() => (props.price * props.quantity).toFixed(2));
</script>
<template>
    <div
        class="flex flex-row max-lg:flex-col justify-evenly items-center gap-4 h-full w-full min-w-[70%] my-4">
        <!-- Imagem -->
        <div class="w-50 h-50 max-md:w-30 max-md:h-25">
            <img
                :src="imageUrl"
                :alt="'foto de ' + name"
                class="w-full h-full rounded-container bg-white" />
        </div>

        <!-- Informações do produto -->
        <div
            class="flex flex-col h-full justify-between max-lg:text-center items-center gap-8 text-neutral-200/50">
            <div>
                <p class="text-[1.2rem] max-md:text-sm font-bold">
                    {{ name }}
                </p>
                <p class="text-xs">Em estoque</p>
            </div>
            <div class="leading-[1.2rem] text-center text-neutral-200/50">
                <p class="font-bold max-md:text-sm">
                    R$ {{ calculatePixDiscount(price) }}
                    <span class="text-sm">no pix</span>
                </p>
                <p class="opacity-70 text-xs">
                    ou R$ {{ totalPrice }} em até 10x de
                    {{ Number(totalPrice / 10).toFixed(2) }}
                </p>
            </div>
            <div class="flex flex-row justify-evenly items-center gap-2">
                <Button @click="$emit('remove-item')" button-name="Excluir" />
                <input
                    type="number"
                    :value="quantity"
                    min="1"
                    @input="updateQuantity"
                    class="h-8 w-[20%] text-center bg-black/50 outline-none border-none rounded text-white" />
            </div>
        </div>
    </div>
</template>
