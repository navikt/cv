import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { SpråkEnum, UtdanningsnivåEnum } from "@/app/_common/enums/cvEnums";
import {
    formatterDato,
    formatterFullDato,
    formatterTidsenhet,
    fjernHtmlTags,
    storForbokstav,
    formatterAdresse,
} from "@/app/_common/utils/stringUtils";
import { datosorterElementer } from "@/app/_common/utils/dateUtils";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function lastNedCvPdf(cv, personalia) {
    const {
        sammendrag,
        arbeidserfaring,
        utdanning,
        fagbrev,
        offentligeGodkjenninger,
        annenErfaring,
        andreGodkjenninger,
        kurs,
        foererkort,
        spraak,
        kompetanser,
    } = cv;
    const filnavn = `CV-${personalia.fornavn}.${personalia.etternavn}.pdf`;
    const navn = `${personalia.fornavn} ${personalia.etternavn}`;

    const formattertAdresse = () =>
        personaliaRad("Adresse:", formatterAdresse(personalia.adresse, personalia.postnummer, personalia.poststed));

    const personaliaRad = (tittel, innhold) => ({
        columns: [
            {
                style: "fontNormal",
                text: tittel,
                width: "13%",
            },
            {
                style: "fontNormal",
                text: innhold,
            },
        ],
    });

    const sammendragRad = (innhold) => {
        if (innhold) {
            return {
                columns: [
                    {
                        style: "subheader",
                        text: "Sammendrag",
                        width: "24%",
                    },
                    {
                        layout: {
                            paddingBottom: () => 4,
                            paddingLeft: () => 10,
                            paddingTop: () => 4,
                            vLineColor: () => "#b7b1a9",
                        },
                        table: {
                            body: [
                                [
                                    {
                                        border: [1, 0, 0, 0],
                                        style: "fontNormal",
                                        text: fjernHtmlTags(innhold, { allowedTags: [] }),
                                    },
                                ],
                            ],
                        },
                    },
                ],
            };
        }
    };

    const språkRad = (språk, muntlig, skriftlig) => ({
        columns: [
            {
                margin: [5.1, 5.1, 5.1, 5.1],
                style: {
                    fontSize: "11",
                    lineHeight: "1.2",
                },
                text: "",
                width: "24%",
            },
            {
                layout: {
                    paddingBottom: () => 2,
                    paddingLeft: () => 10,
                    paddingTop: () => 4,
                    vLineColor: () => "#b7b1a9",
                },
                table: {
                    body: [
                        [
                            {
                                border: [1, 0, 0, 0],
                                margin: [0, 0, 0, 0],
                                style: "fontBold",
                                text: språk,
                            },
                        ],
                        [
                            {
                                border: [1, 0, 0, 0],
                                margin: [0, 0, 0, 0],
                                style: "fontNormal",
                                text: skriftlig,
                            },
                        ],
                        [
                            {
                                border: [1, 0, 0, 0],
                                margin: [0, 0, 0, 0],
                                style: "fontNormal",
                                text: muntlig,
                            },
                        ],
                    ],
                },
            },
        ],
        unbreakable: true,
    });

    const førerkortRad = (gyldigFra, gyldigTil, nåværende, beskrivelse, datoformat = "DD MM YY") => ({
        columns: [
            {
                margin: [0, 5.1, 5.1, 5.1],
                style: {
                    fontSize: "11",
                    lineHeight: "1.2",
                },
                text: tidsperiode(gyldigFra, gyldigTil, nåværende, datoformat),
                width: "24%",
            },
            {
                layout: {
                    paddingBottom: () => 5.1,
                    paddingLeft: () => 10,
                    paddingTop: () => 5.1,
                    vLineColor: () => "#b7b1a9",
                },
                table: {
                    body: [
                        [
                            {
                                border: [1, 0, 0, 0],
                                margin: [0, 0, 0, 0],
                                style: "fontNormal",
                                text: beskrivelse,
                            },
                        ],
                    ],
                },
            },
        ],
        unbreakable: true,
    });

    const hovedinnholdRad = (fraDato, tilDato, nåværende, sted, tittel, beskrivelse, datoformat = "MMMM YYYY") => ({
        columns: [
            {
                style: ["tidsperiode", "fontNormal"],
                text: tidsperiode(fraDato, tilDato, nåværende, datoformat),
                width: "24%",
            },
            {
                layout: {
                    paddingBottom: () => 0.1,
                    paddingLeft: () => 10,
                    paddingTop: () => 0.1,
                    vLineColor: () => "#b7b1a9",
                },
                table: {
                    body: [
                        [
                            {
                                border: [1, 0, 0, 0],
                                margin: sted === "" ? [0, 0, 0, 0] : [0, 4, 0, 0],
                                style: "fontNormal",
                                text: sted,
                            },
                        ],
                        [
                            {
                                border: [1, 0, 0, 0],
                                margin: [0, sted === "" ? 4 : 0, 0, 0],
                                style: "fontBold",
                                text: tittel,
                            },
                        ],
                        [
                            {
                                border: [1, 0, 0, 0],
                                margin: [0, 0, 0, 4],
                                style: "fontNormal",
                                text: beskrivelse,
                            },
                        ],
                    ],
                },
            },
        ],
        unbreakable: beskrivelse.length < 1000,
    });

    const utdanningHeader = (førsteUtdanning) => ({
        stack: [
            { margin: [0, 32, 0, 16], style: "subheader", text: "Utdanning" },
            hovedinnholdRad(
                førsteUtdanning.startDate,
                førsteUtdanning.endDate,
                førsteUtdanning.ongoing,
                førsteUtdanning.institution,
                førsteUtdanning.field || UtdanningsnivåEnum[førsteUtdanning.nuskode],
                fjernHtmlTags(førsteUtdanning.description) || " ",
                "MMMM YYYY",
            ),
        ],
        unbreakable: førsteUtdanning.description && førsteUtdanning.description.length < 1000,
    });

    const utdanningListe = (utdanningInnhold) => {
        if (utdanningInnhold && utdanningInnhold.length > 0) {
            return [
                utdanningHeader(utdanningInnhold[0]),
                utdanningInnhold
                    .slice(1)
                    .map((u) =>
                        hovedinnholdRad(
                            u.startDate,
                            u.endDate,
                            u.ongoing,
                            u.institution,
                            u.field || UtdanningsnivåEnum[u.nuskode],
                            fjernHtmlTags(u.description, { allowedTags: [] }) || " ",
                            "MMMM YYYY",
                        ),
                    ),
            ];
        }
    };

    const arbeidserfaringHeader = (førsteArbeidserfaring) => ({
        stack: [
            { margin: [0, 32, 0, 16], style: "subheader", text: "Arbeidsforhold" },
            hovedinnholdRad(
                førsteArbeidserfaring.fromDate,
                førsteArbeidserfaring.toDate,
                førsteArbeidserfaring.ongoing,
                førsteArbeidserfaring.employer && førsteArbeidserfaring.location
                    ? `${førsteArbeidserfaring.employer} | ${førsteArbeidserfaring.location}`
                    : førsteArbeidserfaring.employer,
                førsteArbeidserfaring.alternativeJobTitle
                    ? førsteArbeidserfaring.alternativeJobTitle
                    : førsteArbeidserfaring.jobTitle,
                fjernHtmlTags(førsteArbeidserfaring.description, { allowedTags: [] }) || " ",
            ),
        ],
        unbreakable: førsteArbeidserfaring.description && førsteArbeidserfaring.description.length < 1000,
    });

    const arbeidserfaringListe = (arbeidserfaringInnhold) => {
        if (arbeidserfaringInnhold && arbeidserfaringInnhold.length > 0) {
            return [
                arbeidserfaringHeader(arbeidserfaringInnhold[0]),
                arbeidserfaringInnhold
                    .slice(1)
                    .map((a) =>
                        hovedinnholdRad(
                            a.fromDate,
                            a.toDate,
                            a.ongoing,
                            a.employer && a.location ? `${a.employer} | ${a.location}` : a.employer,
                            a.alternativeJobTitle ? a.alternativeJobTitle : a.jobTitle,
                            fjernHtmlTags(a.description) || " ",
                        ),
                    ),
            ];
        }
    };

    const annenerfaringHeader = (førsteAnnenerfaring) => ({
        stack: [
            { margin: [0, 32, 0, 16], style: "subheader", text: "Annen erfaring" },
            hovedinnholdRad(
                førsteAnnenerfaring.fromDate,
                førsteAnnenerfaring.toDate,
                førsteAnnenerfaring.ongoing,
                "",
                førsteAnnenerfaring.role,
                fjernHtmlTags(førsteAnnenerfaring.description) || " ",
            ),
        ],
        unbreakable: førsteAnnenerfaring.description && førsteAnnenerfaring.description.length < 1000,
    });

    const annenerfaringListe = (annenerfaringInnhold) => {
        if (annenerfaringInnhold && annenerfaringInnhold.length > 0) {
            return [
                annenerfaringHeader(annenerfaringInnhold[0]),
                annenerfaringInnhold
                    .slice(1)
                    .map((a) =>
                        hovedinnholdRad(
                            a.fromDate,
                            a.toDate,
                            a.ongoing,
                            "",
                            a.role,
                            fjernHtmlTags(a.description) || " ",
                        ),
                    ),
            ];
        }
    };

    const førerkortListe = (førerkortInnhold) => {
        if (førerkortInnhold && førerkortInnhold.length > 0) {
            return [
                { margin: [0, 32, 0, 16], style: "subheader", text: "Førerkort" },
                førerkortInnhold.map((f) =>
                    førerkortRad(f.acquiredDate, f.expiryDate, "", `Førerkort klasse ${f.type}`),
                ),
            ];
        }
    };

    const kursHeader = (førsteKurs) => ({
        stack: [
            { margin: [0, 32, 0, 16], style: "subheader", text: "Kurs" },
            hovedinnholdRad(
                førsteKurs.date,
                "",
                "",
                førsteKurs.issuer,
                førsteKurs.title || " ",
                calculateVarighetOgEnhet(førsteKurs.duration, førsteKurs.durationUnit) || " ",
            ),
        ],
        unbreakable: true,
    });

    const kursListe = (kursInnhold) => {
        if (kursInnhold && kursInnhold.length > 0) {
            return [
                kursHeader(kursInnhold[0]),
                kursInnhold
                    .slice(1)
                    .map((k) =>
                        hovedinnholdRad(
                            k.date,
                            "",
                            "",
                            k.issuer,
                            k.title || " ",
                            calculateVarighetOgEnhet(k.duration, k.durationUnit) || " ",
                        ),
                    ),
            ];
        }
    };

    const godkjenningerHeader = (førsteGodkjenning) => ({
        stack: [
            {
                columns: [
                    {
                        margin: [0, 32, 0, 16],
                        style: "subheader",
                        text: "Offentlige godkjenninger",
                        width: "24%",
                    },
                ],
            },
            hovedinnholdRad(
                førsteGodkjenning.fromDate,
                "",
                "",
                førsteGodkjenning.issuer,
                førsteGodkjenning.title || " ",
                førsteGodkjenning.toDate ? `Utløper: ${formatterFullDato(førsteGodkjenning.toDate)}` : "",
            ),
        ],
        unbreakable: true,
    });

    const sertifikaterHeader = (førsteSertifikat) => ({
        stack: [
            {
                columns: [
                    {
                        margin: [0, 32, 0, 16],
                        style: "subheader",
                        text: "Andre godkjenninger",
                        width: "24%",
                    },
                ],
            },
            hovedinnholdRad(
                førsteSertifikat.fromDate,
                "",
                førsteSertifikat.ongoing,
                førsteSertifikat.issuer,
                førsteSertifikat.alternativeName || førsteSertifikat.certificateName || " ",
                førsteSertifikat.toDate ? `Utløper: ${formatterFullDato(førsteSertifikat.toDate)}` : "",
            ),
        ],
        unbreakable: true,
    });

    const godkjenningerListe = (godkjenningerInnhold) => {
        if (godkjenningerInnhold && godkjenningerInnhold.length > 0) {
            return [
                godkjenningerHeader(godkjenningerInnhold[0]),
                godkjenningerInnhold
                    .slice(1)
                    .map((s) =>
                        hovedinnholdRad(
                            s.fromDate,
                            "",
                            "",
                            s.issuer,
                            s.title || " ",
                            s.toDate ? `Utløper: ${formatterFullDato(s.toDate)}` : "",
                        ),
                    ),
            ];
        }
    };

    const sertifikaterListe = (sertifikaterInnhold) => {
        if (sertifikaterInnhold && sertifikaterInnhold.length > 0) {
            return [
                sertifikaterHeader(sertifikaterInnhold[0]),
                sertifikaterInnhold
                    .slice(1)
                    .map((s) =>
                        hovedinnholdRad(
                            s.fromDate,
                            "",
                            s.ongoing,
                            s.issuer,
                            s.alternativeName || s.certificateName || " ",
                            s.toDate ? `Utløper: ${formatterFullDato(s.toDate)}` : "",
                        ),
                    ),
            ];
        }
    };

    const sprakListe = (sprakInnhold) => {
        if (sprakInnhold && sprakInnhold.length > 0) {
            return [
                { margin: [0, 32, 0, 16], style: "subheader", text: "Språk" },
                sprakInnhold.map((s) => {
                    const muntlig = SpråkEnum[s.oralProficiency];
                    const skriftlig = SpråkEnum[s.writtenProficiency];

                    return språkRad(
                        s.language,
                        muntlig === "Språknivå ikke oppgitt" ? "" : `Muntlig: ${muntlig}`,
                        skriftlig === "Språknivå ikke oppgitt" ? "" : `Skriftlig: ${skriftlig}`,
                    );
                }),
            ];
        }

        return undefined;
    };

    const fagdokumentasjonListe = (fagdokumentasjonInnhold) => {
        if (fagdokumentasjonInnhold && fagdokumentasjonInnhold.length > 0) {
            return {
                columns: [
                    {
                        style: {
                            bold: true,
                            fontSize: "12",
                        },
                        text: "Fagbrev, svennebrev og mesterbrev",
                        width: "24%",
                    },
                    {
                        layout: {
                            paddingBottom: () => 0,
                            paddingLeft: () => 10,
                            paddingTop: () => 0,
                            vLineColor: () => "#b7b1a9",
                        },
                        table: {
                            body: fagdokumentasjonInnhold.map((s, i) => [
                                {
                                    border: [1, 0, 0, 0],
                                    margin: [0, 4, 0, 0],
                                    style: "fontNormal",
                                    text: fagdokumentasjonInnhold[i].title,
                                    width: "70%",
                                },
                            ]),
                        },
                    },
                ],
                margin: [0, 32, 0, 16],
                unbreakable: true,
            };
        }
    };

    const kompetanserListe = (kompetanserVerdi) => {
        if (kompetanserVerdi && kompetanserVerdi.length > 0) {
            return {
                columns: [
                    {
                        style: {
                            bold: true,
                            fontSize: "12",
                        },
                        text: "Kompetanser",
                        width: "24%",
                    },
                    {
                        layout: {
                            paddingBottom: () => 0,
                            paddingLeft: () => 10,
                            paddingTop: () => 0,
                            vLineColor: () => "#b7b1a9",
                        },
                        table: {
                            body: kompetanserVerdi.map((s, i) => [
                                {
                                    border: [1, 0, 0, 0],
                                    margin: [0, 4, 0, 0],
                                    style: "fontNormal",
                                    text: kompetanserVerdi[i].title,
                                    width: "70%",
                                },
                            ]),
                        },
                    },
                ],
                margin: [0, 32, 0, 16],
                unbreakable: true,
            };
        }
    };

    const tidsperiode = (fradato, tildato, naavaerende) => {
        const tildatoAsText = tildato ? formatterDato(tildato) : "";
        const fradatoAsText = fradato ? formatterDato(fradato) : "";
        if (fradatoAsText) {
            if (tildatoAsText) {
                return `${storForbokstav(fradatoAsText)} - \n${tildatoAsText}`;
            }
            return `${storForbokstav(fradatoAsText)}
                        ${naavaerende ? "(Nåværende)" : ""}`;
        }
        return `${storForbokstav(tildatoAsText)}
                ${naavaerende ? "(Nåværende)" : ""}`;
    };

    const calculateVarighetOgEnhet = (varighet, varighetEnhet) => {
        let varighetOgEnhet;
        if (varighet) {
            const enhet = varighetEnhet ? formatterTidsenhet(varighetEnhet, varighet) : "timer";

            if (!enhet) {
                return "";
            }

            varighetOgEnhet = `${varighet} ${enhet.toLocaleLowerCase()}`;
        }
        return varighetOgEnhet;
    };

    const verticalLine = () => ({
        layout: {
            hLineColor: () => "#b7b1a9",
        },
        margin: [0, 20, 0, 10],
        table: {
            body: [
                [
                    {
                        border: [0, 1, 0, 0],
                        text: " ",
                    },
                ],
            ],
            widths: "*",
        },
    });

    const pdfDokument = {
        content: [
            { text: navn, style: "header" },
            personaliaRad("E-post:", personalia.epost),
            personaliaRad("Telefon:", personalia.telefonnummer),
            formattertAdresse(),
            personaliaRad("Fødselsdato:", formatterFullDato(personalia.foedselsdato)),
            verticalLine(),
            sammendragRad(sammendrag),
            utdanningListe(datosorterElementer(utdanning)),
            fagdokumentasjonListe(fagbrev),
            arbeidserfaringListe(datosorterElementer(arbeidserfaring)),
            annenerfaringListe(datosorterElementer(annenErfaring)),
            førerkortListe(foererkort),
            kursListe(kurs),
            godkjenningerListe(offentligeGodkjenninger),
            sertifikaterListe(andreGodkjenninger),
            sprakListe(spraak),
            kompetanserListe(kompetanser),
        ],
        styles: {
            fontBold: {
                bold: true,
                fontSize: "11",
                lineHeight: "1.2",
            },
            fontNormal: {
                fontSize: "11",
                lineHeight: "1.2",
            },
            header: {
                bold: true,
                fontSize: "14",
                margin: [0, 0, 0, 10],
            },
            subheader: {
                bold: true,
                fontSize: "12",
                margin: [0, 4, 8, 4],
            },
            tidsperiode: {
                lineHeight: "1.2",
                margin: [0, 5.1, 5.1, 5.1],
            },
        },
    };

    try {
        pdfMake.createPdf(pdfDokument).download(filnavn);
    } catch (e) {
        console.error(e);
    }
}
