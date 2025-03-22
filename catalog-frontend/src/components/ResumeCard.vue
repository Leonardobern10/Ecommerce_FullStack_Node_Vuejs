<script setup>
import { defineProps, defineEmits } from 'vue';
import {
    financedValue,
    pixValue,
    viewFinancedValue,
} from '@/services/productService';

const props = defineProps({ length: Number, totalAmount: Number });
const emit = defineEmits(['eventCheckout']);

const callCheckout = () => {
    emit('eventCheckout');
};
</script>
<template>
    <div id="resume-card">
        <p>Resumo da compra</p>
        <hr />
        <div>
            <p>Produtos:</p>
            <p>{{ length }}</p>
        </div>
        <div>
            <p>Frete:</p>
            <p style="color: var(--xanadu)">Grátis</p>
        </div>
        <div>
            <p id="total-value">
                <strong>Total:</strong>
            </p>
            <div id="price-values">
                <p>R$ {{ pixValue(totalAmount) }}</p>
                <p>ou 10x de {{ financedValue(totalAmount) }}</p>
            </div>
        </div>
        <div id="container-buttons">
            <button @click="callCheckout" v-if="length">
                Finalizar compra
            </button>
        </div>
    </div>
</template>

<style scoped>
#resume-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    margin-top: 1rem;
    width: 100%;
    height: fit-content;

    padding: 1rem 1rem;

    background-color: #8181813b;
    border-radius: 15px;
}
#resume-card > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-width: 50%;
}
#total-value {
    font-size: 1.3rem;
    font-weight: 800;
    color: #000000ab;
}
#price-values {
    line-height: 1rem;
    text-align: center;
}
#price-values > p:first-child {
    font-size: 1.2rem;
}
#price-values > p:last-child {
    font-size: 0.7rem;
    opacity: 0.7;
}
hr {
    width: 100%;
}
button {
    max-width: 15rem;
    min-width: fit-content;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 0.7rem;
    background-color: var(--green-spring);
    color: #fff;
    font-size: 1rem;
    font-weight: 200;
    letter-spacing: 0.5px;

    transition:
        background-color 0.3s ease-in,
        border 0.3s ease-in;

    margin: 1rem 0;
}
button:hover {
    cursor: pointer;
    background-color: var(--xanadu);
    border: 1px solid #fff;
}
</style>
