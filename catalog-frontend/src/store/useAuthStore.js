import axios from 'axios';
import { URL } from '@/constants/URL';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state: () => ({ authenticated: false }),
    actions: {
        async checkAuthStatus() {
            try {
                const response = await axios.get(URL.USER_STATUS, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    this.isAuthenticated.value = true;
                }

                if (response.status === 401) {
                    this.isAuthenticated.value = false;
                }

                console.log(response.status);
            } catch (error) {
                this.isAuthenticated.value = false;
            }
        },
        login() {
            this.authenticated = true;
        },
        logout() {
            this.authenticated = false;
        },
    },
});
