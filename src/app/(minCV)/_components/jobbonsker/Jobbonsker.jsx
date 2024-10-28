import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import {
    AnsettelsesformEnum,
    ArbeidstidEnum,
    CvSeksjonEnum,
    OmfangEnum,
    SeksjonsIdEnum,
    StarttidspunktEnum,
} from "@/app/_common/enums/cvEnums";
import { formatterListeAvObjekterTilTekst } from "@/app/_common/utils/stringUtils";
import { JobbonskerModal } from "@/app/(minCV)/_components/jobbonsker/JobbonskerModal";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { useOppdaterCvSeksjon } from "@/app/_common/hooks/swr/useOppdaterCvSeksjon";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";

function JobbonskerIcon() {
    return (
        <svg
            style={{ marginTop: "-4.5rem", marginBottom: "4rem" }}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="64" height="64" rx="32" fill="#7CDAF8" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.9991 22.6257C33.8646 20.9692 35.7005 20.167 37.4991 20.167C39.5245 20.167 41.2639 21.1842 42.7062 22.6266C45.8695 25.7899 45.6481 31.0989 41.3729 35.3741L32.7071 44.0399L31.9991 43.3337L31.2919 44.0407L22.6253 35.3741C18.3501 31.0989 18.1287 25.7899 21.292 22.6266C22.7343 21.1842 24.4737 20.167 26.4991 20.167C28.2977 20.167 30.1336 20.9692 31.9991 22.6257ZM31.9991 43.3337L31.2919 44.0407C31.4795 44.2282 31.7339 44.3337 31.9991 44.3337C32.2643 44.3337 32.5195 44.2275 32.7071 44.0399L31.9991 43.3337ZM31.9991 41.9194L39.9587 33.9599C43.6835 30.2351 43.462 26.2108 41.292 24.0408C40.0677 22.8164 38.807 22.167 37.4991 22.167C36.1912 22.167 34.5972 22.8164 32.7062 24.7074C32.5187 24.895 32.2643 25.0003 31.9991 25.0003C31.7339 25.0003 31.4795 24.895 31.292 24.7074C29.401 22.8164 27.807 22.167 26.4991 22.167C25.1912 22.167 23.9306 22.8164 22.7062 24.0408C20.5362 26.2108 20.3147 30.2351 24.0395 33.9599L31.9991 41.9194Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Jobbonsker() {
    const { jobbønsker, cvLaster } = useCv();
    const { oppdateringOk, laster, feilet, oppdaterMedData, setVisFeilmelding } = useOppdaterCvSeksjon(
        CvSeksjonEnum.JOBBØNSKER,
    );
    const { modalÅpen, toggleModal } = useCvModal(
        jobbønsker,
        oppdaterMedData,
        oppdateringOk,
        laster,
        feilet,
        setVisFeilmelding,
    );

    const slettJobbønsker = async () => {
        const tommeJobbønsker = {
            active: true,
            startOption: null,
            occupations: [],
            occupationDrafts: [],
            locations: [],
            occupationTypes: [],
            workLoadTypes: [],
            workScheduleTypes: [],
        };
        oppdaterMedData(tommeJobbønsker);
    };

    const jobbønskerErTomt = () =>
        !jobbønsker || Object.keys(jobbønsker).length === 0 || jobbønsker?.locations?.length === 0;

    return (
        <div data-section id={SeksjonsIdEnum.JOBBØNSKER}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<JobbonskerIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <JobbonskerIcon />
                    </HStack>
                    <Heading level="2" size="large" align="start" spacing>
                        Jobbønsker
                    </Heading>

                    {jobbønskerErTomt() ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen jobbønsker i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                Når du skal legge til jobbønsker velger du hvilke yrker du er interessert i å jobbe som
                            </BodyLong>
                            <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                                Legg til
                            </Button>
                        </div>
                    ) : (
                        <>
                            <BodyLong weight="semibold">Jobber og yrker</BodyLong>
                            <BodyLong spacing>
                                {formatterListeAvObjekterTilTekst(jobbønsker.occupations, "title")}
                            </BodyLong>
                            <div className={styles.divider}></div>

                            <BodyLong weight="semibold">Områder</BodyLong>
                            <BodyLong spacing>
                                {formatterListeAvObjekterTilTekst(jobbønsker.locations, "location")}
                            </BodyLong>
                            <div className={styles.divider}></div>

                            <BodyLong weight="semibold">Heltid eller deltid</BodyLong>
                            <BodyLong spacing>{jobbønsker.workLoadTypes.map((e) => OmfangEnum[e]).join(", ")}</BodyLong>
                            <div className={styles.divider}></div>

                            <BodyLong weight="semibold">Arbeidstider</BodyLong>
                            <BodyLong spacing>
                                {jobbønsker.workScheduleTypes.map((e) => ArbeidstidEnum[e]).join(", ")}
                            </BodyLong>
                            <div className={styles.divider}></div>

                            <BodyLong weight="semibold">Ansettelsesform</BodyLong>
                            <BodyLong spacing>
                                {jobbønsker.occupationTypes.map((e) => AnsettelsesformEnum[e]).join(", ")}
                            </BodyLong>
                            <div className={styles.divider}></div>

                            <BodyLong weight="semibold">Oppstart</BodyLong>
                            <BodyLong className={styles.mb16}>{StarttidspunktEnum[jobbønsker.startOption]}</BodyLong>

                            <HStack justify="space-between">
                                <Button
                                    icon={<PencilIcon aria-hidden />}
                                    variant="primary"
                                    onClick={() => toggleModal(true)}
                                >
                                    Endre
                                </Button>
                                <Button
                                    icon={<TrashIcon aria-hidden />}
                                    variant="secondary"
                                    onClick={() => slettJobbønsker()}
                                >
                                    Fjern
                                </Button>
                            </HStack>
                        </>
                    )}
                </Box>
            )}
            {modalÅpen && (
                <JobbonskerModal
                    toggleModal={toggleModal}
                    modalÅpen={modalÅpen}
                    jobbønsker={jobbønsker}
                    lagreJobbønsker={oppdaterMedData}
                    laster={laster}
                    feilet={feilet}
                />
            )}
        </div>
    );
}
