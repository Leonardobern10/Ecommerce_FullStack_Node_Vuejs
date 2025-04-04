<script setup>
import { defineProps, defineEmits, computed } from 'vue';
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
        class="flex flex-row justify-between items-center gap-4 h-40 w-full min-w-[70%] border-b border-black my-4">
        <!-- Imagem -->
        <div class="w-32 h-32">
            <img
                :src="imageUrl"
                :alt="'foto de ' + name"
                class="w-full h-full" />
        </div>

        <!-- Informações do produto -->
        <div
            class="flex flex-col justify-between items-center gap-8 text-neutral-200/50">
            <p class="text-[1.2rem] font-bold">{{ name }}</p>
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

        <!-- Preço -->
        <div class="leading-[1.2rem] text-center text-neutral-200/50">
            <p class="text-[1.3rem] font-bold">R$ {{ totalPrice }}</p>
            <p class="text-[0.8rem] opacity-70">
                ou R$ {{ calculatePixDiscount(price) }} no pix
            </p>
        </div>
    </div>
</template>
