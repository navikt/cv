export const navBaseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "prod" ? "https://www.nav.no" : "https://www.ansatt.dev.nav.no";

export const arbeidsplassenBaseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "prod"
        ? "https://arbeidsplassen.nav.no"
        : "https://arbeidsplassen.intern.dev.nav.no";
