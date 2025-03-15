import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { URL } from '@/constants/URL';
import { authState } from '@/store/useAuth';
import axios from 'axios';

const signOut = async (state, router, cb) => {
    try {
        await axios.post(URL.LOGOUT, {}, { withCredentials: true });
        authState.logout();
        state.value = false;
        router.push(PATH.LOGIN);
    } catch (error) {
        console.error(error);
        cb(MESSAGE.ERROR.LOGOUT);
    }
};

export default signOut;
