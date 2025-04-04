<script setup>
import { defineProps, onMounted, onUnmounted, ref } from 'vue';
const props = defineProps({
    content: String,
    image: String,
    name: String,
    rate: Number,
});

let screenWidth = ref(window.innerWidth);

const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
};

onMounted(() => window.addEventListener('resize', updateScreenSize));
onUnmounted(() => window.removeEventListener('resize', updateScreenSize));
</script>

<template>
    <div
        class="bg-black/50 text-gray-200/80 w-[90%] rounded-container flex flex-row-reverse max-ml:flex-col p-8 justify-between items-center max-ml:mb-8">
        <div
            class="text-sm max-ml:text-xs w-[70%] max-ml:w-[90%] max-ml:pb-2 text-justify">
            <h4>"{{ content }}"</h4>
            <!-- <p><strong>{{ rate }}</strong></p> -->
        </div>
        <div
            class="w-[20%] max-ml:w-[90%] max-ml:h-10 max-ml:flex max-ml:flex-row-reverse max-ml:pt-3 max-ml:justify-between max-ml:items-center">
            <img
                v-if="screenWidth > 426"
                :src="image"
                alt="icone para usuario"
                class="self-start" />
            <p
                class="text-xs pt-4 max-ml:p-0 text-center max-ml:whitespace-nowrap">
                {{ name }}
            </p>
        </div>
    </div>
</template>
