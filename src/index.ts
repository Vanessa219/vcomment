import {commentList} from "./action/commentList";
import {commentMenu} from "./action/commentMenu";
import {detailsMenu} from "./action/detailsMenu";
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
    }

    public render() {
        const options = this.options;
        $.ajax({
            cache: false,
            success: (result: IResponse) => {
                if (result.code !== 0) {
                    alertMsg(result.msg);
                    return;
                }

                document.getElementById(options.id).innerHTML = result.data.html;
                const commentsElement = $(`#${options.id} .vcomment`);
                options.csrfToken = commentsElement.data("csrf");
                options.isLoggedIn = commentsElement.data("login");
                options.commonAddCommentGrant = commentsElement.data("grant");
                lazyloadImg(options.id);
                Util.parseLanguage();
                Util.parseMarkdown();
            },
            url: `${options.url}/apis/vcomment?id=${options.postId}&p=${options.currentPage}`,
            xhrFields: {
                withCredentials: true,
            },
        });
    }
}

export default Vcomment;
