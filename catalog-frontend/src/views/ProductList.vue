<script setup>
import { ref, onMounted, computed } from 'vue';
import {
    getProducts,
    pixValue,
    viewFinancedValue,
} from '../services/productService.js';
import { addToCart } from '../services/cartService.js';
import { authState } from '@/store/useAuth.js';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/store/userProductStore.js';
import PATH from '@/constants/PATH.js';
import MESSAGE from '@/constants/MESSAGE.js';
import { mergeSort } from '@/services/sort.js';

const isLogged = ref(false);
const router = useRouter();
const products = ref([]);
const productStore = useProductStore();
const searchBrands = ref('');

// Método responsável por carregar os produtos
const loadProducts = async () => {
    products.value = await getProducts();
};

// Adiciona um produto ao carrinho
const addProductToCart = (product) => {
    if (!isLogged.value) {
        alert(MESSAGE.ALERT.CART.NEED_AUTHENTICATE);
        return router.push(PATH.LOGIN);
    }
    addToCart(product);
    alert(MESSAGE.SUCESS.CART.ADD);
};

// Acessa a view de um produto específico
const acessProduct = (id) => {
    productStore.save(id);
    router.push(`/products/${id}`);
};

// Ordenação
const sortProducts = () => (products.value = mergeSort(products.value));
const sortProductsInvert = () =>
    (products.value = mergeSort(products.value).reverse());

// Computed que filtra os produtos dinamicamente
const filteredProducts = computed(() => {
    if (!searchBrands.value.trim()) return products.value;
    return products.value.filter((el) => el.brand === searchBrands.value);
});

onMounted(async () => {
    await authState.checkAuthStatus();
    isLogged.value = authState.isAuthenticated.value;
    console.log(isLogged.value);
    loadProducts();
});
</script>

<template>
    <div id="view">
        <router-link to="/products/add" class="btn-add"
            >Adicionar Produto</router-link
        >
        <div id="container">
            <nav id="container-options-view">
                <p class="options-view" @click="sortProducts">Menor preço</p>
                <p class="options-view" @click="sortProductsInvert">
                    Maior preço
                </p>
                <p class="options-view" @click="sortProducts">Mais recentes</p>
                <div id="container-search-brand">
                    <p>Procure pela marca de sua preferência:</p>
                    <input
                        id="input-brand"
                        v-model="searchBrands"
                        type="text"
                        placeholder="Digite o nome da marca..." />
                </div>
            </nav>
            <ul id="container-products">
                <li
                    @click="acessProduct(product._id)"
                    id="product"
                    v-for="product in filteredProducts"
                    :key="product._id">
                    <div id="container-img-product">
                        <img
                            :src="product.imageUrl"
                            :alt="`imagem do ${product.name}`" />
                    </div>
                    {{ product.name }}
                    <div id="info-numbers">
                        <p class="p-price">
                            <strong>
                                R$
                                {{ pixValue(product.price) }}</strong
                            >
                            no pix
                        </p>
                        <p class="p-price">
                            {{ viewFinancedValue(product.price) }}
                        </p>
                    </div>
                    <button @click.stop="addProductToCart(product)">
                        Adicionar ao Carrinho
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 600px) {
}
@media (min-width: 600px) {
}
li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    row-gap: 0.2rem;

    padding: 1rem;
    width: 15rem;
    height: 100%;
    border-radius: 10px;

    color: #000;

    background-color: transparent;
    transition: box-shadow 0.3s ease;
}
li:hover {
    animation: piscar 5s ease-in;
    scale: 1;
    cursor: pointer;
}
button {
    background-color: var(--green-spring);
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    transition: background-color 0.3s ease-in;
}
button:hover {
    cursor: pointer;
    background-color: var(--xanadu);
}
#view {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', serif;
    font-weight: 300;
    width: 80vw;
}
#container {
    display: flex;
    flex-direction: column;
    row-gap: 4rem;
    width: 100%;

    border-radius: 15px;
}
#container-options-view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-radius: 15px;

    background-color: var(--green-spring);
    opacity: 0.8;
}
#container-options-view p:first-child {
    padding-left: 2rem;
}
.options-view {
    font-size: 1rem;
}
.options-view:hover {
    cursor: pointer;
}
#container-search-brand {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    width: 50%;
    height: 100%;
    background-color: #000;
    color: #ffffffc0;
    border: none;
    border-radius: 15px;
    padding: 0 2rem;
}
#container-search-brand p {
    font-size: 1.2rem;
}
#input-brand {
    width: 25%;
    height: 1rem;
    border-radius: 10px;
    padding: 0.4rem;
    border: none;
    outline: none;

    background-color: var(--xanadu);
    color: #000;
}
#input-brand:focus {
    background-color: #000;
    color: var(--green-spring);
    color: #fff;
}
#input-brand::placeholder {
    color: #fff;
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
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    row-gap: 0.2px;
    line-height: 0.2rem;
}
#info-numbers p {
    padding: 0 1rem;
}
.p-price {
    font-size: 0.9rem;
    font-weight: 200;
    width: 100%;

    letter-spacing: 0.1px;
}
.p-price > strong {
    font-size: 1.2rem;
}
#container-products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    width: 100%;
    grid-auto-flow: row;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;
}
#title-section {
    color: #ffffffa1;
    font-weight: 400;
    font-size: 2rem;
}
.btn-add {
    display: none;
}
</style>
