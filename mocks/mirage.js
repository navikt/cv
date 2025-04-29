"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer } from "miragejs";
import { samtykkeEuresMock } from "./mockData/samtykkeEuresMock";
import { arbeidsforholdMock } from "./mockData/arbeidsforholdMock";
import { veilederDekoratørMock } from "./mockData/veilederDekoratørMock";
import { amplitudeMock } from "./mockData/amplitudeMock";

export function makeLocalhostServer() {
    console.log("Kjører localhost mirage");
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
            this.post("https://amplitude.nav.no/collect", amplitudeMock);
        },
    });
}
