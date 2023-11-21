export const host = window.location.protocol + "//" + window.location.host

export const authSettings = {
    authority: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_6wOiibFgH",
    redirect_uri: host + "/redirect",
    post_logout_redirect_uri: host + "/logout",
    response_type: "code",
    client_id: "7ogq7f8re2t778fs2b5sjf7avt",
};