export const mergeOptions = (options: IOptions) => {
    const defaultOptions: IOptions = {
        currentPage: 1,
        id: "",
        postId: "",
        url: "https://ld246.com",
        userName: "",
        vditor: {
            cdn: "https://cdn.jsdelivr.net/npm/vditor",
            hint: {
                emojiPath: "https://cdn.jsdelivr.net/npm/vditor/dist/images/emoji",
            },
            hljsEnable: true,
            hljsStyle: "github",
            lang: "zh_CN",
            lineNumber: false,
            speech: false,
            theme: {
                current: "light",
                path: "https://cdn.jsdelivr.net/npm/vditor/dist/css/content-theme",
            },
        },
    };

    if (options.vditor) {
        options.vditor = Object.assign({}, defaultOptions.vditor, options.vditor);
    }
    return Object.assign({}, defaultOptions, options);
};
