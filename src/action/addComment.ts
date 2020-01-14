import {alertMsg} from "../util/alertMst";
import {lazyloadImg} from "../util/lazyloadImg";
import {commentToggle} from "./commentToggle";
import {getCommentList} from "./getCommentList";

export const addComment = (options: IOptions, $commentBtn: JQuery) => {
    if ($commentBtn.attr("disabled") === "disabled") {
        return;
    }

    if (!$commentBtn.data("haspermission")) {
        alertMsg("因权限不足操作已被禁止");
        return;
    }

    if (options.commentVditor.getValue().length > 4096 ||
        options.commentVditor.getValue().length === 0) {
        alertMsg("回帖内容长度 1-4096");
        return false;
    }

    const requestJSONObject = {
        articleAuthorName: options.userName,
        articleId: options.postId,
        commentContent: options.commentVditor.getValue(), // 实际提交时不去除空格，因为直接贴代码时需要空格
        commentOriginalCommentId: "",
    };

    const $replyUseName = $("#vcommentReplyUseName");
    // reply cmt
    if ($replyUseName.data("commentOriginalCommentId")) {
        requestJSONObject.commentOriginalCommentId = $replyUseName.data("commentOriginalCommentId");
    }

    let url = options.url + "/apis/vcomment/vcomment";
    let type = "POST";
    const commentId = $replyUseName.data("commentId");
    // edit
    if (commentId) {
        url = options.url + "/apis/vcomment/" + commentId;
        type = "PUT";
    }

    $.ajax({
        cache: false,
        data: encodeURIComponent(JSON.stringify(requestJSONObject)),
        headers: {
            "X-B3-UA": "vcomment",
            "csrfToken": $(`#${options.id} .vcomment`).data("csrf"),
        },
        type,
        url,
        beforeSend() {
            $commentBtn.attr("disabled", "disabled");
            options.commentVditor.disabled();
        },
        success(result) {
            if (0 === result.code) {
                if (commentId) {
                    // edit cmt
                    document.getElementById(commentId).outerHTML = result.data.html;
                    lazyloadImg(options.id);
                    Util.parseLanguage();
                    Util.parseMarkdown();
                } else {
                    getCommentList(options);
                }

                // hide comment panel
                commentToggle(options);

                const comments = JSON.parse(localStorage.getItem("comments") || "{}");
                delete comments[options.postId];
                localStorage.setItem("comments", JSON.stringify(comments));
            } else {
                alertMsg(result.msg);
            }
        },
        error(result) {
            alertMsg(result.statusText);
        },
        complete() {
            $commentBtn.removeAttr("disabled");
            options.commentVditor.enable();
            if (arguments[0].responseJSON.code === 0) {
                options.commentVditor.setValue("");
            }
        },
    });
};
