<script setup>
import { ref, onMounted } from 'vue';
import { getProducts } from '../services/productService.js';
import { addToCart } from '../services/cartService.js';
import { authState } from '@/store/useAuth.js';
import { useRouter } from 'vue-router';

let isLogged = authState.isAuthenticated.value;
const router = useRouter();
// Variável reativa responsável por receber os produtos para exibição
const products = ref([]);

// Método responsável por carregar os produtos
const loadProducts = async () => {
    // Aguarda até que todos os produtos sejam buscados
    // e os armazena no array {products}
    products.value = await getProducts();
};

const addProductToCart = (product) => {
    if (!isLogged) {
        alert('Faça login para acessar seu carrinho.');
        return router.push('/login');
    }
    addToCart(product);
    alert('Produto adicionado ao carrinho!');
};

onMounted(loadProducts);
</script>

<template>
    <div id="view">
        <h2>Lista de Produtos</h2>
        <router-link to="/products/add" class="btn-add"
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
                    <p id="p-price">
                        R$ {{ Number.parseFloat(product.price).toFixed(2) }}
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
    padding: 1rem;
    min-width: 15rem;
    width: fit-content;
}
button {
    background-color: green;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
}

#view {
    padding: 0 2rem;
}

img {
    width: 100%;
    height: 100%;
}

#container-img-product {
    width: 5rem;
    height: 8rem;

    margin-bottom: 1rem;
}

#info-numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

#info-numbers p {
    padding: 0 1rem;
}

#p-price {
    font-size: 1.4rem;
    font-weight: 800;
    width: 90%;
}

#container-products {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem 2rem;
}
</style>
