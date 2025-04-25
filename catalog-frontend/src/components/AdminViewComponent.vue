<script setup>
import { defineComponent } from 'vue';

const props = defineProps({ title: String, description: String, component });
</script>

<template>
    <div class="flex flex-row max-md:flex-col h-screen w-full">
        <AdminSidebar />
        <div
            class="flex flex-col justify-between items-center h-full overflow-y-auto w-full bg-white">
            <div class="text-justify p-4 w-full text-neutral-800">
                <h1 class="text-4xl font-bold p-2">{{ title }}</h1>
                <p class="text-sm font-andika font-medium p-2 w-5/6">
                    {{ description }}
                </p>
            </div>
            <div>
                {{ component }}
            </div>
        </div>
    </div>
</template>
