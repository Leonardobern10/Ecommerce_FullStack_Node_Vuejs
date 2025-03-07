<script setup>
import PATH from '@/constants/PATH';
</script>

<template>
    <div class="home">
        <h1>Bem-vindo ao nosso Catálogo de Produtos!</h1>
        <p>
            Explore nossos produtos e faça suas compras de maneira simples e
            rápida.
        </p>

        <router-link :to="PATH.PRODUCTS.ROOT" id="link"
            >Ver Produtos</router-link
        >
    </div>
</template>

<style scoped>
.home {
    font-weight: 300;
    text-align: center;
    margin-top: 50px;
}

h1 {
    font-size: 2rem;
    color: #333;
}

p {
    font-size: 1.2rem;
    color: #666;
}

#link {
    text-decoration: none;
    display: inline-block;
    background-color: var(--green-spring);
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    margin: 2rem;
    border-radius: 10px;
    transition: background-color 0.3s ease-in;
}

#link:hover {
    cursor: pointer;
    background-color: var(--xanadu);
}
</style>
