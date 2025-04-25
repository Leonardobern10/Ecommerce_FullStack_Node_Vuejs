<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { getProducts, saveProduct } from '../../services/productService.js';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const product = ref({
    name: '',
    brand: '',
    price: 0,
    description: '',
    type: '',
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
    <div
        id="view-product-form"
        class="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 class="text-2xl font-semibold mb-4 text-gray-800">
            {{ isEdit ? 'Editar Produto' : 'Adicionar Produto' }}
        </h1>

        <form @submit.prevent="save">
            <h5 class="text-gray-600 mb-4">
                {{
                    isEdit
                        ? 'Preencha os dados abaixo para adicionar um produto ao seu catálogo'
                        : 'Edita os campos abaixo para atualizar as informações do produto escolhido.'
                }}
            </h5>
            <Input
                v-model="product.name"
                type="text"
                placeholder="Informe o nome do produto..."
                required
                name="name" />

            <Input
                v-model="product.brand"
                type="text"
                placeholder="Informe a marca do produto..."
                required
                name="Marca" />
            <Input
                v-model="product.description"
                type="text"
                placeholder="Insira uma descrição para o produto..."
                required />
            <Input
                v-model="product.type"
                type="text"
                placeholder="Insira o tipo do produto DIGITAL, ANALÓGICO OU SMART..."
                required />
            <Input
                v-model="product.price"
                type="number"
                step="0.01"
                placeholder="Informe o preço do produto..."
                required />
            <Input
                v-model="product.stock"
                type="number"
                placeholder="Informe a quantidade do produto..."
                required />
            <Input
                v-model="product.imageUrl"
                type="text"
                placeholder="Informe a URL da imagem..."
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

button:hover {
    color: rgb(117, 117, 117);
}

button {
    margin-top: 1rem;
}
</style>
