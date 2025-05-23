import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { URL } from '@/constants/URL';
import {
    notifyError,
    notifySuccess,
    notifyWarning,
} from '@/notifications/notify';
import axios from 'axios';

const signUp = async (name, email, password, passwordCheck, router, toast) => {
    if (password.value != passwordCheck.value) {
        notifyWarning(toast, MESSAGE.ALERT.PASSWORD.NOT_EQUALS);
        return;
    }

    try {
        await axios.post(URL.REGISTER, {
            name: name.value,
            email: email.value,
            password: password.value,
        });
        router.push(PATH.LOGIN);
        notifySuccess(toast, MESSAGE.SUCCESS.REGISTER);
    } catch (error) {
        notifyError(toast, `${error.response.data.message}`);
    }
};

export default signUp;
