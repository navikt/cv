import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";

let faro = null;

export function initInstrumentation() {
    if (typeof window === "undefined" || faro !== null) return;
    getFaro();
}

export function getFaro() {
    if (process.env.NEXT_PUBLIC_TELEMETRY_URL == null) return null;

    if (faro != null) return faro;
    faro = initializeFaro({
        paused: process.env.NODE_ENV !== "production",
        url: process.env.NEXT_PUBLIC_TELEMETRY_URL,
        app: {
            name: "cv",
        },
        instrumentations: [
            ...getWebInstrumentations({
                captureConsole: false,
            }),
        ],
    });
    return faro;
}
