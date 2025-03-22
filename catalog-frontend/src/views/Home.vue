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
import changeItem from '@/services/itemService';
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
        content:
            'os melhores modelos, lançamentos e as principais marcas para garatir seu estilo.',
    },
    {
        icon: iconTruck,
        title: 'entrega rápida e grátis',
        content:
            'frete grátis para todo o Brasil, com entrega aproximada de, no máximo, 5 dias.',
    },
    {
        icon: iconHeadset,
        title: 'suporte 24 horas',
        content:
            'tire suas dúdivas à qualquer momento, em qualquer dia, com respostas em tempo real.',
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
const nextItem = () => {
    currentItem = changeItem(
        'next',
        currentIndexItem,
        allNewestProducts,
        currentItem,
    );
};
const previousItem = () => {
    currentItem = changeItem(
        'previous',
        currentIndexItem,
        allNewestProducts,
        currentItem,
    );
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
    gsap.to('imagem-banner', { duration: 1, pixi: { hue: 180 } });
});

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
});
</script>

<template>
    <div class="home">
        <div id="container-home">
            <section id="banner-init">
                <div id="container-text-presentation">
                    <h1></h1>
                    <div id="shop-description">
                        <p>os principais modelos do mercado</p>
                        <div id="line-vertical"></div>
                        <p><span>+100</span> clientes</p>
                    </div>
                </div>
                <div id="container-img">
                    <img
                        id="imagem-banner"
                        src="../assets/images/foto_banner_principal.png"
                        alt="" />
                </div>
            </section>
            <section id="newest-products">
                <div id="container-newest">
                    <div id="container-info-newest">
                        <p id="title-newest"><strong>Lançamentos</strong></p>
                        <p id="text-newest">
                            Confira os novos produtos da nossa loja
                        </p>
                        <button>
                            <router-link
                                id="button-link"
                                :to="PATH.PRODUCTS.ROOT"
                                >Conferir</router-link
                            >
                        </button>
                    </div>
                    <NewestProduct
                        v-if="screenWidth < 600"
                        @next-item="nextItem"
                        @previous-item="previousItem"
                        :img="currentItem.image"
                        :price="currentItem.price"
                        :name="currentItem.name" />
                    <NewestProduct
                        v-else
                        v-for="product in allNewestProducts"
                        :key="product.name"
                        :img="product.image"
                        :name="product.name"
                        :price="product.price"
                        :screen-width="screenWidth" />
                </div>
            </section>
            <section id="about-company">
                <div id="container-about-company">
                    <div id="container-about-company-description">
                        <p>sobre nós</p>
                        <p>peça agora e garanta seu estilo</p>
                    </div>
                    <div id="container-icons">
                        <IconContainer
                            v-for="item in icons"
                            :key="item.title"
                            :icon="item.icon"
                            :title="item.title"
                            :content="item.content" />
                    </div>
                </div>
            </section>
            <section id="category">
                <div id="category-description">
                    <p>categorias</p>
                    <p>encontre o que está procurando</p>
                </div>
                <div id="container-category">
                    <div
                        v-for="item in categories"
                        :key="item.image"
                        class="category-type">
                        <img :src="item.image" :alt="item.text" />
                        <p>{{ item.text }}</p>
                    </div>
                </div>
            </section>
            <!--
                <section id="reviews">
                    <div>
                        <p></p>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </section>
            -->
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 600px) {
    #banner-init {
        flex-direction: column-reverse;
        width: 100%;
        border-radius: 20px;
    }
    #container-text-presentation {
        width: 100%;
    }
    h1 {
        margin: 2rem 0;
        width: 70%;
        font-size: 1.7rem;
    }
    #shop-description {
        width: 80%;
        padding: 0 1rem;
    }
    #shop-description p:first-child {
        font-size: 1rem;
        width: 40%;
    }
    span {
        font-size: 1.7rem;
        font-weight: 400;
        width: 40%;
    }
    #container-img {
        width: 100%;
    }
    #newest-products {
        width: 100%;
        height: 100%;
    }
    #container-newest {
        flex-direction: column;
        row-gap: 3rem;
    }
    #container-info-newest {
        align-items: center;
        width: 100%;
        height: 40%;
        row-gap: 2rem;
    }
    #text-newest {
        width: 80%;
        font-size: 1rem;
    }
    button {
        padding: 0.3rem 1rem;
        font-size: 1rem;
        margin-bottom: 1rem;
    }
    #about-company {
        padding-bottom: 8rem;
        width: 100%;
        height: 100%;
        background:
            linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)),
            url('../assets/images/man_style_photo_2.svg') top center no-repeat,
            url('../assets/images/man_style_photo_1.svg') bottom center
                no-repeat;
    }
    #container-about-company {
        row-gap: 4rem;
    }
    #container-icons {
        width: 100%;
        flex-direction: column;
    }
    #category {
        width: 80%;
        row-gap: 8rem;
    }
    #container-category {
        height: 100%;
        row-gap: 3rem;
        flex-direction: column;
    }
    #category-description {
        row-gap: 1rem;
    }
}
@media (min-width: 600px) {
    #banner-init {
        height: 80%;
        width: 80%;
        flex-direction: row;

        background: linear-gradient(
            90deg,
            rgba(117, 128, 112, 1) 0%,
            rgba(0, 0, 0, 1) 100%,
            rgba(115, 128, 122, 1) 53%
        );
        border-radius: 5px;
        box-shadow: 0 20px 20px #00000094;
    }
    #container-text-presentation {
        width: 50%;
        height: 70%;
    }
    h1 {
        font-size: clamp(1.5rem, 2rem, 3rem);
        width: 80%;
    }
    #shop-description {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 70%;
        font-size: clamp(1rem, 1.5rem, 2rem);
    }
    #shop-description p:first-child {
        font-size: 1.5rem;
    }
    span {
        font-size: 2rem;
        font-weight: 400;
    }
    #container-img {
        width: 50%;
        height: 100%;
        border-radius: 15px;
    }
    #newest-products {
        width: 90%;
        height: 100%;
    }
    #container-newest {
        flex-direction: row;
        height: 100%;
        width: 100%;
    }
    #container-info-newest {
        align-items: flex-start;
        width: 20%;
        height: 60%;
    }
    #text-newest {
        height: 100%;
        padding: 1rem 0;
        width: 70%;
        font-size: 1.2rem;
    }
    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        transition: background-color 0.3s ease-in;
    }
    button:hover {
        cursor: pointer;
        background-color: var(--xanadu);
    }
    #about-company {
        width: 100%;
        height: 100vh;
        background:
            linear-gradient(to top, rgb(0, 0, 0.1), rgba(0, 0, 0, 0.2)),
            url('../assets/images/man_style_photo_2.svg') left center no-repeat,
            url('../assets/images/man_style_photo_1.svg') right center no-repeat;
    }
    #container-about-company {
        row-gap: 1rem;
        padding: 1rem 0;
    }
    #container-icons {
        width: 70rem;
        flex-direction: row;
    }
    #category {
        width: 100%;
        height: 100vh;
        row-gap: 15rem;
    }
    #category-description {
        color: #000;
        display: flex;
        flex-direction: column;
    }
    #container-category {
        flex-direction: row;
        height: 28rem;
        background-color: var(--xanadu);

        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    #category-description {
        row-gap: 3rem;
    }
}
.home {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 100%;
    font-weight: 300;
    text-align: center;
    margin-top: 1rem;
}
#container-home {
    width: 100%;

    display: flex;
    flex-direction: column;
    row-gap: 8rem;
    justify-content: space-between;
    align-items: center;
}
#banner-init {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: linear-gradient(
        300deg,
        rgb(0, 0, 0),
        var(--xanadu),
        rgb(0, 0, 0)
    );
    background-size: 180% 180%;
    animation: gradient-animation 18s ease infinite;
}
#container-text-presentation {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    color: #000000a4;
}
h1 {
    font-family: 'BioRhyme', serif;
    font-weight: 400;
    color: #000000a4;
}
#shop-description {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 2rem;
    align-items: center;

    padding-right: 2rem;
    margin-bottom: 3rem;
}
#shop-description p:first-child {
    width: fit-content;
    line-height: 1.5rem;
}
#shop-description p:last-child {
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 1.5rem;
}
#line-vertical {
    content: '|';
    width: 2px;
    height: 4rem;

    background-color: #000;
}
#container-img {
    height: 100%;
}
#container-newest {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#container-info-newest {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    letter-spacing: 0.3px;
}
#title-newest {
    text-align: start;
    line-height: 1rem;
    font-size: 2rem;
    margin: 0;
}
#text-newest {
    text-align: start;
}
button {
    align-self: center;
    background-color: var(--green-spring);
    color: #fff;
    border: none;
    border-radius: 10px;
}
#about-company {
    margin: 0;
    padding: 0;

    background-color: var(--xanadu);
    background-repeat: no-repeat;
    background-size: contain;
    background-clip: border-box;
}
#container-about-company {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    line-height: 2rem;
}
#container-icons {
    display: flex;

    justify-content: space-between;
    align-items: center;
}
#container-about-company-description {
    display: flex;
    flex-direction: column;
    row-gap: 0.1px;

    padding-top: 5rem;

    color: #fff;
}
#container-about-company-description p:first-child {
    font-size: 2.5rem;
    font-weight: 700;
}
#container-about-company-description p:last-child {
    font-weight: 200;
    color: #ffffff77;
    font-size: 1rem;
}
#category {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
}
#category-description {
    display: flex;
    flex-direction: column;
    color: #000;
}
#container-category {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
#category-description p:first-child {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 0.7rem;
}
.category-type p {
    font-size: 1.2rem;
}
#button-link {
    text-decoration: none;
    color: inherit;
}
</style>
