<script setup></script>

<template>
    <n-loading-bar-provider>
        <n-message-provider>
            <n-notification-provider>
                <n-modal-provider>
                    <n-dialog-provider>
                        <div>
                            <n-carousel
                                :key="card"
                                :effect="card"
                                :centered-slides="isCard"
                                :slides-per-view="isCard ? 'auto' : 1"
                                draggable
                                style="height: 240px">
                                <n-carousel-item
                                    v-for="n in 4"
                                    :key="n"
                                    :style="{ width: isCard ? '60%' : '100%' }">
                                    <img
                                        class="carousel-img"
                                        :src="`https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel${n}.jpeg`" />
                                </n-carousel-item>
                            </n-carousel>
                        </div>
                    </n-dialog-provider>
                </n-modal-provider>
            </n-notification-provider>
        </n-message-provider>
    </n-loading-bar-provider>
</template>

<style scoped>
.carousel-img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
