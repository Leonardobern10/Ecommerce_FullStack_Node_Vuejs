import { authState } from '@/store/useAuth';

export const generateContent = async (cb_UPDATE_SIZE, state) => {
    window.addEventListener('resize', cb_UPDATE_SIZE);
    await authState.checkAuthStatus();
    state.value = authState.isAuthenticated.value;
};
