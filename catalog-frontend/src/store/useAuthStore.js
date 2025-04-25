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
                    this.authenticated = true;
                }

                if (response.status === 401) {
                    this.authenticated = false;
                }
            } catch (error) {
                this.authenticated = false;
            }
        },
        async info() {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/auth/me',
                    { withCredentials: true },
                );
                return response.data;
            } catch (error) {
                console.error(error);
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
