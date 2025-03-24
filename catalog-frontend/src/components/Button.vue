<script setup>
import { defineProps } from 'vue';

const props = defineProps({ buttonName: String });
</script>

<template>
    <button
        class="px-4 py-2 bg-xanadu text-white rounded-md hover:bg-black hover:cursor-pointer hover:text-xanadu transition">
        {{ buttonName }}
    </button>
</template>
