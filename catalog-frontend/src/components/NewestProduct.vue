<script setup>
import { defineProps, defineEmits, onMounted, onUnmounted, ref } from 'vue';

const emits = defineEmits(['nextItem', 'previousItem']);
const props = defineProps({ img: String, name: String, price: String });
const screenWidth = ref(window.innerWidth);
const updateScreenSize = () => (screenWidth.value = window.innerWidth);

const emitNextItem = () => emits('nextItem');
const emitPreviousItem = () => emits('previousItem');

onMounted(() => addEventListener('resize', updateScreenSize));
onUnmounted(() => removeEventListener('resize', updateScreenSize));
</script>

<template>
    <div id="view">
        <button
            v-if="screenWidth < 600"
            class="button-product"
            id="button-previous-product"
            @click="emitNextItem">
            <div></div>
        </button>
        <div id="container">
            <div id="container-img">
                <img :src="img" :alt="` foto to ${name}`" />
            </div>
            <div id="container-description">
                <p id="product-name">{{ name }}</p>
                <h3 id="product-price">R$ {{ price }}</h3>
            </div>
        </div>
        <button
            v-if="screenWidth < 600"
            class="button-product"
            id="button-next-product"
            @click="emitPreviousItem">
            <div></div>
        </button>
    </div>
</template>

<style scoped>
@media (max-width: 600px) {
    #container {
        width: 70%;
    }
    #container-img {
        width: 100%;
    }
    #product-name {
        width: 100%;
    }
    #view {
        flex-direction: column;
        column-gap: 1rem;
    }
    .button-product {
        position: relative;
        top: 40%;

        width: 10%;
        height: 2rem;
    }
    #button-previous-product > div {
        content: url('../assets/icons/left_arrow.svg');
    }
    #button-previous-product {
        border: none;
        background-color: transparent;
    }
    #button-next-product > div {
        content: url('../assets/icons/right_arrow.svg');
    }
    #button-next-product {
        border: none;
        background-color: transparent;
    }
}
@media (min-width: 600px) {
    #container {
        width: 100%;
        column-gap: 1rem;
    }
    #container-img {
        width: 10rem;
    }
    #product-name {
        width: 100%;
    }
    #view {
        flex-direction: row;
    }
}
#view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

#container-description {
    text-align: center;
    line-height: 0.7rem;
}

#container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

#container-img {
    height: 15rem;
}
</style>
