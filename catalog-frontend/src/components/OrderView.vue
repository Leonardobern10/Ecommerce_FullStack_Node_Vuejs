<script setup>
import { ref } from 'vue';
import CartItemView from './CartItemView.vue';

defineProps([
    'orderId',
    'orderStatus',
    'orderTotalValue',
    'name',
    'price',
    'quantity',
    'imageUrl',
]);

const listItems = ref([]);
</script>

<template>
    <div>
        <div>
            <p>
                <strong>Pedido: {{ orderId }}</strong>
            </p>
            <p>Status: {{ orderStatus }}</p>
            <p>Valor total: {{ orderTotalValue }}</p>
        </div>
        <div>
            <CartItemView
                :name="name"
                :price="price"
                :quantity="quantity"
                :image-url="imageUrl"
            />
        </div>
    </div>
</template>
