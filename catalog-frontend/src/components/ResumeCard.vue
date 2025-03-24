<script setup>
import { defineProps, defineEmits } from 'vue';
import {
    financedValue,
    calculatePixDiscount,
    viewFinancedValue,
} from '@/services/productService';
import Button from './Button.vue';

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
                <p>R$ {{ calculatePixDiscount(totalAmount) }}</p>
                <p>ou 10x de {{ financedValue(totalAmount) }}</p>
            </div>
        </div>
        <div id="container-buttons">
            <Button
                @click="callCheckout"
                v-if="length"
                button-name="Finalizar compra">
            </Button>
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
</style>
