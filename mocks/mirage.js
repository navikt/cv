"use client";
import { createServer } from "miragejs";
import { samtykkeEuresMock } from "./samtykkeEuresMock";

createServer({
    namespace: "/personbruker",
    logging: false,
    routes() {
        this.get("/api/samtykke/eures", samtykkeEuresMock);
        this.passthrough();
        this.passthrough("https://dekoratoren.ekstern.dev.nav.no/*");
    },
});
