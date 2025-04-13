<script setup>
import { ref } from 'vue';
import { getProduct, saveUpdate } from '@/services/productService';
import Button from '@/components/Button.vue';

// Values
const currentProduct = ref({});
const idSearched = ref('');

// Methods
const searchProduct = async () => {
    currentProduct.value = await getProduct(idSearched.value);
};
const saveChanges = async () => await saveUpdate(currentProduct, alert);
</script>
<template>
    <div class="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 class="text-2xl font-semibold mb-4 text-gray-800">
            Editar Produto
        </h1>

        <!-- Seção de busca -->
        <div class="mb-6">
            <p class="font-medium text-gray-600">Pesquise pelo seu produto</p>
            <p class="text-sm text-gray-500">
                Digite o ID do produto. Se encontrado, ele será exibido abaixo.
            </p>
            <form @submit.prevent="searchProduct" class="mt-4 flex gap-2">
                <input
                    type="text"
                    v-model="idSearched"
                    placeholder="Digite o ID"
                    class="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
                <Button type="submit" button-name="Pesquisar" />
            </form>
        </div>

        <!-- Formulário de edição -->
        <div v-if="idSearched" class="border-t pt-6">
            <form
                @submit.prevent="saveChanges"
                class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 font-medium">Nome:</label>
                    <input
                        type="text"
                        v-model="currentProduct.name"
                        class="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-500" />
                </div>

                <div>
                    <label class="block text-gray-700 font-medium"
                        >Marca:</label
                    >
                    <input
                        type="text"
                        v-model="currentProduct.brand"
                        class="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-500" />
                </div>

                <div class="md:col-span-2">
                    <label class="block text-gray-700 font-medium"
                        >Descrição:</label
                    >
                    <textarea
                        v-model="currentProduct.description"
                        class="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-500"
                        rows="3">
                    </textarea>
                </div>

                <div>
                    <label class="block text-gray-700 font-medium"
                        >Preço:</label
                    >
                    <input
                        type="number"
                        v-model="currentProduct.price"
                        step="0.01"
                        class="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-500" />
                </div>

                <div>
                    <label class="block text-gray-700 font-medium"
                        >Estoque:</label
                    >
                    <input
                        type="number"
                        v-model="currentProduct.stock"
                        class="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-500" />
                </div>

                <div class="md:col-span-2">
                    <label class="block text-gray-700 font-medium"
                        >Imagem URL:</label
                    >
                    <input
                        type="text"
                        v-model="currentProduct.imageUrl"
                        class="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-500" />
                </div>

                <div class="md:col-span-2 flex justify-center mt-4">
                    <Button type="submit" button-name="Salvar alterações" />
                </div>
            </form>
        </div>
    </div>
</template>
