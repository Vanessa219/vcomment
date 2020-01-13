import {alertMsg} from "../util/alertMst";
import {lazyloadImg} from "../util/lazyloadImg";
import {initPagination} from "./initPagination";

export const getCommentList = (options: IOptions) => {
    $.ajax({
        cache: false,
        success: (result: IResponse) => {
            if (result.code !== 0) {
                alertMsg(result.msg);
                return;
            }

            document.getElementById(options.id).innerHTML = result.data.html;
            lazyloadImg(options.id);
            Util.parseLanguage();
            Util.parseMarkdown();
            initPagination(options)
            options.commentVditor = null;
        },
        url: `${options.url}/apis/vcomment?id=${options.postId}&p=${options.currentPage}`,
        xhrFields: {
            withCredentials: true,
        },
    });
};
