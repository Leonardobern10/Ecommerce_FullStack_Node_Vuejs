<script setup>
import { ref, onMounted, computed } from 'vue';
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

const getValueOnPix = (price) => Number(price - price * 0.05).toFixed(2);
const getValueFinanced = (price) => Number(price / 10).toFixed(2);
const presentationForValueFinanced = (price) =>
    `R$ ${Number(price).toFixed(2)} em até 10x de R$ ${getValueFinanced(price)}`;

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
                    <p class="p-price">
                        <strong>
                            R$
                            {{ getValueOnPix(product.price) }}</strong
                        >
                        no pix
                    </p>
                    <p class="p-price">
                        {{ presentationForValueFinanced(product.price) }}
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
