<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { PixiPlugin, ScrollTrigger, TextPlugin } from 'gsap/all';
import NewestProduct from '@/components/NewestProduct.vue';
import IconContainer from '@/components/IconContainer.vue';
import { checkRole } from '@/services/roleService';
import { nextNewestItem, previousNewestItem } from '@/services/itemService';
import ICONS from '@/constants/ICONS.js';
import CATEGORIES from '@/constants/CATEGORIES';
import NEWESTPRODUCTS from '@/constants/NEWESTPRODUCTS';
import { BannerImages } from '@/constants/BANNERIMAGES';
import Rating from '@/components/Rating.vue';
import { ratings } from '@/constants/RATINGS';

const emit = defineEmits(['viewHeader']);
let screenWidth = ref(window.innerWidth);
let currentIndexItem = ref(0);
let currentItem = ref({});

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(PixiPlugin);

const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
};
const goToNextProduct = () =>
    nextNewestItem(currentIndexItem, NEWESTPRODUCTS, currentItem);

const goToPreviousProduct = () => {
    previousNewestItem(currentIndexItem, NEWESTPRODUCTS, currentItem);
};

const emitViewHeader = () => emit('viewHeader');
onMounted(() => {
    checkRole();
    window.addEventListener('resize', updateScreenSize);
    currentItem.value = NEWESTPRODUCTS[currentIndexItem.value];
    gsap.from('#banner-init', {
        x: -100,
        delay: 0.2,
        duration: 1.2,
        autoAlpha: 0.2,
        ease: 'expo.out',
    });
    gsap.to('h1', { duration: 5, text: 'Seu estilo começa pelo pulso.' });
    gsap.from('#newest-products', {
        scrollTrigger: {
            trigger: '#newest-products',
            start: '-100px center',
            end: '200px center',
            toggleActions: 'restart pause resume pause',
            onblur: 0,
        },
        x: -100,
        duration: 1,
    });
    gsap.from('#about-company', {
        scrollTrigger: {
            trigger: '#about-company',
            start: '-200px center',
            end: '200px center',
            toggleActions: 'restart pause resume pause',
        },
        x: -100,
        duration: 1,
    });
    emitViewHeader();
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
                class="banner-init font-lato bg-no-repeat bg-cover mx-md:bg-contain bg-center bg-origin-border text-gray-200 blur-px rounded-3xl">
                <div
                    class="flex flex-col items-center justify-between h-25 mt-12">
                    <h1
                        class="tracking-tight font-bold text-4xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl text-left bg-gradient-to-r to-black from-gray-300 bg-clip-text text-transparent animate-glow"></h1>
                    <p class="text-xl neon-text text-white font-semibold">
                        {{ BannerImages[0].secondaryText }}
                    </p>
                </div>
            </section>

            <section class="rounded-container categories max-h-full">
                <div class="flex flex-col w-full h-full gap-8">
                    <div
                        v-for="item in CATEGORIES"
                        :key="item.image"
                        class="flex flex-col items-center rounded-container bg-black/50">
                        <div
                            class="flex flex-row justify-between items-center gap-8 w-full h-[13rem]">
                            <img
                                class="rounded-container object-cover"
                                :src="item.image"
                                :alt="item.text" />
                            <p
                                class="text-4xl text-center rounded-container text-white w-[50%]">
                                {{ item.text }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                class="flex flex-row justify-evenly items-center services rounded-container bg-black/50 text-white text-center">
                <div
                    class="flex flex-col md:flex-row items-center justify-around">
                    <IconContainer
                        id="about-company"
                        v-for="item in ICONS"
                        :key="item.title"
                        :icon="item.icon"
                        :title="item.title"
                        :content="item.content" />
                </div>
            </section>

            <section class="newest rounded-container p-4">
                <div
                    v-if="screenWidth > 425"
                    class="w-full h-full grid grid-cols-2 grid-rows-2 place-items-center gap-6">
                    <NewestProduct
                        id="newest-products"
                        v-for="product in NEWESTPRODUCTS"
                        :key="product.name"
                        :img="product.image"
                        :name="product.name"
                        :price="product.price"
                        :screen-width="screenWidth" />
                </div>
                <div v-else class="">
                    <NewestProduct
                        :key="currentItem.name"
                        :img="currentItem.image"
                        :name="currentItem.name"
                        :price="currentItem.price"
                        :screen-width="screenWidth"
                        @next-item="goToNextProduct"
                        @previous-item="goToPreviousProduct" />
                </div>
            </section>

            <section class="rating rounded-container">
                <div
                    class="h-full w-full flex flex-col justify-evenly items-center">
                    <h3 class="text-gray-200 text-2xl">
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

.view-home {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 15rem) 8rem repeat(2, 15rem);
    gap: 40px;
    grid-template-areas:
        'banner-init banner-init banner-init categories categories'
        'banner-init banner-init banner-init categories categories'
        'services services services categories categories'
        'newest newest rating rating rating'
        'newest newest rating rating rating'
        'newest newest rating rating rating';
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
</style>
