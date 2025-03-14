<script setup>
defineProps({ icon: String, title: String, content: String });
</script>

<template>
    <div id="container">
        <div id="icon">
            <img :src="icon" alt="" />
        </div>
        <div>
            <p id="title">{{ title }}</p>
            <p id="content">{{ content }}</p>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 600px) {
    div {
        width: 8rem;
        height: 100%;
    }
    #container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        height: 100%;
        row-gap: 0.5px;
        line-height: 1rem;

        padding-bottom: 4rem;
    }
    #icon {
        width: 3rem;
        height: 3rem;
    }
    #title {
        color: #fff;
        font-size: 0.9rem;
        font-weight: 500;
        height: 2rem;
    }
    #content {
        color: #ffffff70;
        font-size: 0.7rem;
        font-weight: 100;
        text-align: center;
        height: 2rem;
    }
}
@media (min-width: 600px) {
    #container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 20rem;
        row-gap: 0.7px;
        line-height: 1rem;
    }
    #icon {
        width: 7rem;
        height: 150px;
    }

    #title {
        color: #fff;
        font-size: 1.3rem;
        font-weight: 500;
    }
    #content {
        color: #ffffff70;
        font-size: 1rem;
        font-weight: 100;
    }
}
</style>
