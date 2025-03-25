<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import PATH from '@/constants/PATH';
import NewestProduct from '@/components/NewestProduct.vue';
import IconContainer from '@/components/IconContainer.vue';
import { nextNewestItem, previousNewestItem } from '@/services/itemService';
import gsap from 'gsap';
import { PixiPlugin, ScrollTrigger, TextPlugin } from 'gsap/all';
import { checkRole } from '@/services/roleService';
import Button from '@/components/Button.vue';
import ICONS from '@/constants/ICONS.js';
import CATEGORIES from '@/constants/CATEGORIES';
import NEWESTPRODUCTS from '@/constants/NEWESTPRODUCTS';

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
    nextNewestItem(currentIndexItem, allNewestProducts, currentItem);

const goToPreviousProduct = () => {
    previousNewestItem(currentIndexItem, allNewestProducts, currentItem);
};

onMounted(() => {
    checkRole();
    window.addEventListener('resize', updateScreenSize);
    currentItem.value = NEWESTPRODUCTS[currentIndexItem.value];
    gsap.from('#banner-init', {
        x: -100,
        delay: 0.2,
        duration: 1.2,
        autoAlpha: 0,
        ease: 'expo.out',
    });
    gsap.to('h1', {
        duration: 5,
        text: 'Seu estilo começa pelo pulso. Seja destaque.',
    });
    gsap.from('#newest-products', {
        scrollTrigger: {
            trigger: '#newest-products',
            start: '-50px center',
            end: 'center center',
            toggleActions: 'restart pause resume pause',
            scrub: true,
        },
        x: -200,
        duration: 2,
        opacity: 0,
    });
    gsap.from('#about-company', {
        scrollTrigger: {
            trigger: '#about-company',
            start: '-50px center',
            end: 'center center',
            toggleActions: 'restart pause resume pause',
            scrub: true,
        },
        x: -200,
        duration: 2,
        opacity: 0,
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
                class="flex flex-col-reverse md:flex-row gap-4 w-[80%] min-w-[80%] justify-between items-center bg-xanadu rounded-xl">
                <div
                    class="flex flex-col gap-y-8 w-[80%] md:w-[50%] md:min-w-[50%] items-center md:h-[80%] justify-around">
                    <h1
                        class="text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl text-center w-full md:w-[90%]"></h1>
                    <div
                        class="flex flex-row items-center justify-between md:w-[70%] md:text-xl h-[7rem] md:h-[5rem]">
                        <p class="w-[50%] md:text-lg">
                            os principais modelos do mercado
                        </p>
                        <div class="w-px h-[3rem] md:h-[4.5rem] bg-black"></div>
                        <p class="text-center md:font-bold w-[35%]">
                            +100 clientes
                        </p>
                    </div>
                </div>
                <div class="min-w-[50%] h-full md:h-50%">
                    <img
                        class="w-full rounded-lg"
                        src="../assets/images/foto_banner_principal.png"
                        alt="" />
                </div>
            </section>

            <section id="newest-products" class="w-4/5">
                <div
                    class="flex flex-col items-center gap-6 text-center text-lg mb-24 md:mb-4">
                    <p class="text-title-section font-bold">Lançamentos</p>
                    <p class="text-sm">
                        Confira os novos produtos da nossa loja
                    </p>

                    <router-link :to="PATH.PRODUCTS.ROOT">
                        <Button button-name="Conferir"
                    /></router-link>
                </div>
                <div
                    v-if="screenWidth > 425"
                    class="flex flex-row justify-between h-[40%] md:h-[70%] md:items-center">
                    <NewestProduct
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
                <div class="text-center mb-8">
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
                                class="rounded-full object-cover"
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
