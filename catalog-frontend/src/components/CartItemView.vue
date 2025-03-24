<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { calculatePixDiscount } from '@/services/productService';
import Button from './Button.vue';

const props = defineProps(['name', 'price', 'quantity', 'imageUrl']);
const emit = defineEmits(['update-quantity', 'remove-item']);

const updateQuantity = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
        emit('update-quantity', newQuantity);
    }
};

const totalPrice = computed(() => (props.price * props.quantity).toFixed(2));
</script>

<template>
    <div id="container">
        <div id="container-img">
            <img :src="imageUrl" :alt="'foto de ' + name" />
        </div>
        <div id="info-cart-product">
            <p id="name-product">{{ name }}</p>
            <div>
                <Button @click="$emit('remove-item')" button-name="Excluir" />
                <input
                    type="number"
                    :value="quantity"
                    min="1"
                    @input="updateQuantity" />
            </div>
        </div>
        <div id="price">
            <p id="title-price">
                <strong>R$ {{ totalPrice }}</strong>
            </p>
            <p id="financed-price">
                ou R$ {{ calculatePixDiscount(price) }} no pix
            </p>
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

    height: 10rem;
    width: 100%;
    min-width: 70%;

    border-bottom: 1px solid black;

    margin: 1rem 0;
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

    row-gap: 2rem;
}

#info-cart-product > div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

#container-img {
    width: 8rem;
    height: 8rem;
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
    line-height: 1.2rem;
    text-align: center;
}

#title-price {
    font-size: 1.3rem;
}
#financed-price {
    font-size: 0.8rem;
    opacity: 0.7;
}
</style>
