<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import PATH from '@/constants/PATH';
import NewestProduct from '@/components/NewestProduct.vue';
import IconContainer from '@/components/IconContainer.vue';
import iconClock from '../assets/icons/icon_clock.svg';
import iconHeadset from '../assets/icons/icon_headset.svg';
import iconTruck from '../assets/icons/icon_truck.svg';
import clockMetal from '../assets/images/clock_metal.png';
import clockWeather from '../assets/images/clock_weather.png';
import clockSmart from '../assets/images/clock_smartwatch.png';
import { nextNewestItem, previousNewestItem } from '@/services/itemService';
import gsap from 'gsap';
import { PixiPlugin, ScrollTrigger, TextPlugin } from 'gsap/all';
import { checkRole } from '@/services/roleService';

let screenWidth = ref(window.innerWidth);
let currentIndexItem = ref(0);
let currentItem = ref({});

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(PixiPlugin);

const icons = [
    {
        icon: iconClock,
        title: 'qualidade e quantidade',
        content: 'melhores modelos, lançamentos e as principais marcas.',
    },
    {
        icon: iconTruck,
        title: 'entrega rápida e grátis',
        content: 'frete grátis para todo o Brasil.',
    },
    {
        icon: iconHeadset,
        title: 'suporte 24 horas',
        content: 'tire suas dúvidas a qualquer momento.',
    },
];
const categories = [
    { image: clockWeather, text: 'couro' },
    { image: clockSmart, text: 'smart' },
    { image: clockMetal, text: 'metal' },
];
const allNewestProducts = [
    {
        name: 'Relógio Inteligente Tranya ES10',
        image: 'https://m.media-amazon.com/images/I/61Ktqu1XprL._AC_SL1500_.jpg',
        price: '152.95',
    },
    {
        name: 'Xiaomi Smart Band 9 Active',
        image: 'https://m.media-amazon.com/images/I/51WOvToYRFL._AC_SL1500_.jpg',
        price: '170.05',
    },
    {
        name: 'Relógio Analógico Technos Steel',
        image: 'https://m.media-amazon.com/images/I/61E7fAt9EHL._AC_SX679_.jpg',
        price: '288.80',
    },
];

const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
};
const nextItem = () =>
    nextNewestItem(currentIndexItem, allNewestProducts, currentItem);

const previousItem = () => {
    previousNewestItem(currentIndexItem, allNewestProducts, currentItem);
};

onMounted(() => {
    checkRole();
    window.addEventListener('resize', updateScreenSize);
    currentItem.value = allNewestProducts[currentIndexItem.value];
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

            <section class="w-4/5">
                <div
                    class="flex flex-col items-center gap-6 text-center text-lg mb-24 md:mb-4">
                    <p class="text-2xl font-bold">Lançamentos</p>
                    <p class="text-sm">
                        Confira os novos produtos da nossa loja
                    </p>
                    <button
                        class="bg-xanadu text-white p-2 rounded-lg hover:bg-blue-600">
                        <router-link :to="PATH.PRODUCTS.ROOT"
                            >Conferir</router-link
                        >
                    </button>
                </div>
                <div
                    v-if="screenWidth > 425"
                    class="flex flex-row justify-between h-[40%] md:h-[70%] md:items-center">
                    <NewestProduct
                        v-for="product in allNewestProducts"
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
                        @next-item="nextItem"
                        @previous-item="previousItem" />
                </div>
            </section>

            <section class="w-4/5 py-12 bg-black text-white text-center">
                <div class="flex flex-col gap-4">
                    <p class="text-lg">Sobre nós</p>
                    <p class="text-2xl font-semibold">
                        Peça agora e garanta seu estilo
                    </p>
                </div>
                <div
                    class="flex flex-col md:flex-row justify-around gap-6 mt-6">
                    <IconContainer
                        v-for="item in icons"
                        :key="item.title"
                        :icon="item.icon"
                        :title="item.title"
                        :content="item.content" />
                </div>
            </section>

            <section class="w-4/5 flex flex-col items-center gap-6">
                <div class="text-center">
                    <p class="text-lg">Categorias</p>
                    <p class="text-2xl font-semibold">
                        Encontre o que está procurando
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        v-for="item in categories"
                        :key="item.image"
                        class="flex flex-col items-center gap-2">
                        <img
                            class="w-32 h-32 object-cover rounded-full"
                            :src="item.image"
                            :alt="item.text" />
                        <p class="text-lg">{{ item.text }}</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
