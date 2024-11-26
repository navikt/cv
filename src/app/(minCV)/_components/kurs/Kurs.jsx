import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { formatterFullDatoMedFallback, formatterTidsenhet } from "@/app/_common/utils/stringUtils";
import KursModal from "@/app/(minCV)/_components/kurs/KursModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

export default function Kurs() {
    const { kurs, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.KURS);
    const modalProps = useCvModal(kurs, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();
    const summaryHeadingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.KURS}>
            {cvLaster ? (
                <SeksjonSkeleton
                    icon={<HStack className={[styles.iconKursBig, styles.sectionIcon]} aria-hidden="true" />}
                />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconKursBig, styles.sectionIcon]} aria-hidden="true" />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Kurs
                    </Heading>
                    {kurs.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen kurs i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                Her kan du sette inn kurs som du har tatt, f.eks skredkurs.
                            </BodyLong>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            {kurs.map((k, index) => (
                                <div key={index}>
                                    <FormSummary style={{ marginBottom: "1rem" }}>
                                        <FormSummary.Header>
                                            <FormSummary.Heading id={summaryHeadingId} level="3">
                                                {k.title}
                                            </FormSummary.Heading>
                                        </FormSummary.Header>
                                        <FormSummary.Answers aria-labelledby={summaryHeadingId}>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Utsteder</FormSummary.Label>
                                                <FormSummary.Value>{k.issuer || "Ikke oppgitt"}</FormSummary.Value>
                                            </FormSummary.Answer>
                                            {k.date && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>Fullført</FormSummary.Label>
                                                    <FormSummary.Value>
                                                        {formatterFullDatoMedFallback(k.date)}
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}
                                            {k.durationUnit !== "UKJENT" && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>Kursvarighet</FormSummary.Label>
                                                    <FormSummary.Value>{`${k.duration} ${formatterTidsenhet(k.durationUnit, k.duration)}`}</FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}
                                        </FormSummary.Answers>
                                    </FormSummary>
                                    <HStack justify="space-between" className={styles.mb6}>
                                        <Button
                                            aria-label={`Endre kurs ${k.title}`}
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            aria-label={`Fjern kurs ${k.title}`}
                                            icon={<TrashIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => slettElement(index)}
                                            loading={lastendeIndex === index}
                                        >
                                            Fjern
                                        </Button>
                                    </HStack>
                                </div>
                            ))}
                        </div>
                    )}
                    <Button
                        aria-label={kurs.length === 0 ? "Legg til kurs" : "Legg til flere kurs"}
                        icon={<PlusIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        {kurs.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}
            {modalÅpen && <KursModal {...modalProps} />}
        </section>
    );
}
