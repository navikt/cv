const gyldigeMiljøer = ["localhost", "dev", "prod"];
const erGyldigMiljø = (miljø) => gyldigeMiljøer.includes(miljø);

const configMap = {
    localhost: {
        dekoratoren: {
            minSideUrl: "https://www.ansatt.dev.nav.no/minside",
            miljø: "dev",
        },
    },
    dev: {
        dekoratoren: {
            minSideUrl: "https://www.ansatt.dev.nav.no/minside",
            miljø: "dev",
        },
    },
    prod: {
        dekoratoren: {
            minSideUrl: "https://www.nav.no/minside",
            miljø: "prod",
        },
    },
};

const hentConfig = (miljø) => {
    if (!erGyldigMiljø(miljø)) throw new Error(`Ukjent miljø ${miljø}`);
    return configMap[miljø];
};

export const cvConfig = hentConfig(process.env.NEXT_PUBLIC_ENVIRONMENT);
