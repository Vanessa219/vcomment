interface IResponse {
    msg: string;
    code: number;
    data: { [key: string]: number };
}

interface IOptions {
    id: string;
    postId?: string;
    url?: string;
}
