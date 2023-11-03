// A suitable OktaConfig.ts is required in this directory,
// but omitted from the repo.
// It should take the following format:

export const OktaConfigExample = {
    clientId: "client id",
    issuer: "issuer URI",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
};
