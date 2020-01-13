import {alertMsg} from "../util/alertMst";
import {lazyloadImg} from "../util/lazyloadImg";
import {addComment} from "./addComment";
import {commentToggle} from "./commentToggle";

export const initVditor = (options: IOptions) => {
    Util.addScript(
        "https://cdn.jsdelivr.net/npm/vditor@2.0.15/dist/index.min.js",
        "vditorScript");

    const emoji: { [key: string]: string } = {};
    $.ajax({
        async: false,
        cache: true,
        url: `${options.url}/apis/users/emotions`,
        success(result) {
            if (Array.isArray(result.data)) {
                result.data.forEach((item: { [key: string]: string }) => {
                    const key = Object.keys(item)[0];
                    emoji[key] = item[key];
                });
            }
        },
    });

    const $commentSubmitBtn = $("#commentSubmitBtn");

    const vditorOptions = {
        after() {
            const comments = JSON.parse(localStorage.getItem("comments") || "{}");
            options.commentVditor.setValue(comments[options.postId] || "");
            options.commentVditor.focus();
        },
        cache: true,
        counter: 4096,
        ctrlEnter() {
            addComment(options, $commentSubmitBtn);
        },
        esc() {
            commentToggle(options);
        },
        input(value: string) {
            if (value === "\n") {
                return;
            }
            const comments = JSON.parse(localStorage.getItem("comments") || "{}");
            comments[options.postId] = value;
            localStorage.setItem("comments", JSON.stringify(comments));
        },
        height: 200,
        hint: {
            at: (key: string) => {
                let atUsers: IvdtiorHint[] = [];
                $.ajax({
                    async: false,
                    data: JSON.stringify({name: key}),
                    type: "POST",
                    url: `${options.url}/apis/users/names`,
                    success(result) {
                        if (result.code === 0) {
                            atUsers = result.data.map((item: IvdtiorHint) => {
                                item.value = `@${item.userName}`;
                                item.html = `<img src='${item.userAvatarURL}'/> ${item.userName}`;
                                return item;
                            });
                            if (key === "") {
                                atUsers.push({
                                    html: "<img src='https://static.hacpai.com/images/user-thumbnail.png'/> 参与者",
                                    value: "@participants",
                                });
                            }
                        } else {
                            alertMsg(result.msg);
                        }
                    },
                });
                return atUsers;
            },
            emoji,
            emojiTail: `<a href="${options.url}/settings/function" target="_blank">设置常用表情</a>`,
        },
        lang: "zh_CN",
        mode: "wysiwyg-show",
        placeholder: $("#vcommentVditor").data("placeholder"),
        preview: {
            hljs: {
                enable: options.vditor.hljsEnable,
                style: options.vditor.hljsStyle,
            },
            mode: "editor",
            url: `${options.url}/markdown`,
            parse(element: HTMLElement) {
                if (element.style.display === "none") {
                    return;
                }
                lazyloadImg(options.id);
                Util.parseLanguage();
                Util.parseMarkdown();
            },
        },
        resize: {
            enable: true,
            position: "top",
        },
        tab: "\t",
        toolbar: [
            "emoji",
            "headings",
            "bold",
            "italic",
            "link",
            "|",
            "list",
            "ordered-list",
            "check",
            "|",
            "quote",
            "line",
            "code",
            "inline-code",
            "|",
            "record",
            "table",
            "|",
            "undo",
            "redo",
            "|",
            "wysiwyg",
            "both",
            "preview",
            "format",
            "|",
            "fullscreen",
            "devtools",
            "info",
            "help",
        ],
        typewriterMode: false,
    };

    if ($(window).width() < 768) {
        vditorOptions.toolbar = [
            "emoji",
            "bold",
            "italic",
            "link",
            "list",
            "check",
            "wysiwyg",
            "preview",
            "fullscreen",
            "help",
        ];
        vditorOptions.resize.enable = false;
    }
    options.commentVditor = new Vditor("vcommentVditor", vditorOptions);

    $commentSubmitBtn.click(() => {
        addComment(options, $commentSubmitBtn);
    });
};
