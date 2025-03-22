<script setup>
import { deleteProduct, getProduct } from '@/services/productService';
import { ref } from 'vue';

const currentProduct = ref({});
const searched = ref('');

const searchProduct = async () =>
    (currentProduct.value = await getProduct(searched.value));

const removeProduct = async () => {
    await deleteProduct(currentProduct.value._id);
    currentProduct.value = {};
};
</script>

<template>
    <div>
        <form id="form-search-product" @submit.prevent="searchProduct">
            <input type="text" v-model="searched" placeholder="Digite o ID" />
            <button type="submit">Pesquisar</button>
        </form>
        <div v-if="currentProduct">
            <h1>Name: {{ currentProduct.name }}</h1>
            <p>Brand: {{ currentProduct.brand }}</p>
            <p>Description: {{ currentProduct.description }}</p>
            <p>Price: {{ currentProduct.price }}</p>
            <p>Stock: {{ currentProduct.stock }}</p>
            <div>
                <p>Imagem</p>
                <div style="width: 120px; height: 120px">
                    <img :src="currentProduct.imageUrl" alt="" />
                </div>
            </div>
            <p>CreatedAt: {{ currentProduct.createdAt }}</p>
        </div>
        <p v-else>ID inválido</p>
        <form @submit.prevent="removeProduct">
            <button type="submit">Remover</button>
        </form>
    </div>
</template>
