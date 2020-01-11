export const mergeOptions = (options: IOptions) => {
    const defaultOptions: IOptions = {

    };

    return Object.assign({}, defaultOptions, options);
};
