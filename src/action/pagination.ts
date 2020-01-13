export const pagination = () => {
    $(".vcommentPaginations [data-page]").click(function() {
        console.log($(this).data("page"));
    });
};
