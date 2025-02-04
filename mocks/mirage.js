"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer } from "miragejs";
import { samtykkeEuresMock } from "./samtykkeEuresMock";
import { arbeidsforholdMock } from "./arbeidsforholdMock";
import { veilederDekoratørMock } from "./veilederDekoratørMock";

createServer({
    namespace: "/min-cv",
    logging: false,
    routes() {
        this.get("/api/samtykke/eures", samtykkeEuresMock);
        this.get("/api/arbeidsforhold", arbeidsforholdMock);
        this.get("/api/veileder/api/context/v2/aktivbruker", { aktivBruker: "04010100653" });
        this.post("/api/veileder/api/context", { aktivBruker: "04010100653" });
        this.get("/api/veileder/api/decorator", veilederDekoratørMock);
        this.passthrough();
        this.passthrough("https://dekoratoren.ekstern.dev.nav.no/*");
        this.passthrough("https://www.nav.no/*");
        this.passthrough("https://cdn.nav.no/*");
    },
});
