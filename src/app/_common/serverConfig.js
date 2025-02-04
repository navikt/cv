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
        cvApi: process.env.ER_VEILEDER === "true" ? process.env.PAM_CV_API_SCOPE : null,
    },
    urls: {
        base: process.env.BASE_URL,
        login: process.env.LOGIN_URL,
        cvApi: process.env.PAM_CV_API_BASEURL,
        pamOntologi: process.env.PAM_ONTOLOGI_BASEURL,
        euresCvEksport: process.env.PAM_EURES_CV_EKSPORT_BASEURL,
        modiaDekorator: process.env.MODIA_DEKORATOR_BASEURL,
    },
    erVeileder: process.env.ER_VEILEDER === "true",
});

export const serverConfig = hentServerConfigMap();

export function hentCvApiAudScope() {
    const config = hentServerConfigMap();
    if (config.erVeileder) return config.scope.cvApi;
    return config.audience.cvApi;
}
