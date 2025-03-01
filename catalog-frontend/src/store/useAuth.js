import { ref } from 'vue';

export const authState = {
    isAuthenticated: ref(false), // Vai começar como falso até verificar os cookies

    // Função que verifica se o usuário está autenticado
    checkAuthStatus() {
        // Se o cookie do token estiver presente, isso significa que o usuário está autenticado
        // Isso depende do seu backend configurar o cookie corretamente
        this.isAuthenticated.value = document.cookie.includes('token');
    },

    login() {
        this.isAuthenticated.value = true; // Defina como autênticado
    },

    logout() {
        this.isAuthenticated.value = false; // Defina como não autenticado
        // Você também pode limpar os cookies manualmente, mas o backend pode já limpar o cookie ao fazer logout
    },
};
