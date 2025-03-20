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

export const isAdmin = async () => {
    let role = await checkRole();
    if (role === 'admin') {
        return true;
    }
    return false;
};

export const hasPermission = async (auth, permitted) => {
    if (auth.authenticated) {
        permitted.value = await isAdmin();
    } else {
        permitted.value = false;
    }
};
