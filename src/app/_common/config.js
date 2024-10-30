import getConfig from "next/config";

const gyldigeMiljøer = ["localhost", "dev", "prod"];
const erGyldigMiljø = (miljø) => gyldigeMiljøer.includes(miljø);

const serverConfigMap = {
    localhost: {
        dekoratoren: {
            minSideUrl: "https://www.ansatt.dev.nav.no/minside",
            miljø: "dev",
        },
        audience: {
            cvApi: "local:teampam:pam-cv-api-gcp",
            euresCvEksport: "local:teampam:pam-eures-cv-eksport",
        },
        urls: {
            cvApi: "http://localhost:8080/pam-cv-api/rest",
            pamOntologi: "https://pam-ontologi.intern.dev.nav.no/rest/typeahead",
            euresCvEksport: "http://localhost:9030/pam-eures-cv-eksport/samtykke",
        },
    },
    dev: {
        dekoratoren: {
            minSideUrl: "https://www.ansatt.dev.nav.no/minside",
            miljø: "dev",
        },
        audience: {
            cvApi: "dev-gcp:teampam:pam-cv-api-gcp",
            euresCvEksport: "dev-gcp:teampam:pam-eures-cv-eksport",
        },
        urls: {
            cvApi: "http://pam-cv-api-gcp/pam-cv-api/rest",
            pamOntologi: "http://pam-ontologi/rest/typeahead",
            euresCvEksport: "http://pam-eures-cv-eksport/pam-eures-cv-eksport/samtykke",
        },
    },
    prod: {
        dekoratoren: {
            minSideUrl: "https://www.nav.no/minside",
            miljø: "prod",
        },
        audience: {
            cvApi: "prod-gcp:teampam:pam-cv-api-gcp",
            euresCvEksport: "prod-gcp:teampam:pam-eures-cv-eksport",
        },
        urls: {
            cvApi: "http://pam-cv-api-gcp/pam-cv-api/rest",
            pamOntologi: "http://pam-ontologi/rest/typeahead",
            euresCvEksport: "http://pam-eures-cv-eksport/pam-eures-cv-eksport/samtykke",
        },
    },
};

export const navBaseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "prod" ? "https://www.nav.no" : "https://www.ansatt.dev.nav.no";

export const arbeidsplassenBaseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "prod"
        ? "https://arbeidsplassen.nav.no"
        : "https://arbeidsplassen.intern.dev.nav.no";

const hentConfig = (miljø) => {
    if (!erGyldigMiljø(miljø)) throw new Error(`Ukjent miljø ${miljø}`);
    return serverConfigMap[miljø];
};

export const serverMiljø = getConfig().serverRuntimeConfig.environment;

export const serverConfig = hentConfig(serverMiljø || process.env.NEXT_PUBLIC_ENVIRONMENT);
