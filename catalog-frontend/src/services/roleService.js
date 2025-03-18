import axios from 'axios';

export const checkRole = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
            withCredentials: true,
        });
        return response.data?.role || '';
    } catch (error) {
        console.error('Erro ao verificar role:', error);
        return '';
    }
};
