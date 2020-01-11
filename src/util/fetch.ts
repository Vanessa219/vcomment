export const post = (url: string, data?: { data: IUrlCount[] }, timeout?: number) => {
    return new Promise<IResponse>((resolve, reject) => {
        fetch(url, {
            body: JSON.stringify(data),
            cache: "no-cache",
            method: "POST",
        }).then((response: Response) => {
            return response.json();
        }).then((responseData: IResponse) => {
            return resolve(responseData);
        });
        if (timeout) {
            setTimeout(() => {
                reject(data);
            }, timeout);
        }
    });
};
