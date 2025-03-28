import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { URL } from '@/constants/URL';
import { notifyError, notifySuccess } from '@/notifications/notify';
import axios from 'axios';

const signIn = async (loading, email, password, auth, router, toast) => {
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
        notifySuccess(toast, MESSAGE.SUCCESS.LOGIN);
    } catch (error) {
        notifyError(toast, MESSAGE.ERROR.LOGIN.CHECK_CREDENTIALS);
    } finally {
        loading.value = false;
    }
};

export default signIn;
