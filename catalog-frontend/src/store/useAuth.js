import { ref } from 'vue';

export const authState = {
    isAuthenticated: ref(!!localStorage.getItem('token')),

    login(token) {
        localStorage.setItem('token', token);
        this.isAuthenticated.value = true;
    },

    logout() {
        // Remove o token da sessão do usuario
        localStorage.removeItem('token');
        // Atribui como falso o estado de autenticado
        this.isAuthenticated.value = false;
    },
};
