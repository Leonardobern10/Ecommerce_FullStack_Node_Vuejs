import MESSAGE from '@/constants/MESSAGE';
import PATH from '@/constants/PATH';
import { URL } from '@/constants/URL';
import axios from 'axios';

const signUp = async (name, email, password, router, cb) => {
    try {
        await axios.post(URL.REGISTER, {
            name: name.value,
            email: email.value,
            password: password.value,
        });
        router.push(PATH.LOGIN);
    } catch (error) {
        cb(MESSAGE.ERROR.REGISTER.DEFAULT);
        console.error(error);
    }
};

export default signUp;
