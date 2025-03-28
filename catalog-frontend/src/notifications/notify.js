export const notifyInfo = (toast, message) => {
    toast.info(message, optionsNotify);
};

export const notifyError = (toast, message) => {
    toast.error(message, optionsNotify);
};

export const notifySuccess = (toast, message) => {
    toast.success(message, optionsNotify);
};

export const notifyWarning = (toast, message) => {
    toast.warning(message, optionsNotify);
};

const optionsNotify = {
    position: 'bottom-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
};
