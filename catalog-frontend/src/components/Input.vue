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
        required />
</template>

<style scoped>
input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 0.7rem;
    font-size: 16px;
    border: 2px solid var(--xanadu);
    border-radius: 15px;
}

input:focus {
    background-color: #d9d9d9;
    border: none;
    border-left-style: ridge;
    border-right-style: ridge;
}
</style>
