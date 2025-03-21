<script setup>
import { defineProps } from 'vue';

const props = defineProps({ icon: String, title: String, content: String });
</script>

<template>
    <div id="container">
        <div id="icon">
            <img :src="icon" :alt="`icone para ${icon}`" />
        </div>
        <div id="info">
            <p id="title">{{ title }}</p>
            <p id="content">{{ content }}</p>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 600px) {
    div {
        width: 90%;
    }
    #container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        column-gap: 3rem;

        height: 100%;
        line-height: 1rem;
    }
    #icon {
        width: 5rem;
        height: 100%;
    }
    #title {
        color: #fff;
        font-size: 1rem;
        font-weight: 500;
    }
    #content {
        color: #ffffff70;
        font-size: 0.8rem;
        font-weight: 100;
    }
    #info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 8rem;
        row-gap: 0.5rem;
    }
}
@media (min-width: 600px) {
    #container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 30rem;
        width: 20rem;
        row-gap: 1rem;
        line-height: 1.5rem;
    }
    #icon {
        width: 7rem;
        height: 5rem;
    }

    #title {
        color: #fff;
        font-size: 1.3rem;
        font-weight: 500;
    }
    #content {
        color: #ffffff70;
        font-size: 1rem;
        font-weight: 100;
    }
    #info {
        width: 80%;
        text-align: center;
    }
}
</style>
