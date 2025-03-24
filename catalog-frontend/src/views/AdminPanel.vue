<script setup>
import PATH from '@/constants/PATH';
</script>

<template>
    <main id="view-admin-panel">
        <router-link class="object-panel" to="/products/add">
            Adicionar produto
        </router-link>
        <router-link class="object-panel" to="/products/edit"
            >Editar produto</router-link
        >
        <router-link class="object-panel" :to="PATH.PRODUCTS.REMOVE"
            >Remover produto</router-link
        >
        <router-link v-if="1 < 0" class="object-panel" to="/"
            >Vendas</router-link
        >
        <router-link v-if="1 < 0" class="object-panel" to="/"
            >Estoque</router-link
        >
        <router-link v-if="1 < 0" class="object-panel" to="/"
            >Relatórios</router-link
        >
    </main>
</template>

<style scoped>
#view-admin-panel {
    margin-top: 5rem;

    font-family: 'BioRhyme', serif;

    height: 100%;
    width: 100%;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;
    gap: 1rem;
}

.object-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 15rem;
    background-color: var(--xanadu);
    color: white;

    font-size: clamp(1rem, 2rem, 2.5rem);

    text-decoration: none;
    text-align: center;
}
</style>
