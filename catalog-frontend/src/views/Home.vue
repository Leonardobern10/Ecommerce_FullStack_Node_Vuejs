<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import NewestProduct from '@/components/NewestProduct.vue';
import IconContainer from '@/components/IconContainer.vue';
import Rating from '@/components/Rating.vue';
import { checkRole } from '@/services/roleService';
import { nextNewestItem, previousNewestItem } from '@/services/itemService';
import ICONS from '@/constants/ICONS.js';
import CATEGORIES from '@/constants/CATEGORIES';
import NEWESTPRODUCTS from '@/constants/NEWESTPRODUCTS';
import { BannerImages } from '@/constants/BANNERIMAGES';
import { ratings } from '@/constants/RATINGS';
import { toSlideEffect } from '@/effects/toLeftEffect';
import { toDigitEffect } from '@/effects/toDigitEffect';
import { toScrollEffect } from '@/effects/toScrollEffect';
import PATH from '@/constants/PATH';
import { useCategoryStore } from '@/store/useCategoryStore';
import axios from 'axios';
import { getNewestProducts } from '@/services/productService';

// Values
let screenWidth = ref(window.innerWidth);
let currentIndexItem = ref(0);
let currentItem = ref({});
const categoryStore = useCategoryStore();
const newestProducts = ref([]);

//Methods
const router = useRouter();
const updateScreenSize = () => (screenWidth.value = window.innerWidth);
const goToNextProduct = () =>
    nextNewestItem(currentIndexItem, NEWESTPRODUCTS, currentItem);
const goToPreviousProduct = () =>
    previousNewestItem(currentIndexItem, NEWESTPRODUCTS, currentItem);
const redirectToList = async (type) => {
    categoryStore.save(type);
    router.push(PATH.PRODUCTS.ROOT);
};

const updateNewestProducts = async () =>
    (newestProducts.value = await getNewestProducts());

onMounted(async () => {
    checkRole();
    window.addEventListener('resize', updateScreenSize);
    currentItem.value = NEWESTPRODUCTS[currentIndexItem.value];
    toSlideEffect('#banner-init', '-100px');
    toDigitEffect('h1', 'Seu estilo começa pelo pulso.');
    toScrollEffect('#newest-products', '-150px');
    toScrollEffect('#about-company', '-200px');
    toSlideEffect('.categories', '200px');
    await updateNewestProducts();
});

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
});
</script>

