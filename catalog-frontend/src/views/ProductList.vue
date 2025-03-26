<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import {
    accessProductById,
    getProductsByBrand,
    getProductsByName,
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

// Valor do parametro que será pesquisado no banco de dados
let searchValue = ref();
// Parametro que será pesquisado no banco de dados
let searchType = ref('');
// Tempo de intervalo entre as requisição
let timeout = null;
// Estado para armazenar o aviso
const alertMessage = ref('');

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

// Função para exibir o alerta por 5 segundos
const showAlert = (message) => {
    alertMessage.value = message;
    setTimeout(() => {
        alertMessage.value = '';
    }, 5000);
};

// Observa mudanças no input e chama a função automaticamente
watch([searchValue, searchType], async ([newQuery, newType]) => {
    clearTimeout(timeout);

    if (!newQuery || newQuery.trim().length < 3) return; // Evita pesquisas curtas

    if (!newType) {
        showAlert('Por favor, selecione um tipo de busca antes de pesquisar.');
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
        <div class="alert-container" v-if="alertMessage">
            <p class="alert-message">{{ alertMessage }}</p>
        </div>
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
                    <div class="flex flex-row justify-between w-full">
                        <label for="searchMethod">Pesquisar por:</label>
                        <select
                            class="bg-xanadu rounded-lg p-0.5"
                            id="searchMethod"
                            v-model="searchType">
                            <option value="" disabled>
                                Selecione uma opção
                            </option>
                            <option value="Nome">Nome</option>
                            <option value="Marca">Marca</option>
                        </select>
                        <input
                            class="text-gray-300 focus:bg-xanadu"
                            type="text"
                            v-model="searchValue"
                            placeholder="Digite sua busca..." />
                    </div>
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
