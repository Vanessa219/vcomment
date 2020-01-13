/**
 * 登录
 */
export const goLogin = (url: string) => {
    let gotoURL = location.href;
    if (location.search.indexOf("?goto") === 0) {
        gotoURL = location.href.replace(location.search, "");
    }
    window.location.href = url + "/login?goto=" + encodeURIComponent(gotoURL);
};
