declare module "*/index.scss";

interface IvdtiorHint {
    userName?: string;
    userAvatarURL?: string;
    value: string;
    html: string;
}

interface IVditorOptions {
    value?: string;
    debugger?: boolean;
    after?: () => void;
    typewriterMode?: boolean;
    keymap?: { [key: string]: string };
    height?: number | string;
    width?: number | string;
    placeholder?: string;
    lang?: string;
    toolbar?: string[];
    resize?: {
        position?: string;
        enable?: boolean;
    };
    counter?: number;
    cache?: boolean;
    mode?: string;
    preview?: {
        delay?: number;
        maxWidth?: number;
        mode?: string;
        url?: string;
        hljs?: {
            lineNumber?: boolean;
            style?: string;
            enable?: boolean;
        };
        inlineMathDigit?: boolean;

        parse?(element: HTMLElement): void;

        transform?(html: string): string;
    };
    hint?: {
        emojiTail?: string;
        delay?: number;
        emoji?: { [key: string]: string };
        emojiPath?: string;

        at?(value: string): IvdtiorHint[];
    };
    cdn?: string;
    tab?: string;

    input?(value: string, previewElement?: HTMLElement): void;

    focus?(value: string): void;

    blur?(value: string): void;

    esc?(value?: string): void;

    ctrlEnter?(value: string): void;

    select?(value: string): void;
}

declare class Vditor {

    public static mathRenderByLute(element: HTMLElement, cdn?: string): void;

    public static mathRender(element: HTMLElement, cdn?: string): void;

    public static mermaidRender(element: HTMLElement, className?: string, cdn?: string): void;

    public static chartRender(element?: HTMLElement | Document, cdn?: string): void;

    public static abcRender(element?: HTMLElement | Document, cdn?: string): void;

    public static mediaRender(element: HTMLElement): void;

    public readonly version: string;

    constructor(id: string, options: IVditorOptions)

    public getValue(): string;

    public insertValue(value: string): void;

    public focus(): void;

    public blur(): void;

    public disabled(): void;

    public enable(): void;

    public setSelection(start: number, end: number): void;

    public getSelection(): string;

    public setValue(markdown: string): void;

    public renderPreview(value?: string): void;

    public getCursorPosition(editor: HTMLPreElement): {
        left: number,
        top: number,
    };

    public deleteValue(): void;

    public updateValue(): string;

    public isUploading(): boolean;

    public clearCache(): void;

    public disabledCache(): void;

    public enableCache(): void;

    public html2md(value: string): string;

    public getHTML(): string;

    public tip(text: string, time?: number): void;

    public setPreviewMode(mode: string): void;
}

declare const Util: {
    parseLanguage: () => void
    parseMarkdown: () => void,
    addScript: (url: string, id: string) => void,
};

interface IResponse {
    msg: string;
    code: number;
    data: { [key: string]: string };
}

interface IOptions {
    id: string;
    postId?: string;
    url?: string;
    csrfToken?: string;
    currentPage?: number;
    isLoggedIn?: boolean;
    commonAddCommentGrant?: boolean;
    vditor?: {
        hljsEnable: boolean,
        hljsStyle: string,
    };
    commentVditor?: Vditor;
}
