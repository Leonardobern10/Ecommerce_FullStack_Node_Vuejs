<script setup>
import { onMounted, ref } from 'vue';
import { getProducts, deleteProduct } from '../services/productService.js';
import { addToCart } from '../services/cartService.js';

const products = ref([]);

const loadProducts = async () => {
    products.value = await getProducts();
};

const addProductToCart = (product) => {
    addToCart(product);
    alert('Produto adicionar ao carrinho!');
};

onMounted(loadProducts);
</script>

<template>
    <div id="view">
        <h2>Lista de Produtos</h2>
        <router-link to="/api/products/add" class="btn-add"
            >Adicionar Produto</router-link
        >
        <ul id="container-products">
            <li v-for="product in products" :key="product._id">
                <div id="container-img-product">
                    <img
                        :src="product.imageUrl"
                        :alt="`imagem do ${product.name}`"
                    />
                </div>
                {{ product.name }}
                <div id="info-numbers">
                    <p id="p-price">R$ {{ product.price }}</p>
                    <p id="p-quantity">
                        <strong>Quantidade: </strong>{{ product.stock }}
                    </p>
                </div>
                <button @click="addProductToCart(product)">
                    Adicionar ao Carrinho
                </button>
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
}
button {
    background-color: green;
    color: white;
    border: none;
    padding: 5px 10px;
}

#view {
    padding: 0 2rem;
}

img {
    width: 100%;
    height: 100%;
}

#container-img-product {
    width: 10rem;
    height: 10rem;

    margin-bottom: 1rem;
}

#info-numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

#info-numbers p {
    padding: 0 2rem;
}

#p-price {
    font-size: 1.7rem;
    width: 50%;
}

#container-products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
</style>
