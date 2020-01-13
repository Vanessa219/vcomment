export const confirmMsg = (msg: string, successCB: () => void) => {
    if (confirm(msg)) {
        successCB();
    }
};
