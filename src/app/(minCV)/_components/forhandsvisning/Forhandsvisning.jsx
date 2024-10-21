import { BodyLong, Box, Button, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { DownloadIcon } from "@navikt/aksel-icons";
import { useContext, useEffect, useRef } from "react";
import { PersonContext } from "@/app/_common/contexts/PersonContext";
import { CvContext } from "@/app/_common/contexts/CvContext";
import { SpråkEnum, UtdanningsnivåEnum } from "@/app/_common/enums/cvEnums";
import { formatterDato, formatterFullDato, formatterTidsenhet } from "@/app/_common/utils/stringUtils";
import { LastNedCv } from "@/app/(minCV)/_components/lastNedCv/LastNedCv";

export default function Forhandsvisning({ setVisHovedinnhold }) {
    const { person } = useContext(PersonContext);
    const { cv } = useContext(CvContext);
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
                    {person.data.personalia
                        ? `${person.data.personalia.fornavn} ${person.data.personalia.etternavn}`
                        : ""}
                </BodyLong>
                <div className={styles.previewPersonalInfoWrapper}>
                    <BodyLong size="small" className={styles.previewPersonalInfo}>
                        <div className={styles.PersonalInfoLabel}>Fødselsdato:</div>
                        <div className={styles.PersonalInfoValue}>
                            {person.data.personalia ? person.data.personalia.foedselsdato : ""}
                        </div>
                        <div className={styles.PersonalInfoLabel}>Adresse:</div>
                        <div className={styles.PersonalInfoValue}>
                            {person.data.personalia ? person.data.personalia.adresse : ""}
                        </div>
                        <div className={styles.PersonalInfoLabel}>Tlf:</div>
                        <div className={styles.PersonalInfoValue}>
                            {person.data.personalia ? person.data.personalia.telefonnummer : ""}
                        </div>
                        <div className={styles.PersonalInfoLabel}>E-post:</div>
                        <div className={styles.PersonalInfoValue}>
                            {person.data.personalia ? person.data.personalia.epost : ""}
                        </div>
                    </BodyLong>
                </div>

                {cv.data.sammendrag && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Sammendrag
                        </BodyLong>
                        <div className={styles.previewItem}>
                            <div className={styles.previewItemLeft} />
                            <div className={styles.previewItemRight}>
                                <BodyLong>{cv.data.sammendrag}</BodyLong>
                            </div>
                        </div>
                    </div>
                )}

                {cv.data.utdanning && cv.data.utdanning.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Utdanning
                        </BodyLong>

                        {cv.data.utdanning.map((utdanning, index) => (
                            <div key={index}>
                                <div className={styles.previewItem}>
                                    <div className={styles.previewItemLeft}>
                                        {formatterDato(utdanning.startDate)} - {formatterDato(utdanning.endDate)}
                                    </div>
                                    <div className={styles.previewItemRight}>
                                        <BodyLong weight="semibold">{UtdanningsnivåEnum[utdanning.nuskode]}</BodyLong>
                                        <BodyLong>{utdanning.institution}</BodyLong>
                                        <BodyLong>{utdanning.field}</BodyLong>
                                        <BodyLong className={styles.mb3}>{utdanning.description}</BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.data.fagbrev && cv.data.fagbrev.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold">Fagbrev, svennebrev og mesterbrev</BodyLong>
                        {cv.data.fagbrev.map((fagbrev, index) => (
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

                {cv.data.arbeidserfaring && cv.data.arbeidserfaring.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Arbeidsforhold
                        </BodyLong>
                        {cv.data.arbeidserfaring.map((erfaring, index) => (
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
                                        <BodyLong className={styles.mb3}>{erfaring.description}</BodyLong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cv.data.annenErfaring && cv.data.annenErfaring.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Annen erfaring
                        </BodyLong>
                        {cv.data.annenErfaring.map((erfaring, index) => (
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

                {cv.data.foererkort && cv.data.foererkort.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold">Førerkort</BodyLong>
                        {cv.data.foererkort.map((foererkort, index) => (
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

                {cv.data.kurs && cv.data.kurs.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Kurs
                        </BodyLong>
                        {cv.data.kurs.map((kurs, index) => (
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

                {cv.data.offentligeGodkjenninger && cv.data.offentligeGodkjenninger.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Offentlige godkjenninger
                        </BodyLong>
                        {cv.data.offentligeGodkjenninger.map((godkjenning, index) => (
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

                {cv.data.andreGodkjenninger && cv.data.andreGodkjenninger.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Andre godkjenninger
                        </BodyLong>
                        {cv.data.andreGodkjenninger.map((godkjenning, index) => (
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

                {cv.data.spraak && cv.data.spraak.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Språk
                        </BodyLong>
                        {cv.data.spraak.map((spraak, index) => (
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

                {cv.data.kompetanser && cv.data.kompetanser.length !== 0 && (
                    <div className={styles.mb6}>
                        <BodyLong weight="semibold" className={styles.mb3}>
                            Kompetanser
                        </BodyLong>
                        {cv.data.kompetanser.map((kompetanse, index) => (
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
