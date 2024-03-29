import $ from "jquery";
import {lazyLoadImage} from "../util/lazyLoadImage";
import {parseMarkdown} from "../util/parseMarkdown";
import {initPagination} from "./initPagination";

export const getCommentList = (options: IOptions) => {
    document.getElementById(options.id).innerHTML = '<div class="vcomment__center"><svg style="height: 260px;width: 260px;background: none;" width="260px"  height="260px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="20" stroke-width="4" stroke="#3b3e43" stroke-dasharray="31.41592653589793 31.41592653589793" transform="rotate(111.924 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-dasharray="{{config.dasharray2}}" ng-attr-stroke-dashoffset="{{config.dashoffset2}}" fill="none" stroke-linecap="round" r="15" stroke-width="4" stroke="#d23f31" stroke-dasharray="23.561944901923447 23.561944901923447" stroke-dashoffset="23.561944901923447" transform="rotate(-111.924 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg></div>';
    $.ajax({
        cache: false,
        success: (result: IResponse) => {
            if (result.code !== 0) {
                if (options.error) {
                    options.error();
                }
                return;
            }
            document.getElementById(options.id).innerHTML = result.data.html;
            lazyLoadImage();
            parseMarkdown(options.vditor);
            initPagination(options);
            if (options.after) {
                options.after();
            }
            options.commentVditor = null;
            if (options.currentPage === 1) {
                return;
            }
            $("html, body").animate({scrollTop: $(`#${options.id}`).offset().top}, 300);
        },
        url: `${options.url}/apis/vcomment?aid=${options.postId}&p=${options.currentPage}&un=${options.userName}`,
    });
};
