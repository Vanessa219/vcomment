export const mergeOptions = (options: IOptions) => {
    const defaultOptions: IOptions = {
        currentPage: 1,
        id: "",
        isLoggedIn: false,
        url: "https://hacpai.com",
        vditor: {
            hljsEnable: true,
            hljsStyle: "github",
        },
    };

    if (options.vditor) {
        options.vditor = Object.assign({}, defaultOptions.vditor, options.vditor);
    }
    return Object.assign({}, defaultOptions, options);
};
