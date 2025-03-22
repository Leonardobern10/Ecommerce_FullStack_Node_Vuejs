<script setup></script>

<template>
    <div class="about">
        <section class="hero">
            <h1>Sobre Nós</h1>
            <p>Precisão e elegância no tempo. Conheça nossa história.</p>
        </section>

        <section class="content">
            <div class="info">
                <h2>Quem Somos</h2>
                <p>
                    O <strong>Time ShopWatch </strong> surgiu em 2015, quando
                    dois amigos apaixonados por relojoaria, Leonardo Vasconcelos
                    e Marco Almeida, decidiram transformar sua paixão em um
                    negócio. Inspirados pelas tradições suíças e pela
                    sofisticação do design contemporâneo, eles perceberam que o
                    mercado carecia de uma marca que unisse qualidade, elegância
                    e acessibilidade. O que começou como um pequeno e-commerce
                    com uma curadoria de marcas renomadas logo evoluiu para uma
                    marca própria. Após anos estudando materiais, mecanismos e
                    tendências, a Time Elegance lançou sua primeira coleção
                    exclusiva em 2018, trazendo ao mercado relógios com design
                    refinado e tecnologia de ponta.
                </p>
            </div>

            <div class="info">
                <h2>Nossa Missão</h2>
                <p>
                    Acreditamos que um relógio não é apenas um acessório, mas
                    uma extensão da personalidade de quem o usa. Nossa missão é
                    oferecer precisão, durabilidade e estilo, garantindo que
                    cada cliente encontre o relógio ideal para seu dia a dia ou
                    momentos especiais. Trabalhamos com os melhores fornecedores
                    e investimos em inovação para entregar peças que combinam
                    tradição e modernidade. Hoje, a Time Elegance atende
                    clientes em todo o Brasil, mantendo-se fiel ao compromisso
                    de qualidade e sofisticação. Nosso time está sempre em busca
                    de novas inspirações e tecnologias para continuar
                    proporcionando a melhor experiência para os amantes do
                    tempo.
                </p>
            </div>
        </section>
    </div>
</template>

<style scoped>
.about {
    font-family: Arial, sans-serif;
    color: #333;
    text-align: center;
}

.hero {
    background-color: var(--xanadu);
    color: white;
    padding: 2rem;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
}

.info {
    background: #d9d9d9;
    padding: 1.5rem;
    border-radius: 10px;
}
</style>
