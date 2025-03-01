<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Obtemos um direcionador de rotas que será
// responsável por chamar o componente correpondente
// para cada rota passada
const router = useRouter();

// Definição de variáveis reativas (permitem
// alteração de valor em tempo de execução
// sem necessariamente, manipular o DOM.)
const name = ref('');
const email = ref('');
const password = ref('');

/**
 * O metodo register envia uma requisição utilizando axios,
 * através do metodo HTTP POST para a url definida. São enviados,
 * no corpo da requisição, os dados: name, email e password.
 * Após isso, caso nenhum erro tenha ocorrido, o usuário é
 * redirecionado para a rota de login que irá renderizar o
 * componente correspondente.
 *
 * Caso ocorra algum erro no registro o usuário é notificado
 * e o erro em questão é exibido no console.

 */
async function register() {
    try {
        await axios.post('http://localhost:5000/api/auth/register', {
            name: name.value,
            email: email.value,
            password: password.value,
        });
        router.push('/login');
    } catch (error) {
        alert('Error ao registrar');
        console.log(error);
    }
}
</script>

<template>
    <div>
        <h2>Cadastrar</h2>
        <form @submit.prevent="register">
            <input v-model="name" type="text" placeholder="Nome" required />
            <input v-model="email" type="email" placeholder="Email" required />
            <input
                v-model="password"
                type="password"
                placeholder="Senha"
                required
            />
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>

<style scoped>
/* Estilos para o formulário de registro */
form {
    max-width: 400px;
    margin: auto;
}
input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
}
button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: green;
    color: white;
    border: none;
    font-size: 16px;
}
</style>
