import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useRef } from "react";
import { SpråkEnum, UtdanningsnivåEnum } from "@/app/_common/enums/cvEnums";
import {
    formatterDato,
    formatterFullDato,
    formatterFullDatoMedFallback,
    formatterTidsenhet,
} from "@/app/_common/utils/stringUtils";
import { LastNedCv } from "@/app/(minCV)/_components/lastNedCv/LastNedCv";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import parse from "html-react-parser";
import { datosorterElementer } from "@/app/_common/utils/dateUtils";

export default function Forhandsvisning({ setVisHovedinnhold }) {
    const { person } = usePerson();
    const { personalia } = person || {};
    const { cv } = useCv();

    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current) {
            ref.current.focus();
        }
    }, [ref]);

    return (
        <HStack className={`${styles.preview} ${styles.mt16} ${styles.wrapText}`}>
            <Box>
                <HStack align="start" gap="4" className={styles.mb9}>
                    <Button ref={ref} variant="primary" onClick={() => setVisHovedinnhold(true)}>
                        Endre CV
                    </Button>
                    <LastNedCv />
                </HStack>

                <Heading level="2" size="xsmall" className={styles.mb3}>
                    {personalia ? `${personalia.fornavn} ${personalia.etternavn}` : ""}
                </Heading>

                <dl aria-label="Personalia" className={styles.previewPersonalInfoWrapper}>
                    <div className={styles.previewPersonalInfo}>
                        <dt className={styles.PersonalInfoLabel}>
                            <BodyLong size="small">Fødselsdato:</BodyLong>
                        </dt>
                        <dd className={styles.PersonalInfoValue}>
                            <BodyLong size="small">
                                {personalia ? formatterFullDatoMedFallback(personalia.foedselsdato, "") : ""}
                            </BodyLong>
                        </dd>
                    </div>
                    <div className={styles.previewPersonalInfo}>
                        <dt className={styles.PersonalInfoLabel}>
                            <BodyLong size="small">Adresse:</BodyLong>
                        </dt>
                        <dd className={styles.PersonalInfoValue}>
                            <BodyLong size="small">{personalia ? personalia.adresse : ""}</BodyLong>
                        </dd>
                    </div>
                    <div className={styles.previewPersonalInfo}>
                        <dt className={styles.PersonalInfoLabel}>
                            <BodyLong size="small">Tlf:</BodyLong>
                        </dt>
                        <dd className={styles.PersonalInfoValue}>
                            <BodyLong size="small">{personalia ? personalia.telefonnummer : ""}</BodyLong>
                        </dd>
                    </div>
                    <div className={styles.previewPersonalInfo}>
                        <dt className={styles.PersonalInfoLabel}>
                            <BodyLong size="small">E-post:</BodyLong>
                        </dt>
                        <dd className={styles.PersonalInfoValue}>
                            <BodyLong size="small">{personalia ? personalia.epost : ""}</BodyLong>
                        </dd>
                    </div>
                </dl>

                {cv.sammendrag && (
                    <section aria-labelledby="heading-preview-sammendrag" className={styles.mb6}>
                        <Heading id="heading-preview-sammendrag" level="2" size="xsmall" className={styles.mb3}>
                            Sammendrag
                        </Heading>
                        <div className={styles.previewItem}>
                            <div className={styles.previewItemLeft} />
                            <div className={styles.previewItemRight}>
                                <BodyLong>{parse(cv.sammendrag.replace(/\n/g, "<br>"))}</BodyLong>
                            </div>
                        </div>
                    </section>
                )}

                {cv.utdanning && cv.utdanning.length !== 0 && (
                    <section aria-labelledby="heading-preview-utdanning" className={styles.mb6}>
                        <Heading id="heading-preview-utdannding" level="2" size="xsmall" className={styles.mb3}>
                            Utdanning
                        </Heading>

                        <dl aria-label="Utdanninger">
                            {datosorterElementer(cv.utdanning, "startDate", "endDate").map((utdanning, index) => (
                                <div key={index} className={styles.previewItem}>
                                    <dt className={styles.previewItemLeft}>
                                        {formatterDato(utdanning.startDate)} - {formatterDato(utdanning.endDate)}
                                    </dt>

                                    <dd className={styles.previewItemRight}>
                                        <Heading level="3" size="xsmall">
                                            {UtdanningsnivåEnum[utdanning.nuskode]}
                                        </Heading>

                                        {utdanning.institution && <BodyLong>{utdanning.institution}</BodyLong>}
                                        {utdanning.field && <BodyLong>{utdanning.field}</BodyLong>}
                                        {utdanning.description && (
                                            <BodyLong className={styles.mb3}>
                                                {parse(utdanning.description.replace(/\n/g, "<br>"))}
                                            </BodyLong>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.fagbrev && cv.fagbrev.length !== 0 && (
                    <section aria-labelledby="heading-preview-fagbrev" className={styles.mb6}>
                        <Heading id="heading-preview-fagbrev" level="2" size="xsmall">
                            Fagbrev, svennebrev og mesterbrev
                        </Heading>
                        {cv.fagbrev.map((fagbrev, index) => (
                            <div key={index} className={styles.previewItem}>
                                <div className={styles.previewItemLeft} />
                                <div className={styles.previewItemRight}>
                                    <BodyLong className={styles.mb3}>{fagbrev.title}</BodyLong>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {cv.arbeidserfaring && cv.arbeidserfaring.length !== 0 && (
                    <section aria-labelledby="heading-preview-arbeidsforhold" className={styles.mb6}>
                        <Heading id="heading-preview-arbeidsforhold" level="2" size="xsmall" className={styles.mb3}>
                            Arbeidsforhold
                        </Heading>
                        <dl aria-label="Arbeidsforhold">
                            {datosorterElementer(cv.arbeidserfaring).map((erfaring, index) => (
                                <div key={index} className={styles.previewItem}>
                                    <dt className={styles.previewItemLeft}>
                                        {`${formatterDato(erfaring.fromDate)} - ${formatterDato(erfaring.toDate)}`}
                                    </dt>

                                    <dd className={styles.previewItemRight}>
                                        <Heading level="3" size="xsmall">
                                            {`${erfaring.jobTitle}${erfaring.alternativeJobTitle ? ` (${erfaring.alternativeJobTitle})` : ""}`}
                                        </Heading>
                                        <BodyLong>
                                            {erfaring.employer}
                                            {erfaring.employer !== "" && erfaring.location !== "" ? ", " : ""}
                                            {erfaring.location}
                                        </BodyLong>
                                        {erfaring.description && (
                                            <BodyLong className={styles.mb3}>
                                                {parse(erfaring.description.replace(/\n/g, "<br>"))}
                                            </BodyLong>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.annenErfaring && cv.annenErfaring.length !== 0 && (
                    <section aria-labelledby="heading-preview-annen-erfaring" className={styles.mb6}>
                        <Heading id="heading-preview-annen-erfaring" level="2" size="xsmall" className={styles.mb3}>
                            Annen erfaring
                        </Heading>
                        <dl aria-label="Andre erfaringer">
                            {datosorterElementer(cv.annenErfaring).map((erfaring, index) => (
                                <div key={index} className={styles.previewItem}>
                                    <dt className={styles.previewItemLeft}>
                                        {`${formatterDato(erfaring.fromDate)} - ${formatterDato(erfaring.toDate)}`}
                                    </dt>

                                    <dd className={styles.previewItemRight}>
                                        <Heading level="3" size="xsmall">
                                            {erfaring.role}
                                        </Heading>

                                        <BodyLong className={styles.mb3}>{erfaring.description}</BodyLong>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.foererkort && cv.foererkort.length !== 0 && (
                    <section aria-labelledby="heading-preview-forerkort" className={styles.mb6}>
                        <Heading id="heading-preview-forerkort" level="2" size="xsmall">
                            Førerkort
                        </Heading>
                        {cv.foererkort.map((foererkort, index) => (
                            <div key={index} className={styles.previewItem}>
                                <div className={styles.previewItemLeft}>
                                    {foererkort.acquiredDate &&
                                        `${formatterDato(foererkort.acquiredDate)} - ${formatterDato(foererkort.expiryDate)}`}
                                </div>
                                <div className={styles.previewItemRight}>
                                    <BodyLong weight="semibold" className={styles.mb3}>
                                        {foererkort.type}
                                    </BodyLong>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {cv.kurs && cv.kurs.length !== 0 && (
                    <section aria-labelledby="heading-preview-kurs" className={styles.mb6}>
                        <Heading id="heading-preview-kurs" level="2" size="xsmall" className={styles.mb3}>
                            Kurs
                        </Heading>
                        <dl aria-label="Kurs">
                            {cv.kurs.map((kurs, index) => (
                                <div key={index} className={styles.previewItem}>
                                    <dt className={styles.previewItemLeft}>{formatterFullDato(kurs.date) || ""}</dt>

                                    <dd className={styles.previewItemRight}>
                                        <Heading level="3" size="xsmall">
                                            {kurs.title}
                                        </Heading>

                                        <BodyLong>{kurs.issuer}</BodyLong>
                                        {kurs.durationUnit && kurs.duration && (
                                            <BodyLong className={styles.mb3}>
                                                {`${kurs.duration} ${formatterTidsenhet(kurs.durationUnit, kurs.duration)}`}
                                            </BodyLong>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.offentligeGodkjenninger && cv.offentligeGodkjenninger.length !== 0 && (
                    <section aria-labelledby="heading-preview-offentlige-godkjenninger" className={styles.mb6}>
                        <Heading
                            id="heading-preview-offentlige-godkjenninger"
                            level="2"
                            size="xsmall"
                            className={styles.mb3}
                        >
                            Offentlige godkjenninger
                        </Heading>
                        <dl aria-label="Offentlige godkjenninger">
                            {cv.offentligeGodkjenninger.map((godkjenning, index) => (
                                <div key={index} className={styles.previewItem}>
                                    <dt className={styles.previewItemLeft}>
                                        {`${formatterFullDatoMedFallback(godkjenning.fromDate)}${godkjenning.toDate ? ` - ${formatterFullDatoMedFallback(godkjenning.toDate)}` : ""}`}
                                    </dt>

                                    <dd className={styles.previewItemRight}>
                                        <Heading level="3" size="xsmall">
                                            {godkjenning.title}
                                        </Heading>

                                        <BodyLong className={styles.mb3}>{godkjenning.issuer}</BodyLong>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.andreGodkjenninger && cv.andreGodkjenninger.length !== 0 && (
                    <section aria-labelledby="heading-preview-andre-godkjenninger" className={styles.mb6}>
                        <Heading
                            id="heading-preview-andre-godkjenninger"
                            level="2"
                            size="xsmall"
                            className={styles.mb3}
                        >
                            Andre godkjenninger
                        </Heading>
                        <dl aria-label="Andre godkjenninger">
                            {cv.andreGodkjenninger.map((godkjenning, index) => (
                                <div key={index} className={styles.previewItem}>
                                    <dt className={styles.previewItemLeft}>
                                        {`${formatterFullDatoMedFallback(godkjenning.fromDate)}${godkjenning.toDate ? ` - ${formatterFullDatoMedFallback(godkjenning.toDate)}` : ""}`}
                                    </dt>

                                    <dd className={styles.previewItemRight}>
                                        <Heading level="3" size="xsmall">
                                            {godkjenning.certificateName}
                                        </Heading>

                                        <BodyLong className={styles.mb3}>{godkjenning.issuer}</BodyLong>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.spraak && cv.spraak.length !== 0 && (
                    <section aria-labelledby="heading-preview-sprak" className={styles.mb6}>
                        <Heading id="heading-preview-sprak" level="2" size="xsmall" className={styles.mb3}>
                            Språk
                        </Heading>
                        <dl aria-label="Språk">
                            {cv.spraak.map((spraak, index) => (
                                <div key={index} className={styles.previewItem}>
                                    <div className={styles.previewItemLeft} />

                                    <div className={styles.previewItemRight}>
                                        <dt>
                                            <Heading level="3" size="xsmall">
                                                {spraak.language}
                                            </Heading>
                                        </dt>
                                        <dd>
                                            <BodyLong>Muntlig: {SpråkEnum[spraak.oralProficiency]}</BodyLong>
                                            <BodyLong className={styles.mb3}>
                                                Skriftlig: {SpråkEnum[spraak.writtenProficiency]}
                                            </BodyLong>
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.kompetanser && cv.kompetanser.length !== 0 && (
                    <section aria-labelledby="heading-preview-kompetanser" className={styles.mb6}>
                        <Heading id="heading-preview-kompetanser" level="2" size="xsmall" className={styles.mb3}>
                            Kompetanser
                        </Heading>
                        <ul aria-label="Kompetanser" className={styles.noMarginList}>
                            {cv.kompetanser.map((kompetanse, index) => (
                                <div key={index} className={styles.previewItem}>
                                    <div className={styles.previewItemLeft} />
                                    <div className={styles.previewItemRight}>
                                        <li>
                                            <BodyLong className={styles.mb3}>{kompetanse.title}</BodyLong>
                                        </li>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </section>
                )}
            </Box>
        </HStack>
    );
}
