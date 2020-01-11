export const mergeOptions = (options: IOptions) => {
    const defaultOptions: IOptions = {
        id: '',
        url: "https://hacpai.com/api",
    };

    return Object.assign({}, defaultOptions, options);
};
