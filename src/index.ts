import $ from "jquery";
import {commentList} from "./action/commentList";
import {commentMenu} from "./action/commentMenu";
import {commentToggle} from "./action/commentToggle";
import {detailsMenu} from "./action/detailsMenu";
import {getCommentList} from "./action/getCommentList";
import "./assets/scss/index.scss";
import {mergeOptions} from "./options";
import {lazyLoadImage} from "./util/lazyLoadImage";
import {parseMarkdown} from "./util/parseMarkdown";

class Vcomment {

    public static parseMarkdown = parseMarkdown;
    public static lazyLoadImage = lazyLoadImage;
    private options: IOptions;
    constructor(options: IOptions) {
        this.options = mergeOptions(options);
        detailsMenu();
        detailsMenu();
        commentList(options);
        commentMenu(options);

        $(`#${options.id}`).on("click", ".commentToggleEditorBtn", () => {
            commentToggle(options);
        });

        $.ajaxSetup({
            xhrFields: {
                withCredentials: true,
            },
        });
    }

    public render() {
        getCommentList(this.options);
    }
}

export default Vcomment;
