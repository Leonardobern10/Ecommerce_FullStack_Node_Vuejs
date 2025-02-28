<script setup>
import { computed } from 'vue';

defineProps(['name', 'price', 'quantity', 'imageUrl']);
</script>

<template>
    <div id="container">
        <div id="container-img">
            <img :src="imageUrl" :alt="'foto de ' + name" />
        </div>
        <div id="description">
            <h3>{{ name }}</h3>
            <div id="info-numbers">
                <p>
                    <strong>
                        R$
                        {{
                            computed(() =>
                                Number.parseFloat(price * quantity).toFixed(2),
                            )
                        }}</strong
                    >
                </p>
                <p>Quantidade: {{ quantity }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
#container {
    height: 7rem;
    width: 35rem;
    max-width: 40rem;

    border: 2px solid black;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

#container-img {
    width: 3rem;
    height: 80%;
}
img {
    width: 100%;
    height: 100%;
}

#info-numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#description {
    width: 50%;
}
</style>
