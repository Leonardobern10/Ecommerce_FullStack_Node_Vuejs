<script setup>
import { defineProps } from 'vue';
import CartItemView from './CartItemView.vue';

const props = defineProps([
    'orderId',
    'orderStatus',
    'orderTotalValue',
    'name',
    'price',
    'quantity',
    'imageUrl',
]);
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
            <ul>
                <li :v-for="item in order.items" :key="item.product._id">
                    <CartItemView
                        :name="name"
                        :price="price"
                        :quantity="quantity"
                        :image-url="imageUrl" />
                </li>
            </ul>
        </div>
    </div>
</template>
