<script setup>
import { ref, onMounted } from 'vue';
import { getProducts, saveProduct } from '../services/productService.js';
import { useRoute, useRouter } from 'vue-router';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const product = ref({
    name: '',
    brand: '',
    price: 0,
    description: '',
    stock: 0,
    imageUrl: '',
});

const save = async () =>
    await saveProduct(isEdit, route, product, router, toast);

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
            <Input
                v-model="product.name"
                type="text"
                placeholder="Nome do produto"
                required />
            <Input
                v-model="product.brand"
                type="text"
                placeholder="Marca do produto"
                required />
            <Input
                v-model="product.description"
                type="text"
                placeholder="Descricao do produto"
                required />
            <Input
                v-model="product.price"
                type="number"
                step="0.01"
                placeholder="Preço"
                required />
            <Input
                v-model="product.stock"
                type="number"
                placeholder="Quantidade"
                required />
            <Input
                v-model="product.imageUrl"
                type="text"
                placeholder="Url da imagem"
                required />
            <Button
                type="submit"
                :button-name="isEdit ? 'Salvar Alterações' : 'Adicionar'">
            </Button>
        </form>
    </div>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 400px;
    margin: auto;

    padding: 1rem 0;
}
button {
    width: fit-content;
    border: 2px solid #d9d9d9;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    background-color: var(--green-spring);
    color: #fff;
    font-size: 1rem;
    font-weight: 200;
    letter-spacing: 0.5px;
    margin-top: 4rem;
    transition:
        background-color 0.3s ease-in,
        border 0.3s ease-in;
}

button:hover {
    cursor: pointer;
    background-color: var(--xanadu);
    border: 1px solid #fff;
}
</style>
