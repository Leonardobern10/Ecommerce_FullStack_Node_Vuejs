<script setup>
import { ref, computed, onMounted } from 'vue';
import { getCart, clearCart } from '../services/cartService.js';
import { createOrder } from '@/services/orderService.js';
import { useRouter } from 'vue-router';
import CartItemView from './CartItemView.vue';
import { authState } from '@/store/useAuth.js';

// Direcionador de endereços
const router = useRouter();

// Reponsável por receber os produtos
const cart = ref([]);

// Obtém o token da sessão do usuário
const token = localStorage.getItem('token');

// Faz o carregamento dos produtos e insere no [Cart]
const loadCart = () => {
    cart.value = getCart();
};

// Faz a remoção de todos os itens do carrinho
const clear = () => {
    // Remove os dados dos itens para a aquela sessão
    clearCart();
    // Atribui uma lista vazia ao carrinho
    cart.value = [];
};

// Calcula o valor total de compra para os itens no carrinho
// [Computed] garante que esse valor seja carregado dinamicamente,
// ou seja, sempre que um item novo for inserido, automaticamente
// esse valor é calculado.
const totalAmount = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0),
);

// Função responsável por efetuar a compra
const checkout = async () => {
    // Se não houver token emite um alerta e
    // redireciona o usuario para a endpoint
    // de login.
    if (!token) {
        alert('Você precisa estar logado para finalizar a compra.');
        router.push('/login');
        return;
    }

    try {
        // Cria um objeto com as propriedades de um pedido,
        // incluindo os itens e quantidade.
        const orderData = {
            items: cart.value.map((item) => ({
                product: item._id,
                quantity: item.quantity,
            })),
            totalAmount: totalAmount.value,
        };

        // Cria um documento do tipo [Order] baseado no objeto
        // e passa também o token
        await createOrder(orderData, token);
        // Feedback ao usuario informando sucesso
        alert('Pedido realizado com sucesso!');
        // Limpa o carrinho
        clearCart();
        //redireciona para a home
        router.push('/');
    } catch (error) {
        alert('Erro ao finalizar compra. Tente novamente.');
        console.error(error);
    }
};

// Sempre que Cart.vue é montado
onMounted(() => {
    // Primeiro é verificado se o usuário está logado
    if (authState.isAuthenticated.value) {
        // Carrega os itens do carrinho
        loadCart();
        return;
    }

    // Caso não esteja logado, é redirecionado para login
    router.push('/login');
});
</script>

<template>
    <div>
        <h2>Carrinho de Compras</h2>
        <!-- Exibe essa seção SE HOUVER ITENS NO CARRINHO-->
        <ul id="items-cart" v-if="cart.length">
            <!-- Para cada item no carrinho -->
            <li class="item-cart" v-for="item in cart" :key="item._id">
                <CartItemView
                    :name="item.name"
                    :price="item.price"
                    :quantity="item.quantity"
                    :image-url="item.imageUrl"
                />
            </li>
        </ul>
        <!-- Exibe essa seção SE NÃO HOUVER ITENS NO CARRINHO -->
        <p v-else>Seu carrinho está vazio.</p>
        <p>
            <!-- Valor total do carrinho -->
            <strong
                >Total: R$
                {{ Number.parseFloat(totalAmount).toFixed(2) }}</strong
            >
        </p>
        <button @click="checkout" v-if="cart.length">Finalizar compra</button>
        <button @click="clear" v-if="cart.length">Limpar</button>
    </div>
</template>

<style scoped>
button {
    background-color: rgb(3, 116, 31);
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}
li {
    list-style: none;
}

button {
    margin: 0 2rem;
}

#items-cart {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
