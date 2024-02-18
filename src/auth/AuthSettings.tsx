// export const host = ("https://" + window.location.host).replace("www.", "") // remote deploy host

export const host = `http://${window.location.host}` // dev host

export const authSettings = {
    authority: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_6wOiibFgH",
    redirect_uri: `${host}/redirect/`,
    post_logout_redirect_uri: `${host}/logout`,
    response_type: "code",
    client_id: "1gmag0ff95or0clk7ctvn5rgit", // dev credentials
};