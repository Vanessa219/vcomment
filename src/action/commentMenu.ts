import {alertMsg} from "../util/alertMst";
import {confirmMsg} from "../util/confirmMsg";
import {goLogin} from "../util/goLogin";
import {lazyloadImg} from "../util/lazyloadImg";
import {commentToggle} from "./commentToggle";

export const commentMenu = (options: IOptions) => {
    $(`#${options.id}`).on("click", ".commentMenuBtn", function() {
        if (!$(`#${options.id} .vcomment`).data("login")) {
            goLogin(options.url);
            return;
        }
        const $btn = $(this);
        if ($.trim($btn.closest("details").find("details-menu").html()) !== "") {
            return;
        }
        if ($btn.attr("disabled") === "disabled") {
            return;
        }
        $btn.attr("disabled", "disabled");
        $.ajax({
            cache: false,
            url: `${options.url}/apis/vcomment/action?id=${$btn.closest("li").attr("id")}`,
            complete(result) {
                $btn.removeAttr("disabled");
                if (result.responseJSON.code === 0) {
                    $btn.closest("details").find("details-menu").html(result.responseJSON.data);
                } else {
                    alertMsg(result.responseJSON.msg);
                }
            },
            xhrFields: {
                withCredentials: true,
            },
        });
    }).on("click", ".comment2Btn", function() {
        if (!$(this).data("grant")) {
            alertMsg("因权限不足操作已被禁止");
            return;
        }

        const $actionPanel = $(this).closest("li").find(".commentActionPanel");

        $actionPanel.html(`<div class="vcomment__comment2-form">
    <div class="vcomment__flex">
      <input class="vcomment__input" type="text" placeholder="评论内容长度 4-4096">
      <button class="comment2SubmitBtn vcomment__btn vcomment__btn--comment2">提交</button>
    </div>
    <div class="vcomment__hr"></div>
    <div class="vcomment__meta">
     仅支持_斜体_、**加粗**以及超链接，请浏览<a href="https://hacpai.com/article/1555259445024" target="_blank">使用场景说明</a>了解更多细节
    </div>
</div>`).slideDown();
        $actionPanel.find("input").focus();
    }).on("click", ".commentThankBtn", function() {
        const $btn = $(this);
        confirmMsg($btn.data("tip"), () => {
            if ($btn.attr("disabled") === "disabled") {
                return;
            }

            $btn.attr("disabled", "disabled");

            $.ajax({
                cache: false,
                complete: () => {
                    $btn.removeAttr("disabled");
                },
                data: JSON.stringify({
                    commentId: $btn.closest("li").attr("id"),
                }),
                headers: {csrfToken: $(`#${options.id} .vcomment`).data("csrf")},
                type: "POST",
                url: options.url + "/apis/vcomment/thank",
                success(result) {
                    if (result.code !== 0) {
                        alertMsg(result.msg);
                        return;
                    }
                    $btn.closest("li")[0].outerHTML = result.data.html;
                    lazyloadImg(options.id);
                    Util.parseLanguage();
                    Util.parseMarkdown();
                },
                xhrFields: {
                    withCredentials: true,
                },
            });
        });
    }).on("click", ".commentMenuBtn .commentShowEditorBtn", function() {
        const $it = $(this);
        commentToggle(options, $it.closest("li").attr("id"), $it.data("name"),
            $it.data("avatar"));
    }).on("click", ".commentRemoveBtn", function() {
        const $it = $(this);
        // removeComment($it.closest("li").attr("id"), options && options.removeCmt);
        if (!$(`#${options.id} .vcomment`).data("login")) {
            goLogin(options.url);
            return;
        }

        const id = $it.closest("li").attr("id");
        confirmMsg("确定删除么？", () => {
            $.ajax({
                cache: false,
                type: "DELETE",
                url: options.url + "/apis/vcomment/" + id,
                success(result) {
                    if (result.sc === 0) {
                        $("#" + id).remove();
                        const $cnt = $("#commentsCount");
                        $cnt.text((parseInt($cnt.first().text(), 10) - 1) || "");
                    } else {
                        alertMsg(result.msg);
                    }
                },
                xhrFields: {
                    withCredentials: true,
                },
            });
        });
    }).on("click", ".commentEditBtn", function() {
        const $it = $(this);
        $.ajax({
            cache: false,
            url: options.url + "/apis/vcomment/vcomment/" + $it.closest("li").attr("id") + "/content",
            success(result) {
                if (result.sc === 0) {
                    commentToggle(options, $it.closest("li").attr("id"),
                        "", "", result.commentContent);
                }
            },
            xhrFields: {
                withCredentials: true,
            },
        });
    }).on("click", ".comment2Thank", function() {
        const $btn = $(this);
        confirmMsg($btn.data("tip"), () => {
            $btn.attr("disabled", "disabled");
            $.ajax({
                complete: () => {
                    $btn.removeAttr("disabled");
                },
                data: JSON.stringify({
                    comment2Id: $btn.closest(".comment2Item").data("id"),
                }),
                headers: {csrfToken: $(`#${options.id} .vcomment`).data("csrf")},
                type: "POST",
                url: `${options.url}/apis/vcomment2/thank`,
                success(result) {
                    if (result.code === 0) {
                        $btn.closest(".comment2Item")[0].outerHTML = result.data.html;
                    } else {
                        alertMsg(result.msg);
                    }
                },
                xhrFields: {
                    withCredentials: true,
                },
            });
        });
    });
};
