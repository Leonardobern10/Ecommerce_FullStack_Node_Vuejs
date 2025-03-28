import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { URL } from '@/constants/URL';
import { notifyError, notifySuccess } from '@/notifications/notify';
import axios from 'axios';

const signUp = async (name, email, password, router, toast) => {
    try {
        await axios.post(URL.REGISTER, {
            name: name.value,
            email: email.value,
            password: password.value,
        });
        router.push(PATH.LOGIN);
        notifySuccess(toast, MESSAGE.SUCCESS.REGISTER);
    } catch (error) {
        notifyError(toast, MESSAGE.ERROR.REGISTER.DEFAULT);
        console.error(error);
    }
};

export default signUp;
