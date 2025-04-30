<script setup>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { reactive } from 'vue';

// Estado do formulário
const form = reactive({ name: '', email: '' });

// Definindo as regras
const rules = {
    name: { required, minLength: minLength(3) },
    email: { required, email },
};

// Inicializando Vuelidate
const v$ = useVuelidate(rules, form);
</script>

<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>Nome:</label>
            <input v-model="form.name" @blur="v$.value.name.$touch()" />
            <div v-if="v$.value.name.$error">
                <span v-if="v$.value.name.required.$invalid"
                    >Nome é obrigatório.</span
                >
                <span v-if="v$.value.name.minLength.$invalid"
                    >Nome deve ter pelo menos 3 caracteres.</span
                >
            </div>
        </div>

        <div>
            <label>Email:</label>
            <input v-model="form.email" @blur="v$.value.email.$touch()" />
            <div v-if="v$.value.email.$error">
                <span v-if="v$.value.email.required.$invalid"
                    >Email é obrigatório.</span
                >
                <span v-if="v$.value.email.email.$invalid"
                    >Email inválido.</span
                >
            </div>
        </div>

        <button type="submit">Enviar</button>
    </form>
</template>
