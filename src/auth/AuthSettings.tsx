export const authSettings = {
    authority: "http://localhost:8081/auth/realms/master/",
    redirect_uri: "http://localhost:3000/",
    post_logout_redirect_uri: "http://localhost:3000/",
    response_type: "code",
    client_id: "app",
};