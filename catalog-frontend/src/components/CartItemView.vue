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
    height: 100%;
    width: 35rem;

    padding: 1rem;

    box-shadow:
        4px 4px 4px var(--blue-smoke),
        -4px 4px 4px var(--blue-smoke);
    background-color: #d9d9d9;
    border-radius: 15px;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

#container-img {
    border: 1px solid var(--blue-smoke);
    width: 20%;
    height: 10rem;
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
    color: var(--blue-smoke);
}
</style>
