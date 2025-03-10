<script setup>
import { ref, onMounted } from 'vue';
import { getProducts } from '../services/productService.js';
import { addToCart } from '../services/cartService.js';
import { authState } from '@/store/useAuth.js';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/store/userProductStore.js';
import PATH from '@/constants/PATH.js';
import MESSAGE from '@/constants/MESSAGE.js';

const isLogged = ref(false);
const router = useRouter();
const products = ref([]);
const productStore = useProductStore();
const button = document.getElementsByTagName('button')[0];

// Método responsável por carregar os produtos
const loadProducts = async () => {
    products.value = await getProducts();
};

const addProductToCart = (product) => {
    if (!isLogged.value) {
        alert(MESSAGE.ALERT.CART.NEED_AUTHENTICATE);
        return router.push(PATH.LOGIN);
    }
    addToCart(product);
    alert(MESSAGE.SUCESS.CART.ADD);
};

const acessProduct = (id) => {
    productStore.save(id);
    router.push(`/products/${id}`);
};

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
        <ul id="container-products">
            <li
                @click="acessProduct(product._id)"
                id="product"
                v-for="product in products"
                :key="product._id">
                <div id="container-img-product">
                    <img
                        :src="product.imageUrl"
                        :alt="`imagem do ${product.name}`" />
                </div>
                {{ product.name }}
                <div id="info-numbers">
                    <p id="p-price">
                        R$ {{ Number.parseFloat(product.price).toFixed(2) }}
                    </p>
                </div>
                <button @click.stop="addProductToCart(product)">
                    Adicionar ao Carrinho
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    list-style: none;
    width: 100%;
}
li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;
    width: 100%;
    height: 100%;
    border-radius: 10px;

    color: var(--blue-smoke);

    background-color: #d9d9d9;
    transition: box-shadow 0.3s ease;
}

li:hover {
    animation: piscar 5s ease-in-out infinite 0.5s;
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
    width: 70vw;
}

img {
    width: 100%;
    height: 100%;
}

#container-img-product {
    width: 5rem;
    height: 8rem;

    margin-bottom: 1rem;
    border: 1px solid var(--xanadu);
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
    width: 100%;
    text-shadow: 1px 5px 10px var(--blue-smoke);
}

#container-products {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
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
