import PATH from '@/constants/PATH';
import { notifyError, notifySuccess } from '@/notifications/notify';
import axios from 'axios';

export const forgotPassword = async (toast, email) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/auth/forgot-password',
            { email },
        );
        notifySuccess(
            toast,
            'E-mail enviado com sucesso! Verifique sua conta.',
        );
        return response;
    } catch (error) {
        // console.log(error);
        notifyError(
            toast,
            'Erro ao redefinir senha. Tente novamente mais tarde.',
        );
    }
};

export const resetPassword = async (
    toast,
    token,
    password,
    checkPassword,
    router,
) => {
    if (password != checkPassword) {
        notifyError(toast, 'As senhas não correspondem.');
        return;
    }

    try {
        const response = await axios.post(
            `http://localhost:5000/api/auth/reset-password/${token}`,
            { password },
        );

        notifySuccess(toast, 'Senha alterada com sucesso!');
        router.push(PATH.HOME);
    } catch (error) {
        notifyError(
            toast,
            'Erro ao redefinir senha. Tente novamente mais tarde!',
        );
        // console.error(error);
    }
};