<template>
    <div class="w-full font-light p-8 font-lato">
        <div class="view-home">
            <section
                id="banner-init"
                class="banner-init font-lato max-md:h-100 bg-no-repeat bg-cover bg-center bg-origin-border text-gray-200 blur-px rounded-3xl">
                <div
                    class="flex flex-col items-center justify-between max-md:justify-start h-25 max-md:h-full max-md:w-full ml:mt-12 max-md:p-4">
                    <h1
                        class="tracking-tight font-bold text-4xl max-md:text-2xl md:text-3xl xl:text-4xl 2xl:text-4xl text-left neon-text"></h1>
                    <p
                        class="text-xl max-md:h-full max-md:text-sm neon-text text-white font-semibold">
                        {{ BannerImages[0].secondaryText }}
                    </p>
                </div>
            </section>

            <section class="rounded-container categories">
                <div
                    class="flex flex-col md:justify-between w-full gap-8 md:gap-4">
                    <div
                        v-for="item in CATEGORIES"
                        :key="item.image"
                        @click="redirectToList(item.text.toUpperCase())"
                        class="flex flex-col items-center rounded-container max-ml:h-30 bg-black/50 hover:scale-90 transition-transform duration-300 hover:skew-1 hover:bg-black/70 hover:cursor-pointer">
                        <div
                            class="flex flex-row justify-between items-center w-full h-[10rem] max-ml:h-30">
                            <div class="max-md:w-full w-60 h-full">
                                <img
                                    class="rounded-container object-cover w-full h-full"
                                    :src="item.image"
                                    :alt="item.text" />
                            </div>
                            <p
                                class="text-4xl max-lg:text-lg p-6 text-center rounded-container text-white w-[50%] max-md:w-full">
                                {{ item.text }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                class="flex flex-row justify-evenly items-center services rounded-container bg-black/50 text-white text-center">
                <div
                    class="flex flex-row items-center justify-around lg:justify-between w-full max-ml:w-full max-ml:pt-4">
                    <IconContainer
                        id="about-company"
                        v-for="item in ICONS"
                        :key="item.title"
                        :icon="item.icon"
                        :title="item.title"
                        :content="item.content" />
                </div>
            </section>

            <section
                class="newest max-md:items-center rounded-container p-4 md:p-0">
                <div
                    v-if="screenWidth > 425"
                    class="w-full h-full grid grid-cols-2 md:bg-black/50 md:rounded-container grid-rows-2 place-items-center gap-2">
                    <NewestProduct
                        id="newest-products"
                        v-for="product in newestProducts"
                        :key="product._id"
                        :img="product.imageUrl"
                        :name="product.name"
                        :price="product.price"
                        :item-id="product._id"
                        :screen-width="screenWidth" />
                </div>
                <div v-else class="newest-ml">
                    <NewestProduct
                        :key="currentItem._id"
                        :img="currentItem.image"
                        :name="currentItem.name"
                        :price="currentItem.price"
                        :item-id="product._id"
                        :screen-width="screenWidth"
                        @next-item="goToNextProduct"
                        @previous-item="goToPreviousProduct" />
                </div>
            </section>

            <section class="rating rounded-container">
                <div
                    class="h-full w-full flex flex-col justify-evenly items-center">
                    <h3 class="text-gray-200 text-2xl mb-6">
                        O que nossos clientes dizem?
                    </h3>
                    <Rating
                        v-for="rate in ratings"
                        :key="rate.id"
                        :name="rate.nome"
                        :image="rate.image"
                        :content="rate.content"
                        :rate="rate.rate" />
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
@layer components {
    @media (max-width: 768px) {
        #banner-init {
            background-image: url('../assets/images/clock_banner_mobile.png');
        }
    }
    @media (min-width: 768px) {
        #banner-init {
            background-image: url('../assets/images/banner_img5.jpg');
        }
    }
}
@keyframes glow {
    0% {
        text-shadow: 0 0 5px #0f0f0f;
    }
    50% {
        text-shadow: 0 0 20px rgb(39, 38, 38);
    }
    100% {
        text-shadow: 0 0 5px #000000;
    }
}
.animate-glow {
    animation: glow 3s 3s infinite alternate ease-in-out;
}
.neon-text {
    text-shadow:
        0 0 5px #878a8a,
        0 0 10px #878a8a,
        0 0 20px #878a8a;
}
.banner-shadow {
    animation: bright 5s linear infinite alternate;
}
@keyframes bright {
    0% {
        box-shadow:
            10px 10px 50px #cdcdcdbf,
            10px -10px 50px #cdcdcdbf,
            -10px 10px 50px #cdcdcdbf,
            -10px -10px 50px #cdcdcdbf;
    }
    50% {
        box-shadow:
            0px 0px 80px #656565,
            0px 0px 60px #656565,
            0px 0px 40px #656565,
            0px 0px 20px #656565;
    }
    100% {
        box-shadow:
            10px 10px 50px #878a8a,
            10px -10px 50px #878a8a,
            -10px 10px 50px #878a8a,
            -10px -10px 50px #878a8a;
    }
}

.banner-init {
    grid-area: banner-init;
}
.newest {
    grid-area: newest;
}
.services {
    grid-area: services;
}
.categories {
    grid-area: categories;
}
.rating {
    grid-area: rating;
}

@media (max-width: 768px) {
    .view-home {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
    }
}
@media (min-width: 768px) {
    .view-home {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 15rem) 8rem repeat(2, 15rem);
        gap: 40px;
        grid-template-areas:
            'banner-init banner-init banner-init categories categories'
            'banner-init banner-init banner-init categories categories'
            'services services services services services'
            'newest newest rating rating rating'
            'newest newest rating rating rating'
            'newest newest rating rating rating';
    }
}
.newest-ml {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 2px soid black;

    width: 100%;
}
</style>
