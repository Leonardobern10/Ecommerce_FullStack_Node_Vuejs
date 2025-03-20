export const generateContent = async (cb_UPDATE_SIZE, state, authState) => {
    window.addEventListener('resize', cb_UPDATE_SIZE);
    await authState.checkAuthStatus();
    state.value = authState.authenticated;
};
