<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    content: String,
    image: String,
    name: String,
    rate: Number,
});
</script>

<template>
    <div
        class="bg-black/50 text-gray-200/80 w-[90%] rounded-container flex flex-row-reverse p-8 justify-between items-center">
        <div class="text-sm w-[70%] text-justify">
            <h4>"{{ content }}"</h4>
            <!-- <p><strong>{{ rate }}</strong></p> -->
        </div>
        <div class="w-[20%]">
            <img :src="image" alt="" />
            <p class="text-xs pt-4 text-center">{{ name }}</p>
        </div>
    </div>
</template>
