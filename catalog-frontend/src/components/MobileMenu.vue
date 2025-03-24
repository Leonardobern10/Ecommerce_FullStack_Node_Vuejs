<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>
<template>
    <nav class="navbar">
        <div class="logo">Meu Site</div>
        <button class="menu-toggle" @click="isOpen = !isOpen">☰</button>
        <ul :class="{ 'nav-links': true, open: isOpen }">
            <li><a href="#">Início</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Contato</a></li>
        </ul>
    </nav>
</template>

<style scoped>
/* Estilos básicos */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;
    padding: 15px 20px;
    color: white;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

/* Links de navegação */
.nav-links {
    display: flex;
    gap: 15px;
    list-style: none;
}

.nav-links a {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    transition: 0.3s;
}

.nav-links a:hover {
    color: #f0a500;
}

/* Botão do menu */
.menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.8rem;
    color: white;
    cursor: pointer;
}

/* Responsivo */
@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav-links {
        position: absolute;
        top: 60px;
        right: 0;
        background: #333;
        width: 100%;
        flex-direction: column;
        text-align: center;
        padding: 10px 0;
        display: none;
    }

    .nav-links.open {
        display: flex;
    }
}
</style>
