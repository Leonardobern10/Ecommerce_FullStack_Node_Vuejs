import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { URL } from '@/constants/URL';
import { notifyError, notifySuccess } from '@/notifications/notify';
import axios from 'axios';

const signOut = async (state, auth, router, toast) => {
    try {
        await axios.post(URL.LOGOUT, {}, { withCredentials: true });
        auth.logout();
        state.value = false;
        router.push(PATH.LOGIN);
        notifySuccess(toast, MESSAGE.SUCCESS.LOGOUT);
    } catch (error) {
        notifyError(toast, MESSAGE.ERROR.LOGOUT);
    }
};

export default signOut;
