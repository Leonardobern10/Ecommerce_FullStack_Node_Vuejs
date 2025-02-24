import { ref } from 'vue';

export const authState = {
    isAuthenticated: ref(!!localStorage.getItem('token')),

    login(token) {
        localStorage.setItem('token', token);
        this.isAuthenticated.value = true;
    },

    logout() {
        localStorage.removeItem('token');
        this.isAuthenticated.value = false;
    },
};
