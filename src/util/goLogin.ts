/**
 * 登录
 */
export const goLogin = (url: string) => {
    window.location.href = url + "/login?goto=" + encodeURIComponent(location.href) + "userinfo=false";
};
