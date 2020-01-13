export const detailsMenu = () => {
    document.addEventListener("click", (event) => {
        const $target = $(event.target);
        if ($target.closest("details-menu").length === 1) {
            $target.closest(".details").removeAttr("open");
        }
        if ($target.closest(".details").length === 0) {
            $(".details").removeAttr("open");
        }
    });
    $("body").on("click", ".details summary", () => {
        $(".details").removeAttr("open");
    });
};
