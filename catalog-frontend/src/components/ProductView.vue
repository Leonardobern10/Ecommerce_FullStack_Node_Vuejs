<script setup>
defineProps(['name', 'price', 'quantity']);
</script>

<template>
    <div>{{ name }} - R$ {{ price }} x {{ quantity }}</div>
</template>
