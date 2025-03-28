<script setup>
import { defineProps } from 'vue';

const props = defineProps({ to: String, name: String });
</script>

<template>
    <router-link
        class="text-4sm whitespace-nowrap text-gray-200/50 font-light hover:text-shadow-xl hover:shadow-gray-200/50"
        :to="to"
        >{{ name }}
    </router-link>
</template>
