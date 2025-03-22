<script setup>
import { getProduct, updateProduct } from '@/services/productService';
import { ref } from 'vue';
import { changeProduct } from '../services/productService';

const currentProduct = ref({});
const idSearched = ref('');

const searchProduct = async () => {
    currentProduct.value = await getProduct(idSearched.value);
};

const saveChanges = async () => {
    try {
        const updatedProduct = await changeProduct(
            currentProduct.value._id,
            currentProduct.value,
        );
        currentProduct.value = updatedProduct; // Atualiza o estado com a resposta do backend
        alert('Produto atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar produto.');
    }
};
</script>

<template>
    <div id="view-edit-instructions">
        <form id="form-search-product" @submit.prevent="searchProduct">
            <input type="text" v-model="idSearched" placeholder="Digite o ID" />
            <button type="submit">Pesquisar</button>
        </form>
        <div id="container-edit-element" v-if="currentProduct">
            <h1>Editar Produto</h1>
            <form id="form-edit-element" @submit.prevent="saveChanges">
                <label>Nome:</label>
                <input type="text" v-model="currentProduct.name" />

                <label>Marca:</label>
                <input type="text" v-model="currentProduct.brand" />

                <label>Descrição:</label>
                <textarea v-model="currentProduct.description"></textarea>

                <label>Preço:</label>
                <input
                    type="number"
                    v-model="currentProduct.price"
                    step="0.01" />

                <label>Estoque:</label>
                <input type="number" v-model="currentProduct.stock" />

                <label>Imagem URL:</label>
                <input type="text" v-model="currentProduct.imageUrl" />

                <button id="button-confirm-updates" type="submit">
                    Salvar Alterações
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
#view-edit-instructions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
#container-edit-element {
    padding: 2rem 0;
}
#form-edit-element {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
button {
    padding: 0.2rem;
    margin: 2rem 0;
    border-radius: 15px;
}
input {
    height: 2rem;
    width: 15rem;
    margin-bottom: 10px;
    padding: 0.7rem;
    font-size: 16px;
    border: 2px solid var(--xanadu);
    border-radius: 15px;
}

input:focus {
    background-color: #d9d9d9;
    border: none;
    border-left-style: ridge;
    border-right-style: ridge;
}
</style>
