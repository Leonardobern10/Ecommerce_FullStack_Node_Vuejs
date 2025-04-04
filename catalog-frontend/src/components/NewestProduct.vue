<script setup>
import {
    defineProps,
    defineEmits,
    onMounted,
    onUnmounted,
    ref,
    computed,
} from 'vue';
import {
    calculatePixDiscount,
    viewFinancedValue,
} from '@/services/productService';

const emits = defineEmits(['nextItem', 'previousItem']);
const props = defineProps({ img: String, name: String, price: String });

const windowWidth = ref(window.innerWidth);
const pixPrice = computed(() => calculatePixDiscount(props.price));
const financedPrice = computed(() => viewFinancedValue(props.price));

const updateScreenSize = () => (windowWidth.value = window.innerWidth);
const emitNextItem = () => emits('nextItem');
const emitPreviousItem = () => emits('previousItem');

onMounted(() => window.addEventListener('resize', updateScreenSize));
onUnmounted(() => window.removeEventListener('resize', updateScreenSize));
</script>

<template>
    <div
        class="flex flex-row justify-between max-ml:h-full w-[13rem] max-ml:w-full h-[17rem] items-center sm:flex-col shadow-gray-500 bg-black/50 p-4 rounded-4xl hover:shadow-2xl hover:shadow-black">
        <button
            v-if="windowWidth <= 425"
            class="relative top-[0%] w-[20%] h-8 bg-transparent border-none"
            @click="emitPreviousItem">
            <img src="../assets/icons/left_arrow.svg" alt="Previous" />
        </button>
        <div
            class="flex flex-col justify-between items-center h-[full] max-ml:gap-0 gap-8 sm:w-[80%]">
            <div class="h-20 max-ml:h-30">
                <img
                    :src="img"
                    :alt="`Foto do ${name}`"
                    class="w-15 h-15 rounded-container" />
            </div>
            <div
                class="flex flex-col w-40 items-center text-center text-gray-200/50 leading-4 bkmid:gap-0 bkmid:h-full">
                <p
                    class="w-full text-base bkmid:text-sm font-semibold mt-6 md:mt-0 tracking-wide">
                    {{ name }}
                </p>
                <h3 class="text-base bkmid:text-2sm lg:text-lg font-regular">
                    R$ {{ pixPrice }}
                    <span class="text-base font-normal">no pix</span>
                </h3>
                <p class="w-full text-xs font-light lg:text-sm text-center">
                    ou {{ financedPrice }}
                </p>
            </div>
        </div>
        <button
            v-if="windowWidth <= 425"
            class="relative top-[0%] w-[20%] h-8 bg-transparent border-none"
            @click="emitNextItem">
            <img src="../assets/icons/right_arrow.svg" alt="Next" />
        </button>
    </div>
</template>

<style scoped>
.image-effect {
    box-shadow:
        5px 5px 5px white,
        -5px 5px 5px white,
        5px -5px 5px white,
        -5px -5px 5px white;
}
</style>
