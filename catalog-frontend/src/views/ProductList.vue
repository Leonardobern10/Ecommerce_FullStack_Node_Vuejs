<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useProductStore } from '@/store/userProductStore.js';
import { authState } from '@/store/useAuth.js';
import ProductOffer from '@/components/ProductOffer.vue';
import {
    accessProductById,
    getProductsByBrand,
    getProductsByName,
    loadProducts,
    sortProductsByProp,
} from '../services/productService.js';
import { addOnCart } from '../services/cartService.js';
import { filterProducts } from '../services/productService.js';
import { goToPage } from '@/services/pageService.js';
import { notifyInfo } from '@/notifications/notify.js';

const router = useRouter();
const isLogged = ref(false);
const products = ref([]);
const currentPage = ref(1);
const totalPages = ref();
const limit = ref(12);
const toast = useToast();
const productStore = useProductStore();
const searchBrandQuery = ref('');
const filteredProducts = computed(() =>
    filterProducts(searchBrandQuery, products, 'brand'),
);
let searchValue = ref();
let searchType = ref('');
let timeout = null;

// Adiciona um produto ao carrinho
const addProductToCart = async (product) => {
    await addOnCart(product, router, isLogged.value, toast);
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

const showInfo = () =>
    notifyInfo(toast, 'Por favor, selecione o campo a ser pesquisado');

// Observa mudanças no input e chama a função automaticamente
watch([searchValue, searchType], async ([newQuery, newType]) => {
    clearTimeout(timeout);

    if (!newQuery || newQuery.trim().length < 3) return; // Evita pesquisas curtas

    if (!newType) {
        showInfo();
        return;
    }
    timeout = setTimeout(async () => {
        if (newType === 'Nome') {
            products.value = await getProductsByName(newQuery);
        } else if (newType === 'Marca') {
            products.value = await getProductsByBrand(newQuery);
        }
    }, 500); // Aplica um debounce de 500ms
});

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
                class="flex flex-col md:flex-row justify-between items-center bg-gray-500/50 h-auto md:h-12 w-full rounded-lg p-2 md:p-4 gap-2 md:gap-0 text-white">
                <!-- Opções de Ordenação -->
                <div
                    class="flex flex-col md:flex-row gap-2 md:gap-4 text-center w-full md:w-auto">
                    <p
                        class="options-view text-base hover:cursor-pointer"
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
                </div>

                <!-- Pesquisa -->
                <div
                    id="container-search-brand"
                    class="flex flex-col md:flex-row justify-between items-center w-full md:w-fit bg-black text-white/75 border-none rounded-lg md:px-4 px-2 py-2 md:py-0">
                    <label for="searchMethod" class="text-sm md:mr-1"
                        >Pesquisar por:</label
                    >
                    <select
                        class="bg-gray-500/50 md:bg-black md:border-gray-500/50 md:border-2 rounded-lg p-1 w-full md:w-auto"
                        id="searchMethod"
                        v-model="searchType">
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="Nome">Nome</option>
                        <option value="Marca">Marca</option>
                    </select>
                    <input
                        class="text-gray-300 focus:bg-xanadu w-full md:w-[30%] mt-2 md:mt-0 md:ml-1 p-1 rounded-md"
                        type="text"
                        v-model="searchValue"
                        placeholder="Digite sua busca..." />
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
