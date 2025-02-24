<script setup>
import { ref, onMounted } from 'vue';
import {
    createProduct,
    updateProduct,
    getProducts,
} from '../services/productService.js';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const product = ref({ name: '', price: 0 });

onMounted(async () => {
    if (route.params.id) {
        isEdit.value = true;
        const products = await getProducts();
        product.value = products.find((p) => p._id === route.params.id);
    }
});

const saveProduct = async () => {
    if (isEdit.value) {
        await updateProduct(route.params.id, product.value);
    } else {
        await createProduct(product.value);
    }
    router.push('/products');
};
</script>

<template>
    <div>
        <h2>{{ isEdit ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
        <form @submit.prevent="saverProduct">
            <input
                v-model="product.name"
                type="text"
                placeholder="Nome do produto"
                required
            />
            <input
                v-model="product.price"
                type="number"
                placeholder="Preço"
                required
            />
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
</style>
