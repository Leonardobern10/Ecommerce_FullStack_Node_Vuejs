<script setup>
import Button from './Button.vue';

const props = defineProps({ name: String, price: Number, imageUrl: String });
</script>

<template>
    <div>
        <div id="container-img-product">
            <img :src="imageUrl" :alt="`imagem do ${name}`" />
        </div>
        <div id="description-product-offer">
            <p id="product-name">{{ product.name }}</p>

            <div id="info-numbers">
                <p class="p-price">
                    <strong>
                        R$
                        {{ pixValue(product.price) }}</strong
                    >
                    no pix
                </p>
                <p class="p-price">
                    {{ viewFinancedValue(product.price) }}
                </p>
            </div>
        </div>
        <Button
            @click.stop="addProductToCart(product)"
            button-name="Adicionar ao carrinho" />
    </div>
</template>
