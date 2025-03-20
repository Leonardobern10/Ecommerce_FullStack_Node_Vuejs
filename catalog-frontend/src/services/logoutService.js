import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { URL } from '@/constants/URL';
import axios from 'axios';

const signOut = async (state, auth, router, cb) => {
    try {
        await axios.post(URL.LOGOUT, {}, { withCredentials: true });
        auth.logout();
        state.value = false;
        router.push(PATH.LOGIN);
    } catch (error) {
        console.error(error);
        cb(MESSAGE.ERROR.LOGOUT);
    }
};

export default signOut;
