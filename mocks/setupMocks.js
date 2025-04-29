import { logger } from "@navikt/next-logger";

export function setupMocks() {
    if (!(process.env.ER_DEMO_APP === "true" || process.env.NODE_ENV === "development")) {
        logger.info("Kjører i produksjonsmodus");
    } else if (process.env.ER_DEMO_APP === "true") {
        import("./mirageDemo").then(() => logger.warn("Mirage mocks kjører i demo-modus!"));
    } else if (process.env.NODE_ENV === "development") {
        import("./mirage").then(() => logger.warn("Mirage mocks kjører!"));
    }
}
