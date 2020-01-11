export const mergeOptions = (options: IOptions) => {
    const defaultOptions: IOptions = {
        id: "",
        url: "https://hacpai.com/apis",
    };

    return Object.assign({}, defaultOptions, options);
};
