<script setup>
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import { deleteProduct, getProduct } from '@/services/productService';

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
    <div class="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 class="text-2xl font-semibold mb-4 text-gray-800">
            Remover Produto
        </h1>

        <!-- Seção de busca -->
        <div class="mb-6">
            <p class="font-medium text-gray-600">Pesquise pelo ID do produto</p>
            <form @submit.prevent="searchProduct" class="mt-4 flex gap-2">
                <input
                    type="text"
                    v-model="searched"
                    placeholder="Digite o ID"
                    class="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
                <Button type="submit" button-name="Pesquisar" />
            </form>
        </div>

        <!-- Exibição do produto encontrado -->
        <div v-if="searched" class="border-t pt-6">
            <h3 class="text-lg font-semibold text-gray-800">
                {{ currentProduct.name }}
            </h3>
            <p class="text-gray-600">
                <strong>Marca:</strong> {{ currentProduct.brand }}
            </p>
            <p class="text-gray-600">
                <strong>Descrição:</strong> {{ currentProduct.description }}
            </p>
            <p class="text-gray-600">
                <strong>Preço:</strong> R$ {{ currentProduct.price }}
            </p>
            <p class="text-gray-600">
                <strong>Estoque:</strong> {{ currentProduct.stock }}
            </p>

            <div class="mt-4">
                <p class="text-gray-600"><strong>Imagem:</strong></p>
                <div class="w-32 h-32 border rounded-md overflow-hidden">
                    <img
                        :src="currentProduct.imageUrl"
                        class="w-full h-full object-cover"
                        alt="Imagem do Produto" />
                </div>
            </div>

            <p class="text-gray-600 mt-2">
                <strong>Criado em:</strong> {{ currentProduct.createdAt }}
            </p>

            <!-- Botão de remoção -->
            <form @submit.prevent="removeProduct" class="mt-6">
                <Button type="submit" button-name="Remover produto" />
            </form>
        </div>

        <!-- Mensagem de erro -->
        <p v-else class="text-red-500 font-medium">ID inválido</p>
    </div>
</template>
