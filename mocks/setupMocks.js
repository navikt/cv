import { logger } from "@navikt/next-logger";

export async function setupMocks() {
    if (!(process.env.ER_DEMO_APP === "true" || process.env.NODE_ENV === "development")) {
        logger.info("Kjører i produksjonsmodus");
        return;
    }

    if (process.env.ER_DEMO_APP === "true") {
        await import("./mirageDemo");
        logger.warn("Miragejs kjører i demo-modus");
    } else if (process.env.NODE_ENV === "development") {
        await import("./mirage");
        logger.warn("Miragejs kjører i localhost-modus");
    }
}
