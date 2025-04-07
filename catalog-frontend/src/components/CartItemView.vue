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
        class="flex flex-row max-lg:flex-col justify-evenly items-center gap-4 h-full w-full min-w-[70%] border-b border-black my-4">
        <!-- Imagem -->
        <div class="w-50 h-50">
            <img
                :src="imageUrl"
                :alt="'foto de ' + name"
                class="w-full h-full rounded-4xl" />
        </div>

        <!-- Informações do produto -->
        <div
            class="flex flex-col h-full justify-between max-lg:text-center items-center gap-8 text-neutral-200/50">
            <div>
                <p class="text-[1.2rem] font-bold">
                    {{ name }}
                </p>
                <p class="text-sm">Em estoque</p>
            </div>
            <div class="leading-[1.2rem] text-center text-neutral-200/50">
                <p class="text-[1.3rem] font-bold">
                    R$ {{ calculatePixDiscount(price) }}
                    <span class="text-sm">no pix</span>
                </p>
                <p class="text-[0.8rem] opacity-70">
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
