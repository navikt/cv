import { BodyLong, Box, Button, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useRef } from "react";
import { SpråkEnum, UtdanningsnivåEnum } from "@/app/_common/enums/cvEnums";
import { formatterDato, formatterFullDato, formatterTidsenhet } from "@/app/_common/utils/stringUtils";
import { LastNedCv } from "@/app/(minCV)/_components/lastNedCv/LastNedCv";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import parse from "html-react-parser";

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
        <HStack className={`${styles.preview} ${styles.mt16}`}>
            <Box>
                <HStack align="start" gap="4" className={styles.mb9}>
                    <Button ref={ref} variant="primary" onClick={() => setVisHovedinnhold(true)}>
                        Endre CV
                    </Button>
                    <LastNedCv />
                </HStack>

                <BodyLong weight="semibold" className={styles.mb3}>
                    {personalia ? `${personalia.fornavn} ${personalia.etternavn}` : ""}
                </BodyLong>
                <div className={styles.previewPersonalInfoWrapper}>
                    <BodyLong size="small" className={styles.previewPersonalInfo}>
                        <div className={styles.PersonalInfoLabel}>Fødselsdato:</div>
                        <div className={styles.PersonalInfoValue}>{personalia ? personalia.foedselsdato : ""}</div>
                        <div className={styles.PersonalInfoLabel}>Adresse:</div>
                        <div className={styles.PersonalInfoValue}>{personalia ? personalia.adresse : ""}</div>
                        <div className={styles.PersonalInfoLabel}>Tlf:</div>
                        <div className={styles.PersonalInfoValue}>{personalia ? personalia.telefonnummer : ""}</div>
                        <div className={styles.PersonalInfoLabel}>E-post:</div>
                        <div className={styles.PersonalInfoValue}>{personalia ? personalia.epost : ""}</div>
                    </BodyLong>
                </div>

                {cv.sammendrag && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Sammendrag
                        </BodyLong>
                        <div className={styles.previewItem}>
                            <div className={styles.previewItemLeft} />
                            <div className={styles.previewItemRight}>
                                <BodyLong>{parse(cv.sammendrag.replace(/\n/g, "<br>"))}</BodyLong>
                            </div>
                        </div>
                    </div>
                )}

                {cv.utdanning && cv.utdanning.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Utdanning
                        </BodyLong>

                        {cv.utdanning.map((utdanning, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}>
                                        {formatterDato(utdanning.startDate)} - {formatterDato(utdanning.endDate)}
                                    </div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong weight="semibold">{UtdanningsnivåEnum[utdanning.nuskode]}</BodyLong>
                                        <BodyLong>{utdanning.institution}</BodyLong>
                                        <BodyLong>{utdanning.field}</BodyLong>
                                        <BodyLong className={styles.mb3}>
                                            {parse(utdanning.description.replace(/\n/g, "<br>"))}
                                        </BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.fagbrev && cv.fagbrev.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold">Fagbrev, svennebrev og mesterbrev</BodyLong>
                        {cv.fagbrev.map((fagbrev, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}></div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong className={styles.mb3}>{fagbrev.title}</BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.arbeidserfaring && cv.arbeidserfaring.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Arbeidsforhold
                        </BodyLong>
                        {cv.arbeidserfaring.map((erfaring, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}>
                                        {`${formatterDato(erfaring.fromDate)} - ${formatterDato(erfaring.toDate)}`}
                                    </div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong weight="semibold">
                                            {erfaring.jobTitle || erfaring.alternativeJobTitle}
                                        </BodyLong>
                                        <BodyLong>
                                            {erfaring.employer}
                                            {erfaring.employer !== "" && erfaring.location !== "" ? ", " : ""}
                                            {erfaring.location}
                                        </BodyLong>
                                        <BodyLong className={styles.mb3}>
                                            {erfaring.description && parse(erfaring.description.replace(/\n/g, "<br>"))}
                                        </BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.annenErfaring && cv.annenErfaring.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Annen erfaring
                        </BodyLong>
                        {cv.annenErfaring.map((erfaring, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}>
                                        {`${formatterDato(erfaring.fromDate)} - ${formatterDato(erfaring.toDate)}`}
                                    </div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong weight="semibold">{erfaring.role}</BodyLong>
                                        <BodyLong className={styles.mb3}>{erfaring.description}</BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.foererkort && cv.foererkort.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold">Førerkort</BodyLong>
                        {cv.foererkort.map((foererkort, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft} />
                                    <div className={styles.previewItemRight}>
                                        <BodyLong weight="semibold" className={styles.mb3}>
                                            {foererkort.type}
                                        </BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.kurs && cv.kurs.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Kurs
                        </BodyLong>
                        {cv.kurs.map((kurs, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}>{formatterFullDato(kurs.date)}</div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong weight="semibold">{kurs.title}</BodyLong>
                                        <BodyLong>{kurs.issuer}</BodyLong>
                                        <BodyLong
                                            className={styles.mb3}
                                        >{`${kurs.duration} ${formatterTidsenhet(kurs.durationUnit, kurs.duration)}`}</BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.offentligeGodkjenninger && cv.offentligeGodkjenninger.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Offentlige godkjenninger
                        </BodyLong>
                        {cv.offentligeGodkjenninger.map((godkjenning, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}>
                                        {`${formatterFullDato(godkjenning.fromDate)} - ${formatterFullDato(godkjenning.toDate)}`}
                                    </div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong weight="semibold">{godkjenning.title}</BodyLong>
                                        <BodyLong className={styles.mb3}>{godkjenning.issuer}</BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.andreGodkjenninger && cv.andreGodkjenninger.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Andre godkjenninger
                        </BodyLong>
                        {cv.andreGodkjenninger.map((godkjenning, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}>
                                        {`${formatterFullDato(godkjenning.fromDate)} - ${formatterFullDato(godkjenning.toDate)}`}
                                    </div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong weight="semibold">{godkjenning.certificateName}</BodyLong>
                                        <BodyLong className={styles.mb3}>{godkjenning.issuer}</BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.spraak && cv.spraak.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Språk
                        </BodyLong>
                        {cv.spraak.map((spraak, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}></div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong weight="semibold">{spraak.language}</BodyLong>
                                        <BodyLong>Muntlig: {SpråkEnum[spraak.oralProficiency]}</BodyLong>
                                        <BodyLong className={styles.mb3}>
                                            Skriftlig: {SpråkEnum[spraak.writtenProficiency]}
                                        </BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.kompetanser && cv.kompetanser.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Kompetanser
                        </BodyLong>
                        {cv.kompetanser.map((kompetanse, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}></div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong className={styles.mb3}>{kompetanse.title}</BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Box>
        </HStack>
    );
}
