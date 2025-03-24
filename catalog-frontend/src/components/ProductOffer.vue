<script setup>
import {
    calculatePixDiscount,
    viewFinancedValue,
} from '@/services/productService';
import { defineProps, defineEmits, computed } from 'vue';
import Button from './Button.vue';

const props = defineProps({ product: Object });
const emit = defineEmits(['acessProduct', 'addToCart']);
const pixPrice = computed(() => calculatePixDiscount(props.product.price));
const financedPrice = computed(() => viewFinancedValue(props.product.price));

const acess = () => emit('acessProduct');
const add = () => emit('addToCart');
</script>

<template>
    <div id="view-product-offer" @click="acess">
        <div id="container-img-product">
            <img :src="product.imageUrl" :alt="`imagem do ${product.name}`" />
        </div>
        <div id="description-product-offer">
            <p id="product-name">{{ product.name }}</p>
            <div id="info-numbers">
                <p class="p-price">
                    <strong>
                        R$
                        <span id="main-product-price">{{
                            pixPrice
                        }}</span></strong
                    >
                    no pix
                </p>
                <p class="p-price">
                    {{ financedPrice }}
                </p>
            </div>
        </div>
        <Button
            id="button-add-product"
            @click.stop="add"
            button-name="Adicionar ao carrinho" />
    </div>
</template>

<style scoped>
#view-product-offer {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;

    padding: 1rem;

    width: 100%;
    height: 100%;

    color: rgba(43, 43, 43, 0.808);
}
#view-product-offer:hover {
    cursor: pointer;
}
#container-img-product {
    width: 15rem;
    height: 15rem;
}
img {
    width: 100%;
    height: 100%;
}
#product-name {
    font-weight: 700;
}
#main-product-price {
    font-size: 1.4em;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.418);
    color: var(--xanadu);
}
</style>
