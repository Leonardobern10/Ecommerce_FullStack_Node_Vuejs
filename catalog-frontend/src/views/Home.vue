<script setup>
import PATH from '@/constants/PATH';
import images from '@/constants/IMAGES';
import NewestProduct from '@/components/NewestProduct.vue';
import IconContainer from '@/components/IconContainer.vue';
import iconClock from '../assets/icons/icon_clock.svg';
import iconHeadset from '../assets/icons/icon_headset.svg';
import iconTruck from '../assets/icons/icon_truck.svg';
import clockMetal from '../assets/images/clock_metal.png';
import clockWeather from '../assets/images/clock_weather.png';
import clockSmart from '../assets/images/clock_smartwatch.png';
import { onMounted, onUnmounted, ref } from 'vue';

let screenWidth = ref(window.innerWidth);
let currentIndexItem = ref(0);
let currentItem = ref({});

const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
};

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

const nextItem = () => {
    currentIndexItem.value =
        currentIndexItem.value < allNewestProducts.length - 1
            ? currentIndexItem.value + 1
            : 0;
    currentItem.value = allNewestProducts[currentIndexItem.value];
    console.log(currentIndexItem);
};

const previousItem = () => {
    currentIndexItem.value =
        currentIndexItem.value > 0
            ? currentIndexItem.value - 1
            : allNewestProducts.length - 1;
    currentItem.value = allNewestProducts[currentIndexItem.value];
    console.log(currentIndexItem);
};

onMounted(() => {
    window.addEventListener('resize', updateScreenSize);
    currentItem.value = allNewestProducts[currentIndexItem.value];
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
                    <h1>Seu estilo começa pelo pulso.</h1>
                    <div id="shop-description">
                        <p>os principais modelos do mercado</p>
                        <div id="line-vertical"></div>
                        <p><span>+100</span> clientes</p>
                    </div>
                </div>
                <div id="container-img">
                    <img
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
    }
    #container-text-presentation {
        width: 100%;
    }
    h1 {
        font-size: 2rem;
    }
    #shop-description {
        width: 70%;
    }
    #shop-description p:first-child {
        font-size: 1.2rem;
    }
    #container-img {
        width: 100%;
    }
    #container-newest {
        flex-direction: column;
    }
    #container-info-newest {
        align-items: center;
        width: 100%;
    }
    #text-newest {
        width: 100%;
        font-size: 1rem;
    }
    button {
        padding: 0.3rem 1rem;
        font-size: 1rem;
        margin-bottom: 1rem;
    }
    #about-company {
        width: 100%;
        background:
            linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1)),
            url('../assets/images/man_style_photo_2.svg') top center no-repeat,
            url('../assets/images/man_style_photo_1.svg') bottom center
                no-repeat;
    }
    #container-about-company {
        row-gap: 3rem;
    }
    #container-icons {
        width: 100%;
    }
    #category {
        width: 80%;
    }
    #container-category {
        height: 100%;
        row-gap: 0.7rem;
        flex-direction: column;
    }
}
@media (min-width: 600px) {
    #banner-init {
        width: 80%;
        flex-direction: row;
    }
    #container-text-presentation {
        width: 50%;
    }
    h1 {
        font-size: 3rem;
    }
    #shop-description {
        width: 60%;
        font-size: 1.5rem;
    }
    #shop-description p:first-child {
        font-size: 1.7rem;
    }
    #container-img {
        width: 50%;
    }
    #container-newest {
        flex-direction: row;
    }
    #container-info-newest {
        align-items: flex-start;
        width: 20%;
    }
    #text-newest {
        width: 70%;
        font-size: 1.2rem;
    }
    button {
        padding: 0.5rem 2rem;
        font-size: 1.2rem;
        transition: background-color 0.3s ease-in;
    }
    button:hover {
        cursor: pointer;
        background-color: var(--xanadu);
    }
    #about-company {
        width: 101.8%;
        background:
            linear-gradient(to top, rgb(0, 0, 0.1), rgba(0, 0, 0, 0.2)),
            url('../assets/images/man_style_photo_2.svg') left center no-repeat,
            url('../assets/images/man_style_photo_1.svg') right center no-repeat;
    }
    #container-about-company {
        row-gap: 5rem;
        padding-bottom: 5rem;
    }
    #container-icons {
        width: 65rem;
    }
    #category {
        width: 101.8%;
    }
    #category-description {
        color: #000;
    }
    #container-category {
        flex-direction: row;
        height: 28rem;
        background-color: var(--xanadu);

        display: flex;
        justify-content: space-around;
        align-items: center;
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
    row-gap: 3rem;
    justify-content: space-between;
    align-items: center;
}
#banner-init {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    background-color: var(--xanadu);
    border-radius: 20px;
}
#container-text-presentation {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    text-align: left;
    color: #000;
}
h1 {
    width: 85%;
    font-family: 'BioRhyme', serif;
    font-weight: 400;
    color: #000000;
}
#shop-description {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 2rem;
    align-items: center;

    padding-right: 2rem;
    margin-bottom: 4rem;
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
span {
    font-size: 2rem;
    font-weight: 400;
}
#container-img {
    height: 100%;
}
#newest-products {
    width: 80%;
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

    height: 40%;

    letter-spacing: 0.1px;
}
#title-newest {
    text-align: start;
    line-height: 0.2rem;
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
    height: 100%;
    margin: 0;
    padding: 0;

    background-color: #000000d3;
    background-repeat: no-repeat;
    background-size: contain;
    background-clip: border-box;
}
#container-about-company {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
#container-icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
#container-about-company-description {
    margin-top: 2rem;
    line-height: 0.1rem;
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
    row-gap: 8rem;
}
#category-description {
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
