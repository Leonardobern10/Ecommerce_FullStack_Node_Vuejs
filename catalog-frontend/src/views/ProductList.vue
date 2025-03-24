<script setup>
import { ref, onMounted, computed } from 'vue';
import {
    accessProductById,
    loadProducts,
    sortProductsByProp,
} from '../services/productService.js';
import { addOnCart } from '../services/cartService.js';
import { authState } from '@/store/useAuth.js';
import { useProductStore } from '@/store/userProductStore.js';
import { filterProducts } from '../services/productService.js';
import { useRouter } from 'vue-router';
import ProductOffer from '@/components/ProductOffer.vue';
import { goToPage } from '@/services/pageService.js';

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
const addProductToCart = async (product) => {
    await addOnCart(product, router, isLogged.value, alert);
};

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

const getPage = async (operation) =>
    goToPage(
        operation,
        authState,
        isLogged,
        products,
        currentPage,
        totalPages,
        limit,
    );

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
    <div
        id="view"
        class="flex flex-col justify-center items-center w-[80vw] h-full font-inter font-light">
        <div
            id="container"
            class="flex flex-col items-center gap-16 w-full rounded-lg">
            <nav
                id="container-options-view"
                class="flex flex-row justify-between items-center bg-xanadu h-12 w-full rounded-lg">
                <p
                    class="options-view pl-8 text-base hover:cursor-pointer"
                    @click="sortProductsLowToHigh">
                    Menor preço
                </p>
                <p
                    class="options-view text-base hover:cursor-pointer"
                    @click="sortProductsHighToLow">
                    Maior preço
                </p>
                <p
                    class="options-view text-base hover:cursor-pointer"
                    @click="sortProductsMostRecently">
                    Mais recentes
                </p>
                <div
                    id="container-search-brand"
                    class="flex flex-row justify-evenly items-center w-1/2 h-full bg-black text-white/75 border-none rounded-lg px-4">
                    <p class="text-base pr-2">
                        Procure pela marca de sua preferência:
                    </p>
                    <input
                        id="input-brand"
                        v-model="searchBrandQuery"
                        type="text"
                        placeholder="Buscar..."
                        class="w-1/5 h-6 rounded-lg p-2 border-none outline-none bg-gray-50/20 text-black/60 focus:bg-black focus:text-green-500 placeholder:text-white/60" />
                </div>
            </nav>
            <ul
                id="container-products"
                class="grid grid-cols-auto-fit-250 w-full justify-items-center items-center gap-8">
                <ProductOffer
                    v-for="product in filteredProducts"
                    :key="product.name"
                    :product="product"
                    @acessProduct="accessProduct(product._id)"
                    @addToCart="addProductToCart(product)" />
            </ul>
            <div
                class="pagination w-1/5 flex flex-row justify-between items-center gap-5 my-8">
                <button
                    @click="getPage('previous')"
                    id="previous"
                    class="button-pagination w-8 h-8 bg-no-repeat bg-center bg-[url('../assets/icons/left_arrow_next_page.svg')] hover:cursor-pointer rounded-lg">
                    <img
                        src="../assets/icons/left_arrow_next_page.svg"
                        alt="" />
                </button>
                <span> Página {{ currentPage }} de {{ totalPages }}</span>
                <button
                    @click="getPage('next')"
                    id="next"
                    class="button-pagination w-8 h-8 bg-no-repeat bg-center bg-[url('../assets/icons/right_arrow_next_page.svg')] hover:cursor-pointer rounded-lg">
                    <img
                        src="../assets/icons/right_arrow_next_page.svg"
                        alt="" />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Definição customizada para grid-auto-fit */
@layer utilities {
    .grid-cols-auto-fit-250 {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}
</style>
