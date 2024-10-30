import getConfig from "next/config";

const gyldigeMiljøer = ["localhost", "dev", "prod"];
const erGyldigMiljø = (miljø) => gyldigeMiljøer.includes(miljø);

const configMap = {
    localhost: {
        dekoratoren: {
            minSideUrl: "https://www.ansatt.dev.nav.no/minside",
            miljø: "dev",
        },
        audience: {
            cvApi: "local:teampam:pam-cv-api-gcp",
            pamOntologi: "local:teampam:pam-ontologi",
            euresCvEksport: "local:teampam:pam-eures-cv-eksport",
        },
        urls: {
            cvApi: "http://localhost:8080/pam-cv-api/rest",
            pamOntologi: "https://pam-ontologi.intern.dev.nav.no/rest/typeahead",
            euresCvEksport: "http://localhost:9030/pam-eures-cv-eksport/samtykke",
            nav: "https://www.ansatt.dev.nav.no",
            arbeidsplassen: "https://arbeidsplassen.intern.dev.nav.no",
        },
    },
    dev: {
        dekoratoren: {
            minSideUrl: "https://www.ansatt.dev.nav.no/minside",
            miljø: "dev",
        },
        audience: {
            cvApi: "dev-gcp:teampam:pam-cv-api-gcp",
            pamOntologi: "dev-gcp:teampam:pam-ontologi",
            euresCvEksport: "dev-gcp:teampam:pam-eures-cv-eksport",
        },
        urls: {
            cvApi: "http://pam-cv-api-gcp/pam-cv-api/rest",
            pamOntologi: "http://pam-ontologi/rest/typeahead",
            euresCvEksport: "http://pam-eures-cv-eksport/pam-eures-cv-eksport/samtykke",
            nav: "https://www.ansatt.dev.nav.no",
            arbeidsplassen: "https://arbeidsplassen.intern.dev.nav.no",
        },
    },
    prod: {
        dekoratoren: {
            minSideUrl: "https://www.nav.no/minside",
            miljø: "prod",
        },
        audience: {
            cvApi: "prod-gcp:teampam:pam-cv-api-gcp",
            pamOntologi: "prod-gcp:teampam:pam-ontologi",
            euresCvEksport: "prod-gcp:teampam:pam-eures-cv-eksport",
        },
        urls: {
            cvApi: "http://pam-cv-api-gcp/pam-cv-api/rest",
            pamOntologi: "http://pam-ontologi/rest/typeahead",
            euresCvEksport: "http://pam-eures-cv-eksport/pam-eures-cv-eksport/samtykke",
            nav: "https://www.nav.no",
            arbeidsplassen: "https://arbeidsplassen.nav.no",
        },
    },
};

const hentConfig = (miljø) => {
    if (!erGyldigMiljø(miljø)) throw new Error(`Ukjent miljø ${miljø}`);
    return configMap[miljø];
};

export const miljø = getConfig()?.serverRuntimeConfig?.environment;

export const cvConfig = hentConfig(process.env.NEXT_PUBLIC_ENVIRONMENT);
