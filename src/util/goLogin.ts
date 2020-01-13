/**
 * 登录
 */
export const goLogin = (url: string) => {
    window.location.href = url + "/login?userinfo=false&goto=" + encodeURIComponent(location.href);
};
