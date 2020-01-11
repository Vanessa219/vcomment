export const fetchPost = (url: string, data?: { data: string[] }, timeout?: number) => {
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

export const fetchGet = (url: string) => {
    return new Promise<IResponse>((resolve) => {
        fetch(url, {
            credentials: "include",
        }).then((response: Response) => {
            return response.json();
        }).then((responseData: IResponse) => {
            return resolve(responseData);
        });
    });
};
