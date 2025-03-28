<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { nextNewestItem, previousNewestItem } from '@/services/itemService';
import { PixiPlugin, ScrollTrigger, TextPlugin } from 'gsap/all';
import { checkRole } from '@/services/roleService';
import NewestProduct from '@/components/NewestProduct.vue';
import IconContainer from '@/components/IconContainer.vue';
import Button from '@/components/Button.vue';
import PATH from '@/constants/PATH';
import ICONS from '@/constants/ICONS.js';
import CATEGORIES from '@/constants/CATEGORIES';
import NEWESTPRODUCTS from '@/constants/NEWESTPRODUCTS';
import { BannerImages } from '@/constants/BANNERIMAGES';

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
            markers: true,
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
});

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
});
</script>

<template>
    <div class="flex flex-col items-center w-full font-light">
        <div class="w-full flex flex-col items-center gap-y-15">
            <section
                id="banner-init"
                class="h-120 min-w-[90%] max-md:w-[90%] font-lato bg-no-repeat bg-cover mx-md:bg-contain bg-center bg-origin-border text-gray-200 blur-px rounded-3xl shadow-2xl shadow-gray-100/50 mt-10">
                <div
                    class="flex flex-col md:gap-y-6 w-[80%] md:w-[50%] md:min-w-[50%] items-center md:h-full max-md:px-6 justify-center">
                    <h1
                        class="tracking-tight font-bold text-4xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl text-left w-full md:w-[70%] bg-gradient-to-r to-black from-gray-300 bg-clip-text text-transparent animate-glow"></h1>
                    <p
                        class="text-xl md:w-[70%] neon-text text-white font-semibold">
                        {{ BannerImages[0].secondaryText }}
                    </p>
                </div>
            </section>

            <section class="w-4/5">
                <div
                    class="flex flex-col items-center gap-6 text-center text-lg mb-24 md:mb-4">
                    <p
                        class="text-lg text-title-section font-semibold text-white">
                        Lançamentos
                    </p>
                    <p class="text-lg font-light text-white">
                        Confira os novos produtos da nossa loja
                    </p>

                    <router-link :to="PATH.PRODUCTS.ROOT">
                        <Button button-name="Conferir"
                    /></router-link>
                </div>
                <div
                    v-if="screenWidth > 425"
                    class="flex flex-row justify-between h-[40%] md:h-[70%] md:items-center mt-16">
                    <NewestProduct
                        id="newest-products"
                        v-for="product in NEWESTPRODUCTS"
                        :key="product.name"
                        :img="product.image"
                        :name="product.name"
                        :price="product.price"
                        :screen-width="screenWidth" />
                </div>
                <div v-else class="mt-6">
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

            <section
                class="w-full py-8 bg-black text-white text-center lg:items-center">
                <div
                    class="flex flex-col md:flex-row items-center justify-around my-4 gap-y-4 w-full">
                    <IconContainer
                        id="about-company"
                        v-for="item in ICONS"
                        :key="item.title"
                        :icon="item.icon"
                        :title="item.title"
                        :content="item.content" />
                </div>
            </section>

            <section class="w-4/5 flex flex-col items-center gap-6">
                <div class="text-center mb-8 text-white">
                    <p class="text-lg text-title-section font-semibold">
                        Categorias
                    </p>
                    <p class="text-lg font-light">
                        Encontre o que está procurando
                    </p>
                </div>
                <div class="grid grid-cols-3 md:grid-cols-3 gap-6 mb-6">
                    <div
                        v-for="item in CATEGORIES"
                        :key="item.image"
                        class="flex flex-col items-center gap-2 lg:gap-16">
                        <div
                            class="w-30 h-80 lg:w-60 xl:w-60 lg:h-120 xl:h-120">
                            <img
                                class="rounded-full object-cover hover:border-4 hover:border-xanadu hover:scale-120"
                                :src="item.image"
                                :alt="item.text" />
                        </div>
                        <p class="text-lg">{{ item.text }}</p>
                    </div>
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
        text-shadow: 0 0 20px rgb(92, 92, 92);
    }
    100% {
        text-shadow: 0 0 5px #fff;
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
</style>
