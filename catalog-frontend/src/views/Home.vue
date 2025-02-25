<script setup>
// Este componente não precisa de lógica adicional por enquanto
</script>

<template>
    <div class="home">
        <h1>Bem-vindo ao nosso Catálogo de Produtos!</h1>
        <p>
            Explore nossos produtos e faça suas compras de maneira simples e
            rápida.
        </p>

        <router-link to="/products" class="link">Ver Produtos</router-link>
    </div>
</template>

<style scoped>
.home {
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

.link {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.link:hover {
    background-color: #0056b3;
}
</style>
