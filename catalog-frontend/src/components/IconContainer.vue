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
div {
    width: 15rem;
    height: 100%;
}
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

img {
    width: 100%;
    height: 100%;
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
</style>
