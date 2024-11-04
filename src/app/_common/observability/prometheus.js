import { collectDefaultMetrics, Counter, Histogram } from "prom-client";

collectDefaultMetrics();

const metrics = {
    cvApiRequestTidsbrukHistorgram: new Histogram({
        name: "cv_request_duration_seconds",
        help: "Lastetid API-kall",
        labelNames: ["path"],
    }),

    tokenExchangeTidsbrukHistogram: new Histogram({
        name: "cv_token_exchange_duration_seconds",
        help: "Tidsbruk på tokenutveksling mot TokenX",
    }),

    apiUnauthorized: new Counter({
        name: "cv_api_unauthorized_counter",
        help: "Kall til API routes som er uautorisert",
        labelNames: ["path"],
    }),

    nyPersonCounter: new Counter({
        name: "cv_ny_person_counter",
        help: "Antall nye personer fra CVløsningen",
    }),

    tomCvCounter: new Counter({
        name: "cv_tom_cv_counter",
        help: "Antall hentinger av tom CV fra CVløsningen",
    }),

    cvOppdateringCounter: new Counter({
        name: "cv_oppdatering_counter",
        help: "Antall oppdateringer av CV",
        labelNames: ["seksjon"],
    }),

    hjemmelGodtatCounter: new Counter({
        name: "cv_bekreft_lest_hjemmel_counter",
        help: "Antall bekreftelser av sett hjemmel",
    }),

    bekreftetTidligereCvCounter: new Counter({
        name: "cv_bekreft_tidligere_cv_counter",
        help: "Antall bekreftelser av tidligere CV",
    }),

    ikkeUnderOppfølgingCounter: new Counter({
        name: "cv_ikke_under_oppfolging_counter",
        help: "Antall forsøk på å logge inn på ny CV-løsning når man ikke er under oppfølging",
    }),
};

export default metrics;
