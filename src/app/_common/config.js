import "./envConfig";
import { arbeidsplassenBaseUrl } from "@/app/_common/utils/urlUtils";

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

const hentConfig = (miljø) => {
    if (!erGyldigMiljø(miljø)) return null;
    return serverConfigMap[miljø];
};

export const hentDekoratørProps = (miljø) => {
    const config = hentConfig(miljø);
    return {
        env: config?.dekoratoren?.miljø || "prod",
        params: {
            utilsBackground: "white",
            context: "privatperson",
            redirectToApp: true,
            breadcrumbs: [
                {
                    title: "Min side",
                    url: config?.dekoratoren?.minSideUrl || arbeidsplassenBaseUrl,
                },
                {
                    title: "Din CV",
                    url: "/personbruker",
                },
            ],
        },
    };
};

export const serverMiljø = () => {
    if (process.env.NODE_ENV === "development") return "localhost";
    if (process.env.NAIS_CLUSTER_NAME === "prod-gcp") return "prod";
    if (process.env.NAIS_CLUSTER_NAME === "dev-gcp") return "dev";
    return undefined;
};

export const serverConfig = hentConfig(serverMiljø());
