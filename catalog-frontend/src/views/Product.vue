<script setup>
import { searchProduct } from '@/services/productService';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/store/userProductStore';
import { addOnCart } from '@/services/cartService';
import { useAuthStore } from '@/store/useAuthStore.js';
import Button from '@/components/Button.vue';

const productStore = useProductStore();
const route = useRoute();
const router = useRouter();
const product = ref({});
const useAuth = useAuthStore();

onBeforeMount(async () => searchProduct(product, route, productStore));

const addToCart = async (product) =>
    await addOnCart(product, router, useAuth.authenticated, alert);
</script>

<template>
    <div>
        <div id="viewDiv">
            <div id="container-img">
                <img :src="product.imageUrl" alt="" />
            </div>
            <div id="container-info">
                <h1>{{ product.name }}</h1>
                <p>{{ product.description }}</p>
                <div id="price-stock">
                    <p id="price">
                        R$
                        <strong>{{ Number(product.price).toFixed(2) }}</strong>
                    </p>
                    <p>Quantidade: {{ product.stock }}</p>
                </div>
                <Button
                    @click="addToCart(product)"
                    button-name="Adicionar ao carrinho">
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#viewDiv {
    width: 100%;
    height: 100%;
    padding: 50px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 20px;

    background-color: rgba(255, 255, 255, 0.719);
}
img {
    width: 100%;
    height: 100%;
}
#container-img {
    min-width: 15rem;
    max-width: 20rem;
    height: 20rem;
}
#container-info {
    width: 50%;
    min-height: 90%;
    max-height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 30%;
}
#price-stock {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
#price {
    font-size: 2rem;
}
button {
    border: none;
    border-radius: 5px;
    padding: 1rem;
    background-color: var(--green-spring);
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.5px;
    margin: 1rem 0;

    transition:
        background-color 0.3s ease-in,
        border 0.3s ease-in;
}
button:hover {
    cursor: pointer;
    background-color: var(--xanadu);
    border: 1px solid var(--green-spring);
}
</style>
