import {alertMsg} from "../util/alertMst";
import {goLogin} from "../util/goLogin";
import {initVditor} from "./initVditor";

export const commentToggle = (options: IOptions, id?: string, name?: string,
                              avatar?: string, defaultValue?: string) => {
    if (!$(`#${options.id} .vcomment`).data("login")) {
        goLogin(options.url);
        return;
    }

    const $editorPanel = $(".vcomment__editor");
    const $editorContent = $(".vcomment__editor-main");

    if (!$(`#${options.id} .vcomment`).data("grant")) {
        alertMsg("角色有误");
        return;
    }

    if ($editorPanel.css("display") === "block") {
        $editorContent.slideUp(() => {
            $editorPanel.hide();
        });
        return;
    }

    const $replyUseName = $("#vcommentReplyUseName");
    $replyUseName.removeData();

    if (name) {
        // reply comment
        $replyUseName.data("commentOriginalCommentId", id).html(`<div class="vcomment__meta vcomment__flexinline">
  <svg class="vcomment__svg" viewBox="0 0 32 32">
    <path d="M19.583 9.75q-8.667 1.25-13.375 6.625t-6.208 12.958q6.417-9.083 19.583-9.083v7.25l12.417-12.417-12.417-12.417v7.083z"></path>
  </svg>
  <span class="vcomment__space"></span>
  <img class="vcomment__avatar vcomment__avatar--small" src="${avatar}">
  <span>${name}</span>
</div>`);
    } else if (id) {
        // edit
        $replyUseName.data("commentId", id).html(`<div class="vcomment__meta">编辑</div>`);
    } else {
        // reply article
        $replyUseName.html(`<div class="vcomment__flexinline vcomment__meta">
  <svg class="vcomment__svg" viewBox="0 0 32 32">
    <path d="M19.583 9.75q-8.667 1.25-13.375 6.625t-6.208 12.958q6.417-9.083 19.583-9.083v7.25l12.417-12.417-12.417-12.417v7.083z"></path>
  </svg>
  <span class="vcomment__space"></span>
  <span>${$("title").html()}</span>
</div>`);
    }
    $editorPanel.show();
    $editorContent.slideDown(() => {
        initVditor(options, defaultValue);
    });

    // 回复的回帖高亮
    const $comment = $(`#${id}`);
    if ($comment.length === 1) {
        if ($(window).width() < 768) {
            $(window).scrollTop($comment[0].offsetTop - 308);
        } else {
            $(window).scrollTop($comment[0].offsetTop);
        }
    }

    $comment.css({
        "background-color": "#9bbee0",
    });
    setTimeout(() => {
        $comment.css({
            "background-color": "#FFF",
            "transition": "all 3s cubic-bezier(0.56, -0.36, 0.58, 1)",
        });
    }, 100);
    setTimeout(() => {
        $comment.removeAttr("style");
    }, 3100);
};
