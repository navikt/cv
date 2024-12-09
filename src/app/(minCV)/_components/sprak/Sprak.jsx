import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { CvSeksjonEnum, SeksjonsIdEnum, SpråkEnum } from "@/app/_common/enums/cvEnums";
import SpråkModal from "@/app/(minCV)/_components/sprak/SpråkModal";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

export default function Sprak() {
    const { språk, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.SPRÅK);
    const modalProps = useCvModal(språk, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();
    const summaryHeadingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.SPRÅK}>
            {cvLaster ? (
                <SeksjonSkeleton
                    icon={<HStack className={[styles.iconSprakBig, styles.sectionIcon]} aria-hidden="true" />}
                />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconSprakBig, styles.sectionIcon]} aria-hidden="true" />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Språk
                    </Heading>

                    {språk.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen språk i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                Her kan du si hvilke språk du kan, og hvor god du er i dem.
                            </BodyLong>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            {språk.map((sp, index) => (
                                <div key={index}>
                                    <FormSummary style={{ marginBottom: "1rem" }}>
                                        <FormSummary.Header>
                                            <FormSummary.Heading id={`${summaryHeadingId}-${index}`} level="3">
                                                {sp.language}
                                            </FormSummary.Heading>
                                        </FormSummary.Header>
                                        <FormSummary.Answers aria-labelledby={`${summaryHeadingId}-${index}`}>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Muntlig</FormSummary.Label>
                                                <FormSummary.Value>{SpråkEnum[sp.oralProficiency]}</FormSummary.Value>
                                            </FormSummary.Answer>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Skriftlig</FormSummary.Label>
                                                <FormSummary.Value>
                                                    {SpråkEnum[sp.writtenProficiency]}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                        </FormSummary.Answers>
                                    </FormSummary>
                                    <HStack justify="space-between" className={styles.mb6}>
                                        <Button
                                            aria-label={`Endre språk ${sp.language}`}
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            aria-label={`Fjern språk ${sp.language}`}
                                            icon={<TrashIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => slettElement(index)}
                                            onKeyUp={(e) => {
                                                // Prevent Firefox double action with spacebar
                                                if (e.code === "Space") {
                                                    e.preventDefault();
                                                    slettElement(index);
                                                }
                                            }}
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
                        aria-label={språk.length === 0 ? "Legg til språk" : "Legg til flere språk"}
                        icon={<PlusIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        {språk.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}
            {modalÅpen && <SpråkModal {...modalProps} />}
        </section>
    );
}
