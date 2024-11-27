import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { CvSeksjonEnum, SeksjonsIdEnum, UtdanningsnivåEnum } from "@/app/_common/enums/cvEnums";
import { formatterDato } from "@/app/_common/utils/stringUtils";
import { UtdanningModal } from "@/app/(minCV)/_components/utdanninger/UtdanningModal";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import parse from "html-react-parser";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useId } from "react";
import { datosorterElementer } from "@/app/_common/utils/dateUtils";

export default function Utdanninger() {
    const { utdanninger, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.UTDANNING);
    const modalProps = useCvModal(utdanninger, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();
    const summaryHeadingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.UTDANNING}>
            {cvLaster ? (
                <SeksjonSkeleton
                    icon={<HStack className={[styles.iconUtdanningerBig, styles.sectionIcon]} aria-hidden="true" />}
                />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconUtdanningerBig, styles.sectionIcon]} aria-hidden="true" />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Utdanninger
                    </Heading>
                    {utdanninger.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen utdanninger i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                Her kan du beskrive dine utdanninger. Du bør legge inn første utdanningen du gjorde
                                først.
                            </BodyLong>
                        </div>
                    ) : (
                        <div>
                            {datosorterElementer(utdanninger, "startDate", "endDate").map((utdanning, index) => (
                                <div key={index}>
                                    <FormSummary style={{ marginBottom: "2rem" }}>
                                        <FormSummary.Header>
                                            <FormSummary.Heading id={`${summaryHeadingId}-${index}`} level="3">
                                                {UtdanningsnivåEnum[utdanning.nuskode]}
                                            </FormSummary.Heading>
                                        </FormSummary.Header>

                                        <FormSummary.Answers aria-labelledby={`${summaryHeadingId}-${index}`}>
                                            {utdanning.field && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>Grad og utdanningsretning</FormSummary.Label>
                                                    <FormSummary.Value>{utdanning.field}</FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}

                                            {utdanning.institution && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>Skole/studiested</FormSummary.Label>
                                                    <FormSummary.Value>{utdanning.institution}</FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}

                                            <FormSummary.Answer>
                                                <FormSummary.Label>Start- og sluttdato</FormSummary.Label>
                                                <FormSummary.Value>
                                                    {formatterDato(utdanning.startDate)} -{" "}
                                                    {formatterDato(utdanning.endDate)}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>

                                            {utdanning.description && (
                                                <FormSummary.Answer>
                                                    <FormSummary.Label>Beskrivelse</FormSummary.Label>
                                                    <FormSummary.Value>
                                                        {parse(utdanning.description.replace(/\n/g, "<br>"))}
                                                    </FormSummary.Value>
                                                </FormSummary.Answer>
                                            )}
                                        </FormSummary.Answers>
                                    </FormSummary>
                                    <HStack justify="space-between" className={styles.mb12}>
                                        <Button
                                            aria-label={`Endre utdanning ${utdanning.field}`}
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            aria-label={`Fjern utdanning ${utdanning.field}`}
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
                        aria-label={utdanninger.length === 0 ? "Legg til utdanning" : "Legg til flere utdanninger"}
                        icon={<PlusIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        {utdanninger.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}

            {modalÅpen && <UtdanningModal {...modalProps} />}
        </section>
    );
}
