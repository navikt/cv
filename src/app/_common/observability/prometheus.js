import { collectDefaultMetrics, Counter, Histogram } from "prom-client";

class AppMetrics {
    constructor() {
        if (AppMetrics._instance) {
            console.warn("already created!");
            // eslint-disable-next-line no-constructor-return
            return AppMetrics._instance;
        }
        AppMetrics._instance = this;
        collectDefaultMetrics();
    }

    cvApiRequestTidsbrukHistorgram = new Histogram({
        name: "cv_request_duration_seconds",
        help: "Lastetid API-kall",
        labelNames: ["path"],
    });

    tokenExchangeTidsbrukHistogram = new Histogram({
        name: "cv_token_exchange_duration_seconds",
        help: "Tidsbruk på tokenutveksling mot TokenX",
    });

    apiUnauthorized = new Counter({
        name: "cv_api_unauthorized_counter",
        help: "Kall til API routes som er uautorisert",
        labelNames: ["path"],
    });

    nyPersonCounter = new Counter({
        name: "cv_ny_person_counter",
        help: "Antall nye personer fra CVløsningen",
    });

    tomCvCounter = new Counter({
        name: "cv_tom_cv_counter",
        help: "Antall hentinger av tom CV fra CVløsningen",
    });

    cvOppdateringCounter = new Counter({
        name: "cv_oppdatering_counter",
        help: "Antall oppdateringer av CV",
        labelNames: ["seksjon"],
    });
}

export default AppMetrics;
