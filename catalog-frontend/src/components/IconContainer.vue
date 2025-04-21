<script setup>
const props = defineProps({ icon: String, title: String, content: String });
</script>

<template>
    <div
        class="flex flex-col md:flex-row items-center justify-between w-[50%] max-ml:w-[30%] max-ml:h-[9rem] md:p-0 lg:w-[70%] ml-border-2 rounded-2xl p-2">
        <div class="w-[50%] h-15 max-ml:h-10 md:w-[40%] md:mr-4 lg:mr-0">
            <img :src="icon" :alt="`Ícone para ${icon}`" />
        </div>
        <div
            class="flex flex-col items-center gap-y-3 font-lato h-full w-[70%] max-ml:w-full max-ml:p-x-4">
            <p
                class="text-2sm max-md:text-xs max-ml:whitespace-nowrap text-gray-200/80 max-ml:text-sm max-ml:pt-1 w-full font-bold max-ml:font-semibold">
                {{ title }}
            </p>
            <p
                class="text-sm max-md:text-xs/tight text-center text-gray-100/50">
                {{ content }}
            </p>
        </div>
    </div>
</template>
