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
import { useBekreftModal } from "@/app/_common/hooks/useBekreftSlettModal";
import { BekreftSlettModal } from "@/app/_common/components/BekreftSlettModal";

export default function Jobbonsker() {
    const { jobbønsker, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.JOBBØNSKER);
    const modalProps = useCvModal(jobbønsker, oppdateringprops);
    const { modalÅpen, toggleModal, laster } = modalProps;
    const bekreftModalProps = useBekreftModal("alle jobbønsker");
    const { bekreftModalÅpen, toggleBekreftModal } = bekreftModalProps;
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
                <SeksjonSkeleton
                    icon={<HStack className={[styles.iconJobbonskerBig, styles.sectionIcon]} aria-hidden="true" />}
                />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconJobbonskerBig, styles.sectionIcon]} aria-hidden="true" />
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
                                    onClick={() => toggleBekreftModal(true, () => slettJobbønsker())}
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
            {bekreftModalÅpen && <BekreftSlettModal {...bekreftModalProps} />}
        </section>
    );
}
