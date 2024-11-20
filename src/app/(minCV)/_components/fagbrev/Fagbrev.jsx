import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import FagbrevModal from "@/app/(minCV)/_components/fagbrev/FagbrevModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

export default function Fagbrev() {
    const { fagbrev, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.FAGBREV);
    const modalProps = useCvModal(fagbrev, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.FAGBREV}>
            {cvLaster ? (
                <SeksjonSkeleton
                    icon={<HStack className={[styles.iconFagbrevBig, styles.sectionIcon]} aria-hidden="true" />}
                />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconFagbrevBig, styles.sectionIcon]} aria-hidden="true" />
                    </HStack>
                    <Heading id={headingId} className={styles.mb6} level="2" size="large" align="start" spacing>
                        Fagbrev
                    </Heading>
                    <>
                        {fagbrev.length === 0 ? (
                            <div>
                                <BodyLong weight="semibold" spacing>
                                    Du har ikke lagt til noen fagbrev i CV-en
                                </BodyLong>
                                <BodyLong className={styles.mb12}>
                                    Her kan du sette inn ulike fagbrev som du har tatt, f.eks i bilpleie.
                                </BodyLong>
                            </div>
                        ) : (
                            <div className={styles.mb6}>
                                {fagbrev.map((fb, index) => (
                                    <div key={index}>
                                        <BodyLong>{fb.title}</BodyLong>
                                        <HStack justify="space-between" className={styles.mb3}>
                                            <Button
                                                aria-label={`Endre ${fb.title}`}
                                                icon={<PencilIcon aria-hidden />}
                                                variant="tertiary"
                                                onClick={() => toggleModal(true, index)}
                                            >
                                                Endre
                                            </Button>
                                            <Button
                                                aria-label={`Fjern ${fb.title}`}
                                                icon={<TrashIcon aria-hidden />}
                                                variant="tertiary"
                                                onClick={() => slettElement(index)}
                                                loading={lastendeIndex === index}
                                            >
                                                Fjern
                                            </Button>
                                        </HStack>
                                        {index < fagbrev.length - 1 && <div className={styles.divider} />}
                                    </div>
                                ))}
                            </div>
                        )}
                        <Button
                            aria-label={fagbrev.length === 0 ? "Legg til fagbrev" : "Legg til flere fagbrev"}
                            icon={<PlusIcon aria-hidden />}
                            variant="primary"
                            onClick={() => toggleModal(true)}
                        >
                            {fagbrev.length === 0 ? "Legg til" : "Legg til flere"}
                        </Button>
                    </>
                </Box>
            )}
            {modalÅpen && <FagbrevModal {...modalProps} />}
        </section>
    );
}
