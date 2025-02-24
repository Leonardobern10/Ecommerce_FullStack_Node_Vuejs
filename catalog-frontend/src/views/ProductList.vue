<script setup>
import { onMounted, ref } from 'vue';
import { getProducts, deleteProduct } from '../services/productService.js';
import { addToCart } from '../services/cartService.js';

const products = ref([]);

const loadProducts = async () => {
    products.value = await getProducts();
};

const addProductToCart = (product) => {
    addToCart(product);
    alert('Produto adicionar ao carrinho!');
};

const removeProduct = async (id) => {
    await deleteProduct(id);
    loadProducts();
};

onMounted(loadProducts);
</script>

<template>
    <div>
        <h2>Lista de Produtos</h2>
        <router-link to="/api/products/add" class="btn-add"
            >Adicionar Produto</router-link
        >
        <ul>
            <li v-for="product in products" :key="product._id">
                {{ product.name }} - R$ {{ product.price }}
                <button @click="addProductToCart(product)">
                    Adicionar ao Carrinho
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
}
button {
    background-color: green;
    color: white;
    border: none;
    padding: 5px 10px;
}
</style>
