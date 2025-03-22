<script setup>
import { ref } from 'vue';

const careersInfo = ref({
    title: 'Carreiras na ShopWatch - Venha fazer parte do nosso time!',
    description:
        'Na ShopWatch, buscamos talentos que queiram crescer conosco e transformar o mercado de relógios online. Se você é apaixonado por inovação, qualidade e atendimento ao cliente, venha fazer parte da nossa equipe!',
    benefits: [
        'Ambiente de trabalho dinâmico e inovador.',
        'Oportunidades de crescimento e desenvolvimento profissional.',
        'Benefícios exclusivos, incluindo planos de saúde e bem-estar.',
        'Horários flexíveis e possibilidade de trabalho remoto.',
        'Descontos especiais em produtos da loja.',
    ],
    jobOpenings: [
        {
            title: 'Desenvolvedor Full Stack Vue.js e Node.js',
            location: 'Remoto ou Escritório - São Paulo/SP',
            type: 'Tempo Integral',
            description:
                'Procuramos um desenvolvedor talentoso para criar e manter nossa plataforma de e-commerce. Necessário experiência com Vue.js, Node.js e bancos de dados relacionais.',
        },
        {
            title: 'Especialista em Marketing Digital',
            location: 'Remoto ou Escritório - Rio de Janeiro/RJ',
            type: 'Tempo Integral',
            description:
                'Buscamos um especialista para gerenciar campanhas de mídia paga, SEO e estratégias de marketing para expandir nossa presença digital.',
        },
        {
            title: 'Atendente de Suporte ao Cliente',
            location: 'Híbrido - Belo Horizonte/MG',
            type: 'Meio Período',
            description:
                'Se você gosta de ajudar clientes e tem boa comunicação, essa vaga é para você! Atendimento via chat, e-mail e telefone.',
        },
    ],
    applyText:
        'Se identificou com alguma das oportunidades? Envie seu currículo para nosso e-mail e venha fazer parte do time ShopWatch!',
});
</script>

<template>
    <div class="container">
        <h1>{{ careersInfo.title }}</h1>
        <p>{{ careersInfo.description }}</p>

        <h2>Benefícios de Trabalhar Conosco</h2>
        <ul>
            <li v-for="(benefit, index) in careersInfo.benefits" :key="index">
                {{ benefit }}
            </li>
        </ul>

        <h2>Oportunidades Abertas</h2>
        <div
            class="job-listing"
            v-for="(job, index) in careersInfo.jobOpenings"
            :key="index">
            <h3>{{ job.title }}</h3>
            <p><strong>Localização:</strong> {{ job.location }}</p>
            <p><strong>Tipo:</strong> {{ job.type }}</p>
            <p>{{ job.description }}</p>
        </div>

        <p class="apply">{{ careersInfo.applyText }}</p>
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
h2,
h3 {
    color: #333;
}
ul {
    padding-left: 20px;
}
.job-listing {
    border: 1px solid #ddd;
    padding: 15px;
    margin-top: 10px;
    border-radius: 5px;
    background: #f9f9f9;
}
.apply {
    margin-top: 15px;
    font-weight: bold;
    color: #555;
}
</style>
