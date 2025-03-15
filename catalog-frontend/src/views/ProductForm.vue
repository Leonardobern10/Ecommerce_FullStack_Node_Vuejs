<script setup>
import { ref, onMounted } from 'vue';
import { getProducts, saveProduct } from '../services/productService.js';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const product = ref({
    name: '',
    price: 0,
    description: '',
    stock: 0,
    imageUrl: '',
});

const save = async () =>
    await saveProduct(isEdit, route, product, router, alert);

onMounted(async () => {
    try {
        if (route.params.id) {
            isEdit.value = true;
            const products = await getProducts();
            product.value = products.find((p) => p._id === route.params.id);
        }
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <div id="view-product-form">
        <h2>{{ isEdit ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
        <form @submit.prevent="save">
            <input
                v-model="product.name"
                type="text"
                placeholder="Nome do produto"
                required />
            <input
                v-model="product.description"
                type="text"
                placeholder="Descricao do produto"
                required />
            <input
                v-model="product.price"
                type="number"
                step="0.01"
                placeholder="Preço"
                required />
            <input
                v-model="product.stock"
                type="number"
                placeholder="Quantidade"
                required />
            <input
                v-model="product.imageUrl"
                type="text"
                placeholder="Url da imagem"
                required />
            <button type="submit">
                {{ isEdit ? 'Salvar Alterações' : 'Adicionar' }}
            </button>
        </form>
    </div>
</template>

<style scoped>
form {
    max-width: 400px;
    margin: auto;
}
input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
}
button {
    background-color: blue;
    color: white;
    padding: 10px;
    border: none;
}
#view-product-form {
    padding: 0 2rem;
}
</style>
