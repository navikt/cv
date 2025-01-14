import "./envConfig";

const hentServerConfigMap = () => ({
    nodeEnv: process.env.NODE_ENV,
    naisCluster: process.env.NAIS_CLUSTER_NAME,
    audience: {
        cvApi: process.env.PAM_CV_API_AUDIENCE,
        euresCvEksport: process.env.PAM_EURES_CV_EKSPORT_AUDIENCE,
    },
    scope: {
        modiaDekorator: process.env.ER_VEILEDER === "true" ? process.env.MODIA_DEKORATOR_SCOPE : null,
        cvApi: process.env.ER_VEILEDER === "true" ? process.env.PAM_CV_API_GCP_SCOPE : null,
    },
    urls: {
        base: process.env.BASE_URL,
        login: process.env.LOGIN_URL,
        cvApi: process.env.PAM_CV_API_BASEURL,
        pamOntologi: process.env.PAM_ONTOLOGI_BASEURL,
        euresCvEksport: process.env.PAM_EURES_CV_EKSPORT_BASEURL,
        modiaDekorator: process.env.MODIA_DEKORATOR_BASEURL,
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
    erVeileder: process.env.ER_VEILEDER === "true",
    erDemoApp: process.env.ER_DEMO_APP === "true",
});

export const serverConfig = hentServerConfigMap();
