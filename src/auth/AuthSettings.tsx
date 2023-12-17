export const host = ("https://" + window.location.host).replace("www.", "")

export const authSettings = {
    authority: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_6wOiibFgH",
    redirect_uri: `${host}/redirect/`,
    post_logout_redirect_uri: `${host}/logout`,
    response_type: "code",
    client_id: "4c9hh7fk0neq6jr47f877c3a49",
};