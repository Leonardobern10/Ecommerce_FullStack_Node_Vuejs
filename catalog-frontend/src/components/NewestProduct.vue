<script setup>
import {
    calculatePixDiscount,
    viewFinancedValue,
} from '@/services/productService';
import {
    defineProps,
    defineEmits,
    onMounted,
    onUnmounted,
    ref,
    computed,
} from 'vue';

const emits = defineEmits(['nextItem', 'previousItem']);
const props = defineProps({ img: String, name: String, price: String });
const windowWidth = ref(window.innerWidth);

const updateScreenSize = () => (windowWidth.value = window.innerWidth);
const emitNextItem = () => emits('nextItem');
const emitPreviousItem = () => emits('previousItem');

const pixPrice = computed(() => calculatePixDiscount(props.price));
const financedPrice = computed(() => viewFinancedValue(props.price));

onMounted(() => window.addEventListener('resize', updateScreenSize));
onUnmounted(() => window.removeEventListener('resize', updateScreenSize));
</script>

<template>
    <div
        class="flex flex-row justify-between items-center sm:flex-col sm:gap-4">
        <button
            v-if="windowWidth <= 425"
            class="relative top-[40%] w-[10%] h-8 bg-transparent border-none"
            @click="emitPreviousItem">
            <img src="../assets/icons/left_arrow.svg" alt="Previous" />
        </button>
        <div
            class="flex flex-col justify-between items-center h-full bkmid:gap-0 gap-8 sm:w-[70%]">
            <div class="h-40">
                <img
                    :src="img"
                    :alt="`Foto do ${name}`"
                    class="w-32 sm:w-full" />
            </div>
            <div
                class="flex flex-col items-center text-center leading-4 gap-4 bkmid:gap-0 sm:gap-8 bkmid:h-full">
                <p
                    class="w-full text-lg bkmid:text-sm lg:text-lg font-semibold">
                    {{ name }}
                </p>
                <h3 class="text-xl bkmid:text-2sm lg:text-lg font-bold">
                    R$ {{ pixPrice }}
                    <span class="text-sm font-normal">no pix</span>
                </h3>
                <p class="w-full text-sm lg:text-lg">ou {{ financedPrice }}</p>
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
