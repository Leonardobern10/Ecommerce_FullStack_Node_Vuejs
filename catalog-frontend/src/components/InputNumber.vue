<script setup>
import { ref } from 'vue';

const quantity = ref(1);

const increment = () => quantity.value++;
const decrement = () => {
    if (quantity.value > 1) quantity.value--;
};
</script>

<template>
    <div class="flex items-center gap-2">
        <!-- Botão de menos -->
        <button
            @click="decrement"
            class="bg-red-500 text-white w-8 h-8 rounded hover:bg-red-600 transition">
            –
        </button>

        <!-- Input -->
        <input
            type="number"
            :value="quantity"
            readonly
            class="w-16 text-center border border-gray-300 rounded text-gray-800" />

        <!-- Botão de mais -->
        <button
            @click="increment"
            class="bg-green-500 text-white w-8 h-8 rounded hover:bg-green-600 transition">
            +
        </button>
    </div>
</template>
