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

        $actionPanel.html(`<div class="comment2__form">
    <div class="fn__flex">
      <input class="input" type="text" placeholder="评论内容长度 4-4096">
      <button class="comment2SubmitBtn btn btn--confirm">提交</button>
    </div>
    <div class="comment2__desc fn__flex-1">
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
                    commentId:     $btn.closest("li").attr("id"),
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
    }).on("click", ".commentEditBtn", function() {
        const $it = $(this);
        commentToggle(options, $it.closest("li").attr("id"));
        // getComment($it.closest("li").attr("id"), (result) => {
        //     window.commentEditor.setValue(result.commentContent);
        //     $("#commentVisible").prop("checked", result.commentVisible !== 0);
        // });
    });
};
