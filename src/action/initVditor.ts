import $ from "jquery";
import {alertMsg} from "../util/alertMst";
import {lazyLoadImage} from "../util/lazyLoadImage";
import {parseMarkdown} from "../util/parseMarkdown";
import {addComment} from "./addComment";
import {commentToggle} from "./commentToggle";

export const initVditor = (options: IOptions, defaultValue: string = "") => {
    if (options.commentVditor) {
        if (defaultValue) {
            options.commentVditor.setValue(defaultValue);
        }
        options.commentVditor.focus();
        return;
    }

    if (!options.vditor.emoji) {
        options.vditor.emoji = {};
        $.ajax({
            async: false,
            cache: true,
            url: `${options.url}/apis/vcomment/users/emotions`,
            success(result: IResponse) {
                if (Array.isArray(result.data)) {
                    result.data.forEach((item: { [key: string]: string }) => {
                        const key = Object.keys(item)[0];
                        options.vditor.emoji[key] = item[key];
                    });
                }
            },
        });
    }

    const $commentSubmitBtn = $("#commentSubmitBtn");

    const vditorOptions = {
        after() {
            if (defaultValue) {
                options.commentVditor.setValue(defaultValue);
                options.commentVditor.focus();
            } else {
                const comments = JSON.parse(localStorage.getItem("comments") || "{}");
                options.commentVditor.setValue(comments[options.postId] || "");
                options.commentVditor.focus();
            }
        },
        cache: false,
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
                let atUsers: IVdtiorHint[] = [];
                $.ajax({
                    async: false,
                    data: JSON.stringify({name: key}),
                    type: "POST",
                    url: `${options.url}/apis/vcomment/users/names`,
                    success(result: IResponse) {
                        if (result.code === 0) {
                            atUsers = result.data.map((item: IVdtiorHint) => {
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
            emoji: options.vditor.emoji,
            emojiTail: `<a href="${options.url}/settings/function" target="_blank">设置常用表情</a>`,
        },
        lang: "zh_CN",
        placeholder: $("#vcommentVditor").data("placeholder"),
        preview: {
            hljs: {
                enable: options.vditor.hljsEnable,
                lineNumber: options.vditor.lineNumber,
                style: options.vditor.hljsStyle,
            },
            url: `${options.url}/apis/vcomment/markdown`,
            parse(element: HTMLElement) {
                if (element.style.display === "none") {
                    return;
                }
                lazyLoadImage();
                parseMarkdown(options.vditor);
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
            "edit-mode",
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
            "edit-mode",
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
