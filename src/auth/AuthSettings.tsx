export const authSettings = {
    authority: "http://localhost:8081/auth/realms/master/",
    redirect_uri: window.location.href,
    post_logout_redirect_uri: "http://localhost:5173/",
    response_type: "code",
    client_id: "frontend",
};