import {commentList} from "./action/commentList";
import {commentMenu} from "./action/commentMenu";
import {commentToggle} from "./action/commentToggle";
import {detailsMenu} from "./action/detailsMenu";
import {getCommentList} from "./action/getCommentList";
import "./assets/scss/index.scss";
import {mergeOptions} from "./options";
import {alertMsg} from "./util/alertMst";
import {lazyloadImg} from "./util/lazyloadImg";

class Vcomment {
    private options: IOptions;

    constructor(options: IOptions) {
        this.options = mergeOptions(options);
        detailsMenu();
        commentList(options);
        commentMenu(options);

        $("body").on("click", ".commentToggleEditorBtn", () => {
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
