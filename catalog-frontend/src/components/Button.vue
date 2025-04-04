<script setup>
import { defineProps } from 'vue';

const props = defineProps({ buttonName: String });
</script>

<template>
    <button
        class="font-lato px-4 py-2 bg-black/50 text-white rounded-md hover:bg-black/50 hover:shadow-4xl hover:shadow-black hover:cursor-pointer hover:text-xanadu transition">
        {{ buttonName }}
    </button>
</template>
