import {alertMsg} from "../util/alertMst";
import {lazyloadImg} from "../util/lazyloadImg";

/**
 * 查看回贴的引用：当回贴 A 被回复了 B，在回贴 B 中可以查看 A
 * @param {string} id 回贴 id
 * @param {jQuery} $content 引用展现的 jQuery 元素
 * @param {jQuery} $btn 查看引用的按钮
 */
const showOriginal = (id: string, $content: JQuery, $btn: JQuery, options: IOptions) => {
    if ($btn.attr("disabled") === "disabled") {
        return;
    }

    $.ajax({
        data: JSON.stringify({
            commentId: id,
        }),
        type: "POST",
        url: options.url + "/apis/vcomment/original",
        beforeSend() {
            $btn.attr("disabled", "disabled");
        },
        success(result) {
            if (!result.sc) {
                alertMsg(result.msg);
                return false;
            }
            $content.html(`<ul class="vcomment__list">${result.cmtTpl}</ul>`).show();
            lazyloadImg(options.id);
            Util.parseLanguage();
            Util.parseMarkdown();
        },
        error(result) {
            alertMsg(result.statusText);
        },
        complete() {
            $btn.removeAttr("disabled");
        },
    });
};

/**
 * 查看回贴的回复：当回贴 A 有回复 B、C 时，可以在 A 中查看 B、C
 * @param {string} id 回贴 id
 * @param {jQuery} $content 回复所展现的 jQuery 元素
 * @param {jQuery} $btn 查看回复的按钮
 */
const showComment = (id: string, $content: JQuery, $btn: JQuery, options: IOptions) => {
    if ($btn.attr("disabled") === "disabled") {
        return;
    }
    $.ajax({
        data: JSON.stringify({
            commentId: id,
        }),
        type: "POST",
        url: options.url + "/apis/vcomment/replies",
        beforeSend() {
            $btn.attr("disabled", "disabled");
        },
        success(result) {
            if (!result.sc) {
                alertMsg(result.msg);
                return false;
            }
            let liHTML = "";
            result.commentReplies.forEach((data: string) => {
                liHTML += data;
            });
            $content.html(`<ul class="vcomment__list">${liHTML}</ul>`).slideDown();
            lazyloadImg(options.id);
            Util.parseLanguage();
            Util.parseMarkdown();
        },
        error(result) {
            alertMsg(result.statusText);
        },
        complete() {
            $btn.removeAttr("disabled");
        },
    });
};

export const commentList = (options: IOptions) => {
    $(`#${options.id}`).on("click", ".commentCloseBtn", function() {
        $(this).closest(".commentActionPanel").hide();
        $(this).closest("ul").remove("");
    }).on("click", ".commentOriginalBtn", function() {
        showOriginal($(this).data("ooid"),
            $(this).closest("li").find(".commentOriginal"), $(this), options);
    }).on("click", ".commentShowReplyBtn", function() {
        const $it = $(this);
        const $content = $it.closest("li").find(".commentActionPanel");
        showComment($it.closest("li").attr("id"), $content, $it, options);
    }).on("click", ".commentShowMoreBtn", function() {
        const $it = $(this);
        const isOriginal = $it.closest(".commentOriginal").length === 1;
        let $commentHides = $it.closest(".commentOriginal").find(".commentHide");
        if (!isOriginal) {
            $commentHides = $it.closest("li").find(".commentHide").filter((i, e) => {
                return $(e).closest(".commentOriginal").length === 0;
            });
        }
        if ($it.data("type") === "fold") {
            $commentHides.show();
            $it.html(
                "折叠").data("type", "open");
        } else {
            $commentHides.hide();
            $it.html(
                "展开").data("type", "fold");
        }
    }).on("click", ".commentHideSubmitBtn", function() {
        const $btn = $(this);
        if ($btn.attr("disabled") === "disabled") {
            return;
        }

        $btn.attr("disabled", "disabled");

        const commentId = $btn.closest("li").attr("id");
        $.ajax({
            cache: false,
            data: JSON.stringify({
                commentId,
                commentStatus: $btn.prev().val(),
            }),
            headers: {csrfToken: options.csrfToken},
            type: "POST",
            url: `${options.url}/comment/hide`,
            success(result) {
                if (result.code !== 0) {
                    alertMsg(result.msg);
                    return;
                }

                document.getElementById(commentId).outerHTML = result.data.html;
                lazyloadImg(options.id);
            },
            complete() {
                $btn.removeAttr("disabled");
            },
        });
    });
};
