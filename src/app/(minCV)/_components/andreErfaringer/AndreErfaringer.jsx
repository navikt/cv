import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { formatterDato } from "@/app/_common/utils/stringUtils";
import { AndreErfaringerModal } from "@/app/(minCV)/_components/andreErfaringer/AndreErfaringerModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";
import { datosorterElementer } from "@/app/_common/utils/dateUtils";

export default function AndreErfaringer() {
    const { andreErfaringer, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.ANDRE_ERFARINGER);
    const modalProps = useCvModal(andreErfaringer, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();
    const summaryHeadingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.ANDRE_ERFARINGER}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<HStack className={[styles.iconAndreErfaringerBig, styles.sectionIcon]} />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconAndreErfaringerBig, styles.sectionIcon]} />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Andre erfaringer
                    </Heading>
                    <>
                        {andreErfaringer.length === 0 ? (
                            <div>
                                <BodyLong weight="semibold" spacing>
                                    Du har ikke lagt til noen andre erfaringer i CV-en
                                </BodyLong>
                                <BodyLong className={styles.mb12}>
                                    En “annen erfaring” er f.eks frivillig arbeid som du gjør som en fotballtrener.
                                </BodyLong>
                            </div>
                        ) : (
                            <div className={styles.mb6}>
                                {datosorterElementer(andreErfaringer).map((erfaring, index) => (
                                    <div key={index}>
                                        <FormSummary style={{ marginBottom: "1rem" }}>
                                            <FormSummary.Header>
                                                <FormSummary.Heading id={summaryHeadingId} level="2">
                                                    {erfaring.role}
                                                </FormSummary.Heading>
                                            </FormSummary.Header>

                                            <FormSummary.Answers aria-labelledby={summaryHeadingId}>
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>Dato</FormSummary.Label>
                                                    <FormSummary.Value>{`${formatterDato(erfaring.fromDate)} - ${formatterDato(erfaring.toDate)}`}</FormSummary.Value>
                                                </FormSummary.Answer>

                                                <FormSummary.Answer>
                                                    <FormSummary.Label>Beskrivelse</FormSummary.Label>
                                                    <FormSummary.Value>{erfaring.description}</FormSummary.Value>
                                                </FormSummary.Answer>
                                            </FormSummary.Answers>
                                        </FormSummary>
                                        <HStack justify="space-between" className={styles.mb6}>
                                            <Button
                                                aria-label={`Endre erfaring ${erfaring.role}`}
                                                icon={<PencilIcon aria-hidden />}
                                                variant="tertiary"
                                                onClick={() => toggleModal(true, index)}
                                            >
                                                Endre
                                            </Button>
                                            <Button
                                                aria-label={`Fjern erfaring ${erfaring.role}`}
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
                                andreErfaringer.length === 0 ? "Legg til annen erfaring" : "Legg til flere erfaringer"
                            }
                            icon={<PlusIcon aria-hidden />}
                            variant="primary"
                            onClick={() => toggleModal(true)}
                        >
                            {andreErfaringer.length === 0 ? "Legg til" : "Legg til flere"}
                        </Button>
                    </>
                </Box>
            )}
            {modalÅpen && <AndreErfaringerModal {...modalProps} />}
        </section>
    );
}
