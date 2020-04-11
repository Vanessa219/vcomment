declare module "*/index.scss";
declare module "jquery";

declare class Vditor {
    public static speechRender(element: HTMLElement, lang?: (keyof II18nLang)): void;

    public static codeRender(element: HTMLElement, lang?: (keyof II18nLang)): void;

    public static graphvizRender(element: HTMLElement, lang?: (keyof II18nLang)): void;

    public static mathRender(element: HTMLElement): void;

    public static mermaidRender(element: HTMLElement, className?: string, cdn?: string): void;

    public static chartRender(element?: HTMLElement | Document, cdn?: string): void;

    public static abcRender(element?: HTMLElement | Document, cdn?: string): void;

    public static mediaRender(element: HTMLElement): void;

    public static highlightRender(hljsOption?: {
                                      lineNumber?: boolean;
                                      style?: string;
                                      enable?: boolean;
                                  },
                                  element?: HTMLElement | Document, cdn?: string): void;

    constructor(id: string, options: IVditorOptions)

    public getValue(): string;

    public focus(): void;

    public disabled(): void;

    public enable(): void;

    public setValue(markdown: string): void;
}

interface IVdtiorHint {
    userName?: string;
    userAvatarURL?: string;
    value: string;
    html: string;
}

interface II18nLang {
    en_US: string;
    zh_CN: string;
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
    toolbarConfig: {
        hide?: boolean,
        pin?: boolean,
    };
    counter?: {
        enable: boolean;
        max?: number;
    };
    cache?: {
        enable?: boolean;
    };
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

        at?(value: string): IVdtiorHint[];
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

interface IResponse {
    msg: string;
    code: number;
    data: any;
}

interface IOptions {
    id: string;
    postId?: string;
    userName?: string;
    url?: string;
    currentPage?: number;
    vditor?: IOptionsVditor;
    commentVditor?: Vditor;
    error?: () => void;
}

interface IOptionsVditor {
    lang: keyof II18nLang;
    hljsEnable: boolean;
    hljsStyle: string;
    emoji?: { [key: string]: string };
    lineNumber: boolean;
}
