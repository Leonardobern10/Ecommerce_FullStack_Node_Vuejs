import { ref } from 'vue';
import axios from 'axios';

export const authState = {
    isAuthenticated: ref(false),

    async checkAuthStatus() {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/auth/userStatus',
                { withCredentials: true },
            );

            if (response.status === 200) {
                this.isAuthenticated.value = true;
            }

            console.log(response.status);
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
