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
import ProductOffer from '@/components/ProductOffer.vue';

const router = useRouter();
const isLogged = ref(false);
const products = ref([]);

const currentPage = ref(1);
const totalPages = ref();
const limit = ref(12);

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
                        placeholder="Nome da marca..." />
                </div>
            </nav>
            <ul id="container-products">
                <ProductOffer
                    v-for="product in products"
                    :key="product.name"
                    :product="product"
                    @acessProduct="accessProduct(product._id)"
                    @addToCart="addProductToCart(product)" />
            </ul>
            <div class="pagination">
                <button
                    @click="goToPage('previous')"
                    id="previous"
                    class="button-pagination"></button>
                <span> Página {{ currentPage }} de {{ totalPages }}</span>
                <button
                    @click="goToPage('next')"
                    id="next"
                    class="button-pagination"></button>
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
    width: 12rem;
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
.button-pagination {
    color: #fff;
    border: none;
    border-radius: 10px;

    background-repeat: no-repeat;
    background-position: center;
}
.button-pagination:hover {
    cursor: pointer;
}
#previous {
    background-image: url('../assets/icons/left_arrow_next_page.svg');
    width: 30px;
    height: 30px;
}
#next {
    background-image: url('../assets/icons/right_arrow_next_page.svg');
    width: 30px;
    height: 30px;
}
#view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', serif;
    font-weight: 300;
    width: 80vw;
    height: 100%;
}
#container {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    height: 3rem;
    width: 100%;
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

    justify-content: space-evenly;
    align-items: center;

    width: 50%;
    height: 100%;
    background-color: #000;
    color: #ffffffc0;
    border: none;
    border-radius: 15px;
    padding: 0 1rem;
}
#container-search-brand p {
    font-size: 1rem;
    padding-right: 5px;
}
#input-brand {
    width: 20%;
    height: 1.5rem;
    border-radius: 10px;
    padding: 0.4rem;
    border: none;
    outline: none;

    background-color: var(--xanadu);
    color: #000000a2;
}
#input-brand:focus {
    background-color: #000;
    color: var(--green-spring);
    color: #ffffff88;
}
#input-brand::placeholder {
    color: #ffffff98;
}
img {
    width: 100%;
    height: 100%;
}
#container-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    width: 100%;
    justify-items: center;
    align-items: center;
    gap: 4rem 1rem;
}
#title-section {
    color: #ffffffa1;
    font-weight: 400;
    font-size: 2rem;
}
.btn-add {
    display: none;
}
.pagination {
    width: 20%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    column-gap: 20px;
    margin: 2rem 0;
}
</style>
