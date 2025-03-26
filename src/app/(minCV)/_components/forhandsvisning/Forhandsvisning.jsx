import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useRef } from "react";
import {
    AnsettelsesformEnum,
    OmfangEnum,
    SpråkEnum,
    StarttidspunktEnum,
    UtdanningsnivåEnum,
} from "@/app/_common/enums/cvEnums";
import {
    formatterAdresse,
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
import { EuresKategoriEnum } from "@/app/_common/enums/EuresEnums";

export default function Forhandsvisning({ setVisHovedinnhold, kategorier = undefined }) {
    const { person } = usePerson();
    const { personalia } = person || {};
    const { cv } = useCv();

    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current) {
            ref.current.focus();
        }
    }, [ref]);

    const skalViseKategori = (kategori) => !kategorier || kategorier.includes(kategori);

    return (
        <HStack className={`${styles.preview} ${styles.mt16} ${styles.wrapText}`}>
            <Box>
                {!kategorier ? (
                    <HStack align="start" gap="4" className={styles.mb9}>
                        <Button ref={ref} variant="primary" onClick={() => setVisHovedinnhold(true)}>
                            Endre CV
                        </Button>
                        <LastNedCv />
                    </HStack>
                ) : (
                    <HStack align="start" gap="4" className={styles.mb9}>
                        <Button ref={ref} variant="primary" onClick={() => setVisHovedinnhold(true)}>
                            Tilbake
                        </Button>
                    </HStack>
                )}

                {skalViseKategori(EuresKategoriEnum.PERSONALIA) && (
                    <>
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
                                    <BodyLong size="small">
                                        {personalia
                                            ? formatterAdresse(
                                                  personalia.adresse,
                                                  personalia.postnummer,
                                                  personalia.poststed,
                                              )
                                            : ""}
                                    </BodyLong>
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
                    </>
                )}

                {cv.jobboensker && kategorier && kategorier.includes(EuresKategoriEnum.JOBBØNSKER) && (
                    <section aria-labelledby="heading-preview-jobbønsker" className={styles.previewSection}>
                        <Heading id="heading-preview-jobbønsker" level="2" size="xsmall" className={styles.mb3}>
                            Jobbønsker
                        </Heading>

                        <dl aria-label="Jobbønsker" className={styles.previewBox}>
                            <dt>Jobber og yrker</dt>
                            <dd className={styles.previewBoxRight}>
                                {cv.jobboensker.occupations.map((yrke) => (
                                    <BodyLong key={`${yrke.conceptId}`} className={styles.mb3}>
                                        {yrke.title}
                                    </BodyLong>
                                ))}
                            </dd>

                            <dt>Områder</dt>
                            <dd className={styles.previewBoxRight}>
                                {cv.jobboensker.locations.map((sted) => (
                                    <BodyLong key={`${sted.conceptId}`} className={styles.mb3}>
                                        {sted.location}
                                    </BodyLong>
                                ))}
                            </dd>

                            <dt>Heltid eller deltid</dt>
                            <dd className={styles.previewBoxRight}>
                                {cv.jobboensker.workLoadTypes.map((omfang) => (
                                    <BodyLong key={`${omfang}`} className={styles.mb3}>
                                        {OmfangEnum[omfang]}
                                    </BodyLong>
                                ))}
                            </dd>

                            <dt>Ansettelsesform</dt>
                            <dd className={styles.previewBoxRight}>
                                {cv.jobboensker.occupationTypes.map((ansettelsesform) => (
                                    <BodyLong key={`${ansettelsesform}`} className={styles.mb3}>
                                        {AnsettelsesformEnum[ansettelsesform]}
                                    </BodyLong>
                                ))}
                            </dd>

                            <dt>Oppstart</dt>
                            <dd className={styles.previewBoxRight}>
                                <BodyLong className={styles.mb3}>
                                    {StarttidspunktEnum[cv.jobboensker.startOption]}
                                </BodyLong>
                            </dd>
                        </dl>
                    </section>
                )}

                {cv.sammendrag && skalViseKategori(EuresKategoriEnum.SAMMENDRAG) && (
                    <section aria-labelledby="heading-preview-sammendrag" className={styles.previewSection}>
                        <Heading id="heading-preview-sammendrag" level="2" size="xsmall" className={styles.mb3}>
                            Sammendrag
                        </Heading>
                        <div className={styles.previewBox}>
                            <div />
                            <div className={styles.previewBoxRight}>
                                <div>
                                    <BodyLong>{parse(cv.sammendrag.replace(/\n/g, "<br>"))}</BodyLong>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {cv.utdanning && cv.utdanning.length !== 0 && skalViseKategori(EuresKategoriEnum.UTDANNING) && (
                    <section aria-labelledby="heading-preview-utdanning" className={styles.previewSection}>
                        <Heading id="heading-preview-utdanning" level="2" size="xsmall" className={styles.mb3}>
                            Utdanning
                        </Heading>

                        <dl aria-label="Utdanninger" className={[styles.previewBox]}>
                            {datosorterElementer(cv.utdanning, "startDate", "endDate").map((utdanning) => (
                                <>
                                    <dt>
                                        {formatterDato(utdanning.startDate)} - {formatterDato(utdanning.endDate)}
                                    </dt>

                                    <dd className={styles.previewBoxRight}>
                                        <Heading level="3" size="xsmall">
                                            {UtdanningsnivåEnum[utdanning.nuskode]}
                                        </Heading>

                                        {utdanning.institution && <BodyLong>{utdanning.institution}</BodyLong>}
                                        {utdanning.field && <BodyLong>{utdanning.field}</BodyLong>}
                                        {utdanning.description && (
                                            <BodyLong>{parse(utdanning.description.replace(/\n/g, "<br>"))}</BodyLong>
                                        )}
                                    </dd>
                                </>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.fagbrev && cv.fagbrev.length !== 0 && skalViseKategori(EuresKategoriEnum.FAGBREV) && (
                    <section aria-labelledby="heading-preview-fagbrev" className={styles.previewSection}>
                        <Heading id="heading-preview-fagbrev" level="2" size="xsmall">
                            Fagbrev, svennebrev og mesterbrev
                        </Heading>
                        {cv.fagbrev.map((fagbrev, index) => (
                            <div key={index} className={styles.previewBox}>
                                <div />
                                <div className={styles.previewBoxRight}>
                                    <BodyLong className={styles.mb3}>{fagbrev.title}</BodyLong>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {cv.arbeidserfaring &&
                    cv.arbeidserfaring.length !== 0 &&
                    skalViseKategori(EuresKategoriEnum.ARBEIDSFORHOLD) && (
                        <section aria-labelledby="heading-preview-arbeidsforhold" className={styles.previewSection}>
                            <Heading id="heading-preview-arbeidsforhold" level="2" size="xsmall" className={styles.mb3}>
                                Arbeidsforhold
                            </Heading>
                            <dl aria-label="Arbeidsforhold" className={[styles.previewBox]}>
                                {datosorterElementer(cv.arbeidserfaring).map((erfaring) => (
                                    <>
                                        <dt>{`${formatterDato(erfaring.fromDate)} - ${formatterDato(erfaring.toDate)}`}</dt>

                                        <dd className={styles.previewBoxRight}>
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
                                    </>
                                ))}
                            </dl>
                        </section>
                    )}

                {cv.annenErfaring && cv.annenErfaring.length !== 0 && !kategorier && (
                    <section aria-labelledby="heading-preview-annen-erfaring" className={styles.previewSection}>
                        <Heading id="heading-preview-annen-erfaring" level="2" size="xsmall" className={styles.mb3}>
                            Annen erfaring
                        </Heading>
                        <dl aria-label="Andre erfaringer" className={[styles.previewBox]}>
                            {datosorterElementer(cv.annenErfaring).map((erfaring) => (
                                <>
                                    <dt>{`${formatterDato(erfaring.fromDate)} - ${formatterDato(erfaring.toDate)}`}</dt>

                                    <dd className={styles.previewBoxRight}>
                                        <Heading level="3" size="xsmall">
                                            {erfaring.role}
                                        </Heading>

                                        <BodyLong className={styles.mb3}>{erfaring.description}</BodyLong>
                                    </dd>
                                </>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.foererkort && cv.foererkort.length !== 0 && skalViseKategori(EuresKategoriEnum.FØRERKORT) && (
                    <section aria-labelledby="heading-preview-forerkort" className={styles.previewSection}>
                        <Heading id="heading-preview-forerkort" level="2" size="xsmall">
                            Førerkort
                        </Heading>
                        <div className={[styles.previewBox]}>
                            {cv.foererkort.map((foererkort) => (
                                <>
                                    <div>
                                        {foererkort.acquiredDate &&
                                            `${formatterDato(foererkort.acquiredDate)} - ${formatterDato(foererkort.expiryDate)}`}
                                    </div>
                                    <div className={styles.previewBoxRight}>
                                        <BodyLong weight="semibold" className={styles.mb3}>
                                            {foererkort.type}
                                        </BodyLong>
                                    </div>
                                </>
                            ))}
                        </div>
                    </section>
                )}

                {cv.kurs && cv.kurs.length !== 0 && skalViseKategori(EuresKategoriEnum.KURS) && (
                    <section aria-labelledby="heading-preview-kurs" className={styles.previewSection}>
                        <Heading id="heading-preview-kurs" level="2" size="xsmall" className={styles.mb3}>
                            Kurs
                        </Heading>
                        <dl aria-label="Kurs" className={[styles.previewBox]}>
                            {cv.kurs.map((kurs) => (
                                <>
                                    <dt>{formatterFullDato(kurs.date) || ""}</dt>

                                    <dd className={styles.previewBoxRight}>
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
                                </>
                            ))}
                        </dl>
                    </section>
                )}

                {cv.offentligeGodkjenninger &&
                    cv.offentligeGodkjenninger.length !== 0 &&
                    skalViseKategori(EuresKategoriEnum.OFFENTLIGE_GODKJENNINGER) && (
                        <section
                            aria-labelledby="heading-preview-offentlige-godkjenninger"
                            className={styles.previewSection}
                        >
                            <Heading
                                id="heading-preview-offentlige-godkjenninger"
                                level="2"
                                size="xsmall"
                                className={styles.mb3}
                            >
                                Offentlige godkjenninger
                            </Heading>
                            <dl aria-label="Offentlige godkjenninger" className={[styles.previewBox]}>
                                {cv.offentligeGodkjenninger.map((godkjenning) => (
                                    <>
                                        <dt>
                                            {`${formatterFullDatoMedFallback(godkjenning.fromDate)}${godkjenning.toDate ? ` - ${formatterFullDatoMedFallback(godkjenning.toDate)}` : ""}`}
                                        </dt>

                                        <dd className={styles.previewBoxRight}>
                                            <Heading level="3" size="xsmall">
                                                {godkjenning.title}
                                            </Heading>

                                            <BodyLong className={styles.mb3}>{godkjenning.issuer}</BodyLong>
                                        </dd>
                                    </>
                                ))}
                            </dl>
                        </section>
                    )}

                {cv.andreGodkjenninger &&
                    cv.andreGodkjenninger.length !== 0 &&
                    skalViseKategori(EuresKategoriEnum.ANDRE_GODKJENNINGER) && (
                        <section
                            aria-labelledby="heading-preview-andre-godkjenninger"
                            className={styles.previewSection}
                        >
                            <Heading
                                id="heading-preview-andre-godkjenninger"
                                level="2"
                                size="xsmall"
                                className={styles.mb3}
                            >
                                Andre godkjenninger
                            </Heading>
                            <dl aria-label="Andre godkjenninger" className={[styles.previewBox]}>
                                {cv.andreGodkjenninger.map((godkjenning) => (
                                    <>
                                        <dt>
                                            {`${formatterFullDatoMedFallback(godkjenning.fromDate)}${godkjenning.toDate ? ` - ${formatterFullDatoMedFallback(godkjenning.toDate)}` : ""}`}
                                        </dt>

                                        <dd className={styles.previewBoxRight}>
                                            <Heading level="3" size="xsmall">
                                                {godkjenning.certificateName}
                                            </Heading>

                                            <BodyLong className={styles.mb3}>{godkjenning.issuer}</BodyLong>
                                        </dd>
                                    </>
                                ))}
                            </dl>
                        </section>
                    )}

                {cv.spraak && cv.spraak.length !== 0 && skalViseKategori(EuresKategoriEnum.SPRÅK) && (
                    <section aria-labelledby="heading-preview-sprak" className={styles.previewSection}>
                        <Heading id="heading-preview-sprak" level="2" size="xsmall" className={styles.mb3}>
                            Språk
                        </Heading>
                        <div className={[styles.previewBox]}>
                            {cv.spraak.map((spraak) => (
                                <>
                                    <div />

                                    <dl aria-label="Språk" className={styles.previewBoxRight}>
                                        <dt>
                                            <BodyLong weight="semibold">{spraak.language}</BodyLong>
                                        </dt>
                                        <dd>
                                            <BodyLong>Muntlig: {SpråkEnum[spraak.oralProficiency]}</BodyLong>
                                            <BodyLong className={styles.mb3}>
                                                Skriftlig: {SpråkEnum[spraak.writtenProficiency]}
                                            </BodyLong>
                                        </dd>
                                    </dl>
                                </>
                            ))}
                        </div>
                    </section>
                )}

                {cv.kompetanser && cv.kompetanser.length !== 0 && skalViseKategori(EuresKategoriEnum.KOMPETANSER) && (
                    <section aria-labelledby="heading-preview-kompetanser" className={styles.mb6}>
                        <Heading id="heading-preview-kompetanser" level="2" size="xsmall" className={styles.mb3}>
                            Kompetanser
                        </Heading>
                        <div className={[styles.previewBox]}>
                            <div />
                            <ul aria-label="Kompetanser" className={styles.noMarginList}>
                                {cv.kompetanser.map((kompetanse, index) => (
                                    <li key={index} className={styles.previewBoxRight}>
                                        <BodyLong className={styles.mb3}>{kompetanse.title}</BodyLong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </Box>
        </HStack>
    );
}
