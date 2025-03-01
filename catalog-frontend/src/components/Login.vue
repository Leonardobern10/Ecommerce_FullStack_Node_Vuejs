<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authState } from '@/store/useAuth.js';

// Direcionador de rotas
const router = useRouter();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

/**
 * A função Login faz uma requisição utilizando a biblioteca axios,
 * através de um metodo HTTP POST para a url definida, passando no
 * corpo da requisição os dados email e password.
 * Em seguida, armazena na variavel 'token' um possivel token que será
 * gerado e recebido como resposta caso a requisição tenha sido feita
 * corretamente.
 * Existe então uma verificação para o caso de a variavel 'token' ter
 * recebido algum tipo de valor falsy (null, undefined, nan, '', etc.).
 * Em todos os casos, um erro será lançado dizendo que o token é invalido.
 * Caso o token seja valido, um registro do tipo chave-valor é armazenado
 * no localStorage, sendo a chave:'token' e o valor:o resultado do token
 * gerado pela autenticação.
 * É acessada a função login do objeto authState que é quem gerencia o
 * status do usuario na sessão (autenticado ou nao autenticado) passando
 * o token como parametro. A função login do objeto authState atualiza o
 * estado global do usuario como autenticado e disponibiliza esse valor
 * para toda a aplicação.
 * Se tudo acima ocorrer bem, o usuário estará logado e será redirecionado
 * para a seção de produtos.
 *
 * Caso ocorra erro na autenticação, o usuário é notificado à rever suas credenciais.
 */
// Metodo que cuida do login
async function login() {
    isLoading.value = true;

    try {
        // Faz um POST para uma URI passando email e senha
        const response = await axios.post(
            'http://localhost:5000/api/auth/login',
            { email: email.value, password: password.value },
            { withCredentials: true },
        );
        authState.login();
        router.push('/products'); // Garante que o caminho é correto
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Login falhou! Verifique suas credenciais.');
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input
                v-model="password"
                type="password"
                placeholder="Senha"
                required
            />
            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Entrando...' : 'Entrar' }}
            </button>
        </form>
    </div>
</template>

<style scoped>
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
    background-color: blue;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
}
</style>
