<template>
    <div id="container">
        <div id="container-img">
            <img src="../assets/images/relogio_newest_example.svg" alt="" />
        </div>
        <div id="container-description">
            <p id="product-name">Relógio Gold Edition</p>
            <h3 id="product-price">R$ 540.99</h3>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 600px) {
    #container {
        width: 70%;
    }
}
@media (min-width: 600px) {
    #container {
        width: 20%;
        column-gap: 1rem;
    }
}
#container-description {
    text-align: start;
    line-height: 0.7rem;
}
#container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}
</style>
