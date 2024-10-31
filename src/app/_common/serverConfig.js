import "./envConfig";

const hentServerConfigMap = () => ({
    nodeEnv: process.env.NODE_ENV,
    audience: {
        cvApi: process.env.PAM_CV_API_AUDIENCE,
        euresCvEksport: process.env.PAM_EURES_CV_EKSPORT_AUDIENCE,
    },
    urls: {
        cvApi: process.env.PAM_CV_API_BASEURL,
        pamOntologi: process.env.PAM_ONTOLOGI_BASEURL,
        euresCvEksport: process.env.PAM_EURES_CV_EKSPORT_BASEURL,
    },
    tokenx: {
        wellKnownUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
        clientId: process.env.TOKEN_X_CLIENT_ID,
        privateJwk: process.env.TOKEN_X_PRIVATE_JWK,
    },
    idPorten: {
        wellKnownUrl: process.env.IDPORTEN_WELL_KNOWN_URL,
        jwksUri: process.env.IDPORTEN_JWKS_URI,
        audience: process.env.IDPORTEN_AUDIENCE,
    },
});

export const serverConfig = hentServerConfigMap();
