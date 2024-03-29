export const mergeOptions = (options: IOptions) => {
    const defaultOptions: IOptions = {
        currentPage: 1,
        id: "",
        postId: "",
        url: "https://ld246.com",
        userName: "",
        vditor: {
            emoji: null,
            hljsEnable: true,
            hljsStyle: "github",
            lang: "zh_CN",
            lineNumber: false,
            speech: false,
            theme: "light",
        },
    };

    if (options.vditor) {
        options.vditor = Object.assign({}, defaultOptions.vditor, options.vditor);
    }
    return Object.assign({}, defaultOptions, options);
};
