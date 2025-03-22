<script setup>
import { ref } from 'vue';

const deliveryInfo = ref({
    title: 'Entrega Rápida e Frete Grátis para Todo o Brasil',
    description:
        'Na ShopWatch, garantimos que seus relógios favoritos cheguem com rapidez e segurança até você. Oferecemos frete grátis para todo o Brasil, proporcionando comodidade e economia para nossos clientes.',
    benefits: [
        'Frete grátis para todas as regiões do Brasil.',
        'Entrega rápida e segura com transportadoras confiáveis.',
        'Código de rastreamento para acompanhar seu pedido em tempo real.',
        'Embalagens seguras para garantir a integridade do produto.',
        'Atendimento especializado para dúvidas sobre entrega.',
    ],
    estimatedTimes: [
        { region: 'Sul e Sudeste', time: '3 a 7 dias úteis' },
        { region: 'Centro-Oeste', time: '5 a 10 dias úteis' },
        { region: 'Norte e Nordeste', time: '7 a 15 dias úteis' },
    ],
    note: 'Os prazos podem variar conforme a localidade e a disponibilidade da transportadora.',
});
</script>

<template>
    <div class="container">
        <h1>{{ deliveryInfo.title }}</h1>
        <p>{{ deliveryInfo.description }}</p>

        <h2>Vantagens da Nossa Entrega</h2>
        <ul>
            <li v-for="(benefit, index) in deliveryInfo.benefits" :key="index">
                {{ benefit }}
            </li>
        </ul>

        <h2>Prazos Estimados de Entrega</h2>
        <table>
            <thead>
                <tr>
                    <th>Região</th>
                    <th>Prazo Estimado</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(region, index) in deliveryInfo.estimatedTimes"
                    :key="index">
                    <td>{{ region.region }}</td>
                    <td>{{ region.time }}</td>
                </tr>
            </tbody>
        </table>

        <p class="note">{{ deliveryInfo.note }}</p>
    </div>
</template>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}
h1,
h2 {
    color: #333;
}
ul {
    padding-left: 20px;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}
th,
td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}
th {
    background-color: #f4f4f4;
}
.note {
    margin-top: 15px;
    font-style: italic;
    color: #555;
}
</style>
