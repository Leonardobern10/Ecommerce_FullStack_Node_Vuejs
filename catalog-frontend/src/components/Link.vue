<script setup>
import { defineProps } from 'vue';

const props = defineProps({ to: String, name: String });
</script>

<template>
    <router-link
        class="text-4sm whitespace-nowrap text-black font-light hover:text-xanadu"
        :to="to"
        >{{ name }}
    </router-link>
</template>
