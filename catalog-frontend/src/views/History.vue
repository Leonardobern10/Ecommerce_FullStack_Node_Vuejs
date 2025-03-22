<script setup>
import { ref } from 'vue';

const historyInfo = ref({
    title: 'Nossa História - A Jornada da ShopWatch',
    introduction:
        'Desde o início, a ShopWatch tem sido movida por uma paixão por relógios e inovação. Nossa missão é oferecer os melhores relógios com qualidade, estilo e tecnologia, sempre priorizando a experiência dos nossos clientes.',
    milestones: [
        {
            year: '2010',
            event: 'Fundação da ShopWatch por entusiastas do universo dos relógios.',
        },
        {
            year: '2013',
            event: 'Lançamento do nosso e-commerce, permitindo que clientes de todo o Brasil tivessem acesso aos melhores modelos do mercado.',
        },
        {
            year: '2017',
            event: 'Parceria com grandes marcas internacionais, trazendo produtos exclusivos para nosso catálogo.',
        },
        {
            year: '2020',
            event: 'Expansão dos serviços, incluindo atendimento premium, personalização de produtos e novas formas de pagamento.',
        },
        {
            year: '2023',
            event: 'Frete grátis para todo o Brasil e aprimoramento da experiência do cliente com novas tecnologias.',
        },
    ],
    mission:
        'Nossa missão é oferecer relógios de alta qualidade, aliando tecnologia, estilo e sofisticação, garantindo sempre a melhor experiência para nossos clientes.',
    vision: 'Ser referência no mercado de relógios online no Brasil, reconhecida pela inovação, excelência no atendimento e compromisso com a qualidade.',
    values: [
        'Compromisso com a qualidade',
        'Atendimento excepcional',
        'Inovação constante',
        'Respeito e transparência com os clientes',
        'Paixão pelo que fazemos',
    ],
});
</script>

<template>
    <div class="container">
        <h1>{{ historyInfo.title }}</h1>
        <p>{{ historyInfo.introduction }}</p>

        <h2>Nossa Jornada</h2>
        <ul>
            <li
                v-for="(milestone, index) in historyInfo.milestones"
                :key="index">
                <strong>{{ milestone.year }}:</strong> {{ milestone.event }}
            </li>
        </ul>

        <h2>Missão</h2>
        <p>{{ historyInfo.mission }}</p>

        <h2>Visão</h2>
        <p>{{ historyInfo.vision }}</p>

        <h2>Valores</h2>
        <ul>
            <li v-for="(value, index) in historyInfo.values" :key="index">
                {{ value }}
            </li>
        </ul>
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
</style>
