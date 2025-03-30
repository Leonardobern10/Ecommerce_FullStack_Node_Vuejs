<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['modelValue', 'type', 'placeholder']);
const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        class="block w-full mb-2 p-3 text-base border-2 border-gray-500/50 rounded-xl focus:bg-xanadu/50 focus:outline-none focus:border-x-4"
        required />
</template>
