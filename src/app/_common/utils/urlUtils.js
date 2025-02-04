import { getMiljø, Miljø } from "@/app/_common/utils/miljøUtils";

export const navBaseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" ? "https://www.ansatt.dev.nav.no" : "https://www.nav.no";

export const arbeidsplassenBaseUrl =
    getMiljø() === Miljø.DEV ? "https://arbeidsplassen.intern.dev.nav.no" : "https://arbeidsplassen.nav.no";
