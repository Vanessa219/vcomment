import "./assets/scss/index.scss";
import {mergeOptions} from "./options";
import {detailsMenu} from "./util/detailsMenu";
import {fetchGet} from "./util/fetch";
import {lazyloadImg} from "./util/lazyloadImg";

class Vcomment {
    private options: IOptions;

    constructor(options: IOptions) {
        this.options = mergeOptions(options);
    }

    public async render() {
        const commentList = await fetchGet(`${this.options.url}/vcomment?id=${this.options.postId}&p=3`);
        document.getElementById(this.options.id).innerHTML = commentList.data.html;
        lazyloadImg(this.options.id);
        detailsMenu();
    }
}

export default Vcomment;
