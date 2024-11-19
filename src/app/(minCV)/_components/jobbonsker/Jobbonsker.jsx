import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import { useId } from "react";
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
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";

function JobbonskerIcon() {
    return (
        <svg
            aria-hidden="true"
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
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.JOBBØNSKER);
    const modalProps = useCvModal(jobbønsker, oppdateringprops);
    const { modalÅpen, toggleModal, laster } = modalProps;
    const { triggerOppdatering } = oppdateringprops;
    const headingId = useId();

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
        triggerOppdatering(tommeJobbønsker);
    };

    const jobbønskerErTomt = () =>
        !jobbønsker || Object.keys(jobbønsker).length === 0 || jobbønsker?.locations?.length === 0;

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.JOBBØNSKER}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<JobbonskerIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <JobbonskerIcon />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
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
                            <Button
                                aria-label="Legg til jobbønsker"
                                icon={<PlusIcon aria-hidden />}
                                variant="primary"
                                onClick={() => toggleModal(true)}
                            >
                                Legg til
                            </Button>
                        </div>
                    ) : (
                        <>
                            <dl className={styles.borderunder} aria-labelledby={headingId}>
                                <dt>
                                    <BodyLong weight="semibold">Jobber og yrker</BodyLong>
                                </dt>
                                <dd>
                                    <BodyLong spacing>
                                        {formatterListeAvObjekterTilTekst(jobbønsker.occupations, "title")}
                                    </BodyLong>
                                </dd>
                                <dt>
                                    <BodyLong weight="semibold">Områder</BodyLong>
                                </dt>
                                <dd>
                                    <BodyLong spacing>
                                        {formatterListeAvObjekterTilTekst(jobbønsker.locations, "location")}
                                    </BodyLong>
                                </dd>
                                {jobbønsker.workLoadTypes && jobbønsker.workLoadTypes.length > 0 && (
                                    <>
                                        <dt>
                                            <BodyLong weight="semibold">Heltid eller deltid</BodyLong>
                                        </dt>
                                        <dd>
                                            <BodyLong spacing>
                                                {jobbønsker.workLoadTypes.map((e) => OmfangEnum[e]).join(", ")}
                                            </BodyLong>
                                        </dd>
                                    </>
                                )}
                                {jobbønsker.workScheduleTypes && jobbønsker.workScheduleTypes.length > 0 && (
                                    <>
                                        <dt>
                                            <BodyLong weight="semibold">Arbeidstider</BodyLong>
                                        </dt>
                                        <dd>
                                            <BodyLong spacing>
                                                {jobbønsker.workScheduleTypes.map((e) => ArbeidstidEnum[e]).join(", ")}
                                            </BodyLong>
                                        </dd>
                                    </>
                                )}
                                {jobbønsker.occupationTypes && jobbønsker.occupationTypes.length > 0 && (
                                    <>
                                        <dt>
                                            <BodyLong weight="semibold">Ansettelsesform</BodyLong>
                                        </dt>
                                        <dd>
                                            <BodyLong spacing>
                                                {jobbønsker.occupationTypes
                                                    .map((e) => AnsettelsesformEnum[e])
                                                    .join(", ")}
                                            </BodyLong>
                                        </dd>
                                    </>
                                )}
                                <dt>
                                    <BodyLong weight="semibold">Oppstart</BodyLong>
                                </dt>
                                <dd>
                                    <BodyLong className={styles.mb16}>
                                        {StarttidspunktEnum[jobbønsker.startOption]}
                                    </BodyLong>
                                </dd>
                            </dl>

                            <HStack justify="space-between">
                                <Button
                                    aria-label="Endre jobbønsker"
                                    icon={<PencilIcon aria-hidden />}
                                    variant="primary"
                                    onClick={() => toggleModal(true)}
                                >
                                    Endre
                                </Button>
                                <Button
                                    aria-label="Fjern jobbønsker"
                                    icon={<TrashIcon aria-hidden />}
                                    variant="secondary"
                                    onClick={() => slettJobbønsker()}
                                    loading={laster}
                                >
                                    Fjern
                                </Button>
                            </HStack>
                        </>
                    )}
                </Box>
            )}
            {modalÅpen && (
                <JobbonskerModal {...modalProps} lagreElement={triggerOppdatering} gjeldendeElement={jobbønsker} />
            )}
        </section>
    );
}
