import {getCommentList} from "./getCommentList";

export const initPagination = (options: IOptions) => {
    $(".vcomment__paginations [data-page]").click(function() {
        options.currentPage = $(this).data("page");
        getCommentList(options);
    });
};
