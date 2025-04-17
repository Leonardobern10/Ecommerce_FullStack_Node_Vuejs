<script setup>
import Input from './Input.vue';
import Button from './Button.vue';

const props = defineProps({
    fields: Array, // Lista de campos do formulario
    buttonText: String, // Texto do botão
    onSubmit: Function, // Função de submissão do formulário
});
</script>

<template>
    <div id="view">
        <form @submit.prevent="onSubmit">
            <Input
                v-for="field in fields"
                :key="field.model"
                :model-value="field.value"
                :type="field.type"
                :placeholder="field.placeholder" />
            <Button type="submit" :button-name="buttonText" />
        </form>
    </div>
</template>

<style scoped>
#view {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    margin-top: 2rem;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 400px;
    margin: auto;

    padding: 1rem 0;
}
button {
    width: fit-content;
    border: 2px solid #d9d9d9;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    background-color: var(--green-spring);
    color: #fff;
    font-size: 1rem;
    font-weight: 200;
    letter-spacing: 0.5px;
    margin-top: 4rem;
    transition:
        background-color 0.3s ease-in,
        border 0.3s ease-in;
}

button:hover {
    cursor: pointer;
    background-color: var(--xanadu);
    border: 1px solid #fff;
}
</style>
