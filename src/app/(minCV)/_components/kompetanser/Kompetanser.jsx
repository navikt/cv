import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import KompetanserModal from "@/app/(minCV)/_components/kompetanser/KompetanserModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { useOppdaterCvSeksjon } from "@/app/_common/hooks/swr/useOppdaterCvSeksjon";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";

function KompetanserIcon() {
    return (
        <svg
            style={{ marginTop: "-4.5rem", marginBottom: "4rem" }}
            width="64"
            height="61"
            viewBox="0 0 64 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="64" height="60.9524" rx="30.4762" fill="#7CDAF8" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 24.4762C19 23.5558 19.7462 22.8096 20.6667 22.8096H26.3333V21.1429C26.3333 19.8542 27.378 18.8096 28.6667 18.8096H35.3333C36.622 18.8096 37.6667 19.8542 37.6667 21.1429V22.8096H43.3333C44.2538 22.8096 45 23.5558 45 24.4762V31.1429C45 32.0634 44.2538 32.8096 43.3333 32.8096H43V39.1429C43 40.0634 42.2538 40.8096 41.3333 40.8096H22.6667C21.7462 40.8096 21 40.0634 21 39.1429V32.8096H20.6667C19.7462 32.8096 19 32.0634 19 31.1429V24.4762ZM28.3333 21.1429C28.3333 20.9588 28.4826 20.8096 28.6667 20.8096H35.3333C35.5174 20.8096 35.6667 20.9588 35.6667 21.1429V22.8096H28.3333V21.1429ZM32 35.4762C32.5523 35.4762 33 35.0285 33 34.4762V32.8096H41V38.8096H23V32.8096H31V34.4762C31 35.0285 31.4477 35.4762 32 35.4762ZM32 28.1429C32.5523 28.1429 33 28.5906 33 29.1429V30.8096H43V24.8096H21V30.8096H31V29.1429C31 28.5906 31.4477 28.1429 32 28.1429Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Kompetanser() {
    const { kompetanser, cvLaster } = useCv();
    const { oppdateringOk, laster, feilet, oppdaterMedData, setVisFeilmelding } = useOppdaterCvSeksjon(
        CvSeksjonEnum.KOMPETANSER,
    );

    const { modalÅpen, gjeldendeElement, toggleModal, lagreElement, slettElement } = useCvModal(
        kompetanser,
        oppdaterMedData,
        oppdateringOk,
        laster,
        feilet,
        setVisFeilmelding,
    );

    return (
        <div data-section id={SeksjonsIdEnum.KOMPETANSER}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<KompetanserIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <KompetanserIcon />
                    </HStack>
                    <Heading level="2" size="large" align="start" spacing>
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
                                    <BodyLong weight="semibold">• {kompetanse.title}</BodyLong>
                                    <HStack justify="space-between" className={styles.mb3}>
                                        <Button
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            icon={<TrashIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => slettElement(index)}
                                        >
                                            Fjern
                                        </Button>
                                    </HStack>
                                    {index < kompetanser.length - 1 && <div className={styles.divider} />}
                                </div>
                            ))}
                        </div>
                    )}
                    <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                        {kompetanser.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}
            {modalÅpen && (
                <KompetanserModal
                    modalÅpen={modalÅpen}
                    toggleModal={toggleModal}
                    kompetanse={gjeldendeElement}
                    lagreKompetanse={lagreElement}
                    laster={laster}
                    feilet={feilet}
                />
            )}
        </div>
    );
}
