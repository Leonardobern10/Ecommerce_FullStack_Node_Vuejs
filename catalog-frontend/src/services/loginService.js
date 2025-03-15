import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { URL } from '@/constants/URL';
import axios from 'axios';

const enterLogin = async (loading, email, password, auth, router, cb) => {
    loading.value = true;

    try {
        await axios.post(
            URL.LOGIN,
            { email: email.value, password: password.value },
            { withCredentials: true },
        );
        auth.authenticated = true;
        auth.checkAuthStatus();
        router.push(PATH.PRODUCTS.ROOT);
    } catch (error) {
        console.error('Erro no login: ', error);
        cb(MESSAGE.ERROR.LOGIN.CHECK_CREDENTIALS);
    } finally {
        loading.value = false;
    }
};

export default enterLogin;
