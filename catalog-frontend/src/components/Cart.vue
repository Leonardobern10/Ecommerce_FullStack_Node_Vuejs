<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/store/useAuthStore.js';
import CartItemView from './CartItemView.vue';
import ResumeCard from './ResumeCard.vue';
import Button from './Button.vue';
import {
    clearCart,
    removeFromCart,
    loadCart,
    getTotalValueOnCart,
    updateItemQuantityOnCart,
} from '../services/cartService.js';
import { checkoutOrder, createOrder } from '@/services/orderService.js';

const isLogged = ref(false); // Armazena o estado do usuario
const cart = ref([]); // Responsável por receber os produtos
const router = useRouter(); // Direcionador de endereços
const toast = useToast();
const auth = useAuthStore();

// Limpa o carrinho
const clear = () => {
    clearCart();
    cart.value = [];
};

// Calcula o valor total de compra para os itens no carrinho
const totalAmount = computed(() => getTotalValueOnCart(cart));

// 🔥 Função para atualizar a quantidade no carrinho
const updateItemQuantity = (productId, newQuantity) =>
    updateItemQuantityOnCart(productId, newQuantity, cart);

const removeItem = (productId) => {
    const index = cart.value.findIndex((item) => item._id === productId);
    if (index !== -1) {
        cart.value.splice(index, 1); // Remove o item diretamente do array
        removeFromCart(productId);
    }
};

// Finaliza a compra
const checkout = async () => {
    await checkoutOrder(
        auth,
        isLogged,
        router,
        cart,
        createOrder,
        clear,
        totalAmount,
        toast,
    );
};

// Verifica se o usuário está logado e carrega o carrinho
onMounted(async () => loadCart(cart));
</script>
<template>
    <div class="container mx-auto p-6 min-h-screen">
        <div class="flex flex-col md:flex-row gap-6">
            <!-- Lista de Itens no Carrinho -->
            <div
                class="w-full h-full md:w-2/3 bg-black/50 shadow-md rounded-lg p-4">
                <h2 class="text-2xl font-semibold text-neutral-200/50 mb-4">
                    Carrinho de Compras
                </h2>
                <hr class="text-gray-500/50" />
                <ul v-if="cart.length" class="space-y-4">
                    <li v-for="item in cart" :key="item._id">
                        <CartItemView
                            :name="item.name"
                            :price="item.price"
                            :quantity="item.quantity"
                            :image-url="item.imageUrl"
                            @update-quantity="
                                (newQuantity) =>
                                    updateItemQuantity(item._id, newQuantity)
                            "
                            @remove-item="removeItem(item._id)" />
                    </li>
                </ul>
                <p v-else class="text-center text-gray-200/50">
                    Seu carrinho está vazio.
                </p>
            </div>

            <!-- Resumo da Compra -->
            <div
                v-if="cart.length"
                class="w-full lg:w-1/3 h-fit bg-black/50 shadow-md rounded-lg p-6 sticky top-6 text-neutral-200/50">
                <ResumeCard
                    :length="cart.length"
                    :total-amount="totalAmount"
                    @event-checkout="checkout" />

                <Button
                    class="mt-12 text-sm"
                    @click="clear"
                    button-name="Limpar" />
            </div>
        </div>
    </div>
</template>
