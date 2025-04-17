<script setup>
const props = defineProps(['name', 'price', 'quantity']);
</script>

<template>
    <div>{{ name }} - R$ {{ price }} x {{ quantity }}</div>
</template>
