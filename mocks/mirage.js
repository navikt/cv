"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer } from "miragejs";
import { samtykkeEuresMock } from "./samtykkeEuresMock";
import { arbeidsforholdMock } from "./arbeidsforholdMock";

createServer({
    namespace: "/personbruker",
    logging: false,
    routes() {
        this.get("/api/samtykke/eures", samtykkeEuresMock);
        this.get("/api/arbeidsforhold", arbeidsforholdMock);
        this.passthrough();
        this.passthrough("https://dekoratoren.ekstern.dev.nav.no/*");
        this.passthrough("https://www.nav.no/*");
    },
});
