<script setup>
import { onMounted, ref } from 'vue';
import { getProducts, deleteProduct } from '../services/productService.js';

const products = ref([]);

const loadProducts = async () => {
    products.value = await getProducts();
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
        <router-link to="/products/add" class="btn-add"
            >Adicionar Produto</router-link
        >
        <ul>
            <li v-for="product in products" :key="product._id">
                {{ product.name }} - {{ product.price }}
                <button @click="removeProduct(product._id)">Excluir</button>
                <router-link :to="`/products/edit/${product._id}`"
                    >Editar</router-link
                >
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
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn-add {
    display: inline-block;
    padding: 10px;
    background-color: green;
    color: white;
    text-decoration: none;
    margin-bottom: 10px;
}
</style>
