<script setup>
import { ref, onMounted, computed } from 'vue';
import {
    accessProductById,
    loadProducts,
    pixValue,
    sortProductsByProp,
    viewFinancedValue,
} from '../services/productService.js';
import { addOnCart } from '../services/cartService.js';
import { authState } from '@/store/useAuth.js';
import { useProductStore } from '@/store/userProductStore.js';
import { filterProducts } from '../services/productService.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLogged = ref(false);
const products = ref([]);

const currentPage = ref(1);
const totalPages = ref();
const limit = ref(9);

const productStore = useProductStore();
const searchBrandQuery = ref('');
const filteredProducts = computed(() =>
    filterProducts(searchBrandQuery, products, 'brand'),
);

// Adiciona um produto ao carrinho
const addProductToCart = async (product) =>
    await addOnCart(product, router, isLogged, alert);

// Acessa a view de um produto específico
const accessProduct = async (id) =>
    await accessProductById(id, productStore, router);

// Ordenação
const sortProductsLowToHigh = async () =>
    (products.value = await sortProductsByProp(products, 'price'));

const sortProductsHighToLow = async () =>
    (products.value = await sortProductsByProp(products, 'price').reverse());

const sortProductsMostRecently = async () =>
    (products.value = await sortProductsByProp(
        products,
        'createdAt',
    ).reverse());

const goToPage = (local) => {
    if (local === 'next') nextPage();
    if (local === 'previous') previousPage();

    loadProducts(authState, isLogged, products, currentPage, totalPages, limit);
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
    }
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};

onMounted(async () => {
    await loadProducts(
        authState,
        isLogged,
        products,
        currentPage, // Passando ref corretamente
        totalPages, // Passando ref corretamente
        limit,
    );
});
</script>

<template>
    <div id="view">
        <div id="container">
            <nav id="container-options-view">
                <p class="options-view" @click="sortProductsLowToHigh">
                    Menor preço
                </p>
                <p class="options-view" @click="sortProductsHighToLow">
                    Maior preço
                </p>
                <p class="options-view" @click="sortProductsMostRecently">
                    Mais recentes
                </p>
                <div id="container-search-brand">
                    <p>Procure pela marca de sua preferência:</p>
                    <input
                        id="input-brand"
                        v-model="searchBrandQuery"
                        type="text"
                        placeholder="Digite o nome da marca..." />
                </div>
            </nav>
            <ul id="container-products">
                <li
                    @click="accessProduct(product._id)"
                    id="product"
                    v-for="product in filteredProducts"
                    :key="product._id">
                    <div id="container-img-product">
                        <img
                            :src="product.imageUrl"
                            :alt="`imagem do ${product.name}`" />
                    </div>
                    <div id="description-product-offer">
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
                    </div>
                    <button @click.stop="addProductToCart(product)">
                        Adicionar ao Carrinho
                    </button>
                </li>
            </ul>
            <div class="pagination">
                <button @click="goToPage('previous')">Anterior</button>
                <span> Página {{ currentPage }} de {{ totalPages }}</span>
                <button @click="goToPage('next')">Próxima</button>
            </div>
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
    width: 15rem;
    height: 15rem;

    margin-bottom: 1rem;
}
#info-numbers {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    row-gap: 0.1px;
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
#product {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    height: 100%;
}
.pagination {
    margin-top: 20px;
}
</style>
