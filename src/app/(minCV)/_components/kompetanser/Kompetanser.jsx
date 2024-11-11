import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import KompetanserModal from "@/app/(minCV)/_components/kompetanser/KompetanserModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

function KompetanserIcon() {
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
                d="M19 25.9999C19 25.0794 19.7462 24.3333 20.6667 24.3333H26.3333V22.6666C26.3333 21.3779 27.378 20.3333 28.6667 20.3333H35.3333C36.622 20.3333 37.6667 21.3779 37.6667 22.6666V24.3333H43.3333C44.2538 24.3333 45 25.0794 45 25.9999V32.6666C45 33.5871 44.2538 34.3333 43.3333 34.3333H43V40.6666C43 41.5871 42.2538 42.3333 41.3333 42.3333H22.6667C21.7462 42.3333 21 41.5871 21 40.6666V34.3333H20.6667C19.7462 34.3333 19 33.5871 19 32.6666V25.9999ZM28.3333 22.6666C28.3333 22.4825 28.4826 22.3333 28.6667 22.3333H35.3333C35.5174 22.3333 35.6667 22.4825 35.6667 22.6666V24.3333H28.3333V22.6666ZM32 36.9999C32.5523 36.9999 33 36.5522 33 35.9999V34.3333H41V40.3333H23V34.3333H31V35.9999C31 36.5522 31.4477 36.9999 32 36.9999ZM32 29.6666C32.5523 29.6666 33 30.1143 33 30.6666V32.3333H43V26.3333H21V32.3333H31V30.6666C31 30.1143 31.4477 29.6666 32 29.6666Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Kompetanser() {
    const { kompetanser, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.KOMPETANSER);
    const modalProps = useCvModal(kompetanser, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.KOMPETANSER}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<KompetanserIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <KompetanserIcon />
                    </HStack>
                    <Heading id={headingId} className={styles.mb6} level="2" size="large" align="start" spacing>
                        Kompetanser
                    </Heading>
                    {kompetanser.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen kompetanser i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                Her kan du sette inn de ulike kompetanser som spesifikke egenskaper f.eks undervisning
                                eller butikkarbeid.
                            </BodyLong>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            {kompetanser.map((kompetanse, index) => (
                                <div key={index}>
                                    <BodyLong>{kompetanse.title}</BodyLong>
                                    <HStack justify="space-between" className={styles.mb3}>
                                        <Button
                                            aria-label={`Endre kompetanse ${kompetanse.title}`}
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            aria-label={`Fjern kompetanse ${kompetanse.title}`}
                                            icon={<TrashIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => slettElement(index)}
                                            loading={lastendeIndex === index}
                                        >
                                            Fjern
                                        </Button>
                                    </HStack>
                                    {index < kompetanser.length - 1 && <div className={styles.divider} />}
                                </div>
                            ))}
                        </div>
                    )}
                    <Button
                        aria-label={kompetanser.length === 0 ? "Legg til kompetanser" : "Legg til flere kompetanser"}
                        icon={<PlusIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        {kompetanser.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}
            {modalÅpen && <KompetanserModal {...modalProps} />}
        </section>
    );
}
