import MESSAGE from '@/constants/MESSAGE';
import { URL } from '@/constants/URL';
import { authState } from '@/store/useAuth';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const signOut = async (state, cb) => {
    try {
        await axios.post(URL.LOGOUT, {}, { withCredentials: true });
        authState.logout();
        state.value = false;
        router.push(PATH.LOGIN);
    } catch (error) {
        console.error(MESSAGE.ERROR.LOGOUT);
        console.error(error);
        cb(MESSAGE.ERROR.LOGOUT);
    }
};

export default signOut;
