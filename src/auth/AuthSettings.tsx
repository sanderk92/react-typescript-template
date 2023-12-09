export const host = ("https://" + window.location.host).replace("www.", "")

export const authSettings = {
    authority: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_6wOiibFgH",
    redirect_uri: `${host}/redirect/`,
    post_logout_redirect_uri: `${host}/logout`,
    response_type: "code",
    client_id: "5mc1dc6iepln87bkbe6tes4cia",
};