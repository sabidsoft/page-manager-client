export const getToken = (): string => {
    const localAuth = localStorage.getItem("auth");
    let auth;

    if (localAuth) {
        auth = JSON.parse(localAuth);
        return auth.token;
    }

    return "";
}