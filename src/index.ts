import {mergeOptions} from "./options";
import {fetchGet} from "./util/fetch";

class Vcomment {
    private options: IOptions;

    constructor(options: IOptions) {
        this.options = mergeOptions(options);
    }

    public async render() {
        const commentList = await fetchGet(`${this.options.url}/vcomment?id=${this.options.postId}&p=1`);
        console.log(commentList)
    }
}

export default Vcomment;
