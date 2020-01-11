declare module "*/index.scss";

interface IResponse {
    msg: string;
    code: number;
    data: { [key: string]: string };
}

interface IOptions {
    id: string;
    postId?: string;
    url?: string;
}
