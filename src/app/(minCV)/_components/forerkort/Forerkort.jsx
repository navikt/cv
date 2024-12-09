import { BodyLong, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { formatterDato } from "@/app/_common/utils/stringUtils";
import FørerkortModal from "@/app/(minCV)/_components/forerkort/FørerkortModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

export default function Forerkort() {
    const { førerkort, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.FØRERKORT);
    const modalProps = useCvModal(førerkort, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.FØRERKORT}>
            {cvLaster ? (
                <SeksjonSkeleton
                    icon={<HStack className={[styles.iconForerkortBig, styles.sectionIcon]} aria-hidden="true" />}
                />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconForerkortBig, styles.sectionIcon]} aria-hidden="true" />
                    </HStack>
                    <Heading id={headingId} className={styles.mb6} level="2" size="large" align="start" spacing>
                        Førerkort
                    </Heading>
                    {førerkort.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen førerkort i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                Her kan du sette inn alle ulike førerkort, f.eks lastebil.
                            </BodyLong>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            {førerkort.map((fk, index) => (
                                <div key={index}>
                                    <VStack className={styles.mb3}>
                                        <BodyLong>{fk.type}</BodyLong>
                                        {fk.acquiredDate && (
                                            <BodyLong weight="regular">
                                                {`Gyldig fra ${formatterDato(fk.acquiredDate)} - ${formatterDato(fk.expiryDate)}`}
                                            </BodyLong>
                                        )}
                                    </VStack>
                                    <HStack justify="space-between" className={styles.mb3}>
                                        <Button
                                            aria-label={`Endre førerkort ${fk.type}`}
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            aria-label={`Fjern førerkort ${fk.type}`}
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
                                    {index < førerkort.length - 1 && <div className={styles.divider} />}
                                </div>
                            ))}
                        </div>
                    )}
                    <Button
                        aria-label={førerkort.length === 0 ? "Legg til førerkort" : "Legg til flere førerkort"}
                        icon={<PlusIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        {førerkort.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}
            {modalÅpen && <FørerkortModal {...modalProps} />}
        </section>
    );
}
