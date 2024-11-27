import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { formatterFullDatoMedFallback } from "@/app/_common/utils/stringUtils";
import AndreGodkjenningerModal from "@/app/(minCV)/_components/andreGodkjenninger/AndreGodkjenningerModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

export default function AndreGodkjenninger() {
    const { andreGodkjenninger, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.ANDRE_GODKJENNINGER);
    const modalProps = useCvModal(andreGodkjenninger, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();
    const summaryHeadingId = useId();

    return (
        <section
            aria-labelledby={cvLaster ? undefined : headingId}
            data-section
            id={SeksjonsIdEnum.ANDRE_GODKJENNINGER}
        >
            {cvLaster ? (
                <SeksjonSkeleton
                    icon={
                        <HStack className={[styles.iconAndreGodkjenningerBig, styles.sectionIcon]} aria-hidden="true" />
                    }
                />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconAndreGodkjenningerBig, styles.sectionIcon]} aria-hidden="true" />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Andre godkjenninger
                    </Heading>
                    {andreGodkjenninger.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen andre godkjenninger i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                En annen godkjenning er f.eks it-sertifiseringer, som ikke krever statlig godkjenning.
                            </BodyLong>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            {andreGodkjenninger.map((godkjenning, index) => (
                                <div key={index}>
                                    <FormSummary style={{ marginBottom: "1rem" }}>
                                        <FormSummary.Header>
                                            <FormSummary.Heading id={`${summaryHeadingId}-${index}`} level="3">
                                                {godkjenning.certificateName}
                                            </FormSummary.Heading>
                                        </FormSummary.Header>
                                        <FormSummary.Answers aria-labelledby={`${summaryHeadingId}-${index}`}>
                                            {godkjenning.issuer && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>Utsteder</FormSummary.Label>
                                                    <FormSummary.Value>{godkjenning.issuer}</FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}
                                            <FormSummary.Answer>
                                                <FormSummary.Label>{`Gyldig${godkjenning.toDate ? "" : " fra"}`}</FormSummary.Label>
                                                <FormSummary.Value>
                                                    {`${formatterFullDatoMedFallback(godkjenning.fromDate)}${godkjenning.toDate ? ` - ${formatterFullDatoMedFallback(godkjenning.toDate)}` : ""}`}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                        </FormSummary.Answers>
                                    </FormSummary>
                                    <HStack justify="space-between" className={styles.mb6}>
                                        <Button
                                            aria-label={`Endre godkjenning ${godkjenning.certificateName}`}
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            aria-label={`Fjern godkjenning ${godkjenning.certificateName}`}
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
                        aria-label={
                            andreGodkjenninger.length === 0 ? "Legg til godkjenning" : "Legg til flere godkjenninger"
                        }
                        icon={<PlusIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        {andreGodkjenninger.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}
            {modalÅpen && <AndreGodkjenningerModal {...modalProps} />}
        </section>
    );
}
