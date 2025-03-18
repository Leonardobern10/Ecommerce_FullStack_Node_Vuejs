<script setup>
import { defineProps, defineEmits } from 'vue';
import { pixValue } from '@/services/productService';

const props = defineProps(['name', 'price', 'quantity', 'imageUrl']);
const emit = defineEmits(['update-quantity']);

const updateQuantity = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
        emit('update-quantity', newQuantity);
    }
};
</script>

<template>
    <div id="container">
        <div id="container-img">
            <img :src="imageUrl" :alt="'foto de ' + name" />
        </div>
        <div id="info-cart-product">
            <p id="name-product">{{ name }}</p>
            <div>
                <button @click="$emit('remove-item')">Excluir</button>
                <input
                    type="number"
                    :value="quantity"
                    min="1"
                    @input="updateQuantity" />
            </div>
        </div>
        <div id="price">
            <p id="title-price">
                <strong>R$ {{ (price * quantity).toFixed(2) }}</strong>
            </p>
            <p id="financed-price">ou R$ {{ pixValue(price) }} no pix</p>
        </div>
    </div>
</template>

<style scoped>
#container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    column-gap: 1rem;

    height: 8rem;
    width: 40rem;

    border-bottom: 2px solid rgb(0, 0, 0);
    padding: 2rem;
}
#name-product {
    font-size: 1.2rem;
    font-weight: 700;
}
#info-cart-product {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

#info-cart-product > div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

#container-img {
    width: 4rem;
    height: 5rem;
}

img {
    width: 100%;
    height: 100%;
}

input {
    height: 2rem;
    width: 20%;
    text-align: center;
    outline: none;
    border: none;
    border-radius: 5px;
    color: #fff;
    background-color: var(--xanadu);
}
#price {
    line-height: 0.1px;
    text-align: center;
}

#title-price {
    font-size: 1.3rem;
}
#financed-price {
    font-size: 0.8rem;
    opacity: 0.7;
}
button {
    max-width: 15rem;
    min-width: fit-content;
    border: none;
    border-radius: 5px;
    padding: 0.3rem 0.5rem;
    background-color: var(--green-spring);
    color: #fff;
    font-size: 1rem;
    font-weight: 200;
    letter-spacing: 0.5px;

    transition:
        background-color 0.3s ease-in,
        border 0.3s ease-in;
}

button:hover {
    cursor: pointer;
    background-color: var(--xanadu);
    border: 1px solid #fff;
}
</style>
