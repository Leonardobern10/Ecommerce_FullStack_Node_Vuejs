import { ref } from 'vue';
import axios from 'axios';
import { URL } from '@/constants/URL';

export const authState = {
    isAuthenticated: ref(false),

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
        } catch (error) {
            this.isAuthenticated.value = false;
        }
    },

    login() {
        this.isAuthenticated.value = true;
    },

    logout() {
        this.isAuthenticated.value = false;
    },
};
