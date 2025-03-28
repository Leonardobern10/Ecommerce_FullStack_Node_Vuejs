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
        class="flex flex-row justify-between items-center sm:h-fit sm:flex-col p-4 sm:gap-4 shadow-2xl shadow-black border-none rounded-4xl bg-white hover:shadow-gray-100/50 my-15">
        <button
            v-if="windowWidth <= 425"
            class="relative top-[40%] w-[10%] h-8 bg-transparent border-none"
            @click="emitPreviousItem">
            <img src="../assets/icons/left_arrow.svg" alt="Previous" />
        </button>
        <div
            class="flex flex-col justify-between items-center h-full bkmid:gap-0 gap-8 sm:w-[80%]">
            <div class="h-40">
                <img
                    :src="img"
                    :alt="`Foto do ${name}`"
                    class="w-32 sm:w-full" />
            </div>
            <div
                class="flex flex-col items-center text-center leading-4 bkmid:gap-0 bkmid:h-full">
                <p
                    class="w-full text-lg bkmid:text-sm lg:text-lg font-semibold mt-6">
                    {{ name }}
                </p>
                <h3 class="text-xl bkmid:text-2sm lg:text-lg font-bold">
                    R$ {{ pixPrice }}
                    <span class="text-sm font-normal">no pix</span>
                </h3>
                <p class="w-full text-xs font-light lg:text-sm text-center">
                    ou {{ financedPrice }}
                </p>
            </div>
        </div>
        <button
            v-if="windowWidth <= 425"
            class="relative top-[40%] w-[10%] h-8 bg-transparent border-none"
            @click="emitNextItem">
            <img src="../assets/icons/right_arrow.svg" alt="Next" />
        </button>
    </div>
</template>

<style scoped></style>
