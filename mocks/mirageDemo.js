"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer } from "miragejs";
import { arbeidsforholdMock } from "./mockData/arbeidsforholdMock";
import { amplitudeMock } from "./mockData/amplitudeMock";
import { tomCvMock } from "./mockData/tomCvMock";
import { tomPersonMock } from "./mockData/tomPersonMock";

// Må ha med en ID fordi mirage lagrer ting som arrays
const DB_ID = 1;

console.log("Importerer mirageDemo");

export function makeMockServer() {
    console.warn("Kjører demo-mirage");
    createServer({
        seeds(server) {
            server.db.loadData({
                cv: { id: DB_ID, ...tomCvMock },
                person: { id: DB_ID, ...tomPersonMock },
                euresSamtykke: { id: DB_ID, samtykke: null },
            });
        },
        namespace: "/min-cv",
        logging: false,
        routes() {
            this.get("/api/arbeidsforhold", arbeidsforholdMock);
            this.get("/api/isAuthenticated", { message: "OK" });

            this.get("/api/cv", (schema) => schema.db.cv.find(DB_ID));
            this.put("/api/cv/:seksjon", (schema, request) => {
                const requestBody = JSON.parse(request.requestBody);
                const cv = schema.db.cv.find(DB_ID);
                const oppdatertCv = { ...cv, ...requestBody };
                schema.db.cv.update(DB_ID, oppdatertCv);
                return oppdatertCv;
            });

            this.get("/api/person", (schema) => schema.db.person.find(DB_ID));
            this.put("/api/personalia", (schema, request) => {
                const requestBody = JSON.parse(request.requestBody);
                const person = schema.db.person.find(DB_ID);
                const oppdatertPerson = { ...person, personalia: { ...requestBody } };
                schema.db.person.update(DB_ID, oppdatertPerson);
                return requestBody;
            });

            this.get("/api/samtykke/eures", { message: "Not Found" }, 404);

            this.passthrough();
            this.passthrough("https://dekoratoren.ekstern.dev.nav.no/*");
            this.passthrough("https://www.nav.no/*");
            this.passthrough("https://cdn.nav.no/*");
            this.post("https://amplitude.nav.no/collect", amplitudeMock);
        },
    });
}
