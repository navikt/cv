"use client";

export const Miljø = Object.freeze({
    DEV: "dev",
    PROD: "prod",
    LOCAL: "local",
});

export const getMiljø = () => {
    if (typeof window === "undefined") {
        return Miljø.LOCAL;
    }

    const { hostname } = window.location;

    if (hostname.includes("intern.dev.nav.no") || hostname.includes("ansatt.dev.nav.no")) {
        return Miljø.DEV;
    }

    if (hostname.includes("intern.nav.no") || hostname.includes("www.nav.no")) {
        return Miljø.PROD;
    }

    return Miljø.LOCAL;
};
