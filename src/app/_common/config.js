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
        },
        urls: {
            cvApi: "http://localhost:8080/pam-cv-api/rest",
            pamOntologi: "https://pam-ontologi.intern.dev.nav.no/rest/typeahead",
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
        },
        urls: {
            cvApi: "http://pam-cv-api-gcp/pam-cv-api/rest",
            pamOntologi: "http://pam-ontologi/rest/typeahead",
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
        },
        urls: {
            cvApi: "http://pam-cv-api-gcp/pam-cv-api/rest",
            pamOntologi: "http://pam-ontologi/rest/typeahead",
        },
    },
};

const hentConfig = (miljø) => {
    if (!erGyldigMiljø(miljø)) throw new Error(`Ukjent miljø ${miljø}`);
    return configMap[miljø];
};

export const cvConfig = hentConfig(process.env.NEXT_PUBLIC_ENVIRONMENT);
