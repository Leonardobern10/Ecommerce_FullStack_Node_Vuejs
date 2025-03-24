<script setup>
import { defineProps } from 'vue';

const props = defineProps({ icon: String, title: String, content: String });
</script>

<template>
    <div
        class="flex flex-col md:flex-row items-center justify-between w-[50%] md:h-[5rem] bg-black md:p-0 lg:w-[70%] border-2 md:border-none rounded-2xl p-2">
        <div class="w-[50%] h-15 md:w-[40%] mr-4 lg:mr-0">
            <img :src="icon" :alt="`Ícone para ${icon}`" />
        </div>
        <div
            class="flex flex-col items-center gap-y-3 text-gray-100/70 h-full w-full">
            <p class="text-2sm w-full font-bold">
                {{ title }}
            </p>
            <p class="text-xs">
                {{ content }}
            </p>
        </div>
    </div>
</template>
