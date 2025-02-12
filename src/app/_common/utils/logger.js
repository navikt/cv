import { configureLogger } from "@navikt/next-logger";

export default function initLogger() {
    configureLogger({
        basePath: "/min-cv",
    });
}
