<script setup>
import Input from '@/components/Input.vue';
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
    <div id="view-remove-item">
        <div>
            <form id="form-search-product" @submit.prevent="searchProduct">
                <input
                    type="text"
                    v-model="searched"
                    placeholder="Digite o ID" />
                <button type="submit">Pesquisar</button>
            </form>
        </div>
        <div id="container-searched-item-remove" v-if="searched">
            <h3>Name: {{ currentProduct.name }}</h3>
            <p><strong>Brand:</strong> {{ currentProduct.brand }}</p>
            <p style="text-align: justify">
                <strong>Description:</strong> {{ currentProduct.description }}
            </p>
            <p><strong>Price:</strong> {{ currentProduct.price }}</p>
            <p><strong>Stock:</strong> {{ currentProduct.stock }}</p>
            <div>
                <p><strong>Imagem:</strong></p>
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

<style scoped>
#view-remove-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}
button {
    padding: 0.2rem 0.5rem;
    margin: 2rem 1rem;
    border-radius: 15px;
    height: 2rem;
}
input {
    height: 2rem;
    border-radius: 15px;
    padding: 1rem;
}
#container-searched-item-remove {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    font-size: clamp(0.7rem, 1rem, 1.5rem);

    width: 60%;
}
</style>
