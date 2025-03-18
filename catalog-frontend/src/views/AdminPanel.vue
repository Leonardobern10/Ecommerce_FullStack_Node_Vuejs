<template>
    <main id="view-admin-panel">
        <router-link class="object-panel" to="/products/add">
            Adicionar produto
        </router-link>
        <router-link class="object-panel" to="/edit/:id"
            >Editar produto</router-link
        >
        <router-link class="object-panel" to="/">Vendas</router-link>
        <router-link class="object-panel" to="/">Estoque</router-link>
        <router-link class="object-panel" to="/">Relatórios</router-link>
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
    gap: 1rem;
}

.object-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 23rem;
    height: 20rem;
    background-color: black;
    color: white;

    font-size: 4rem;

    text-decoration: none;
    text-align: center;
}
</style>
