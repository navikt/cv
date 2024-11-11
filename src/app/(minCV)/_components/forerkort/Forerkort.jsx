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

function FørerkortIcon() {
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
                d="M23.7333 24.4667C24.4258 23.5434 25.5126 23 26.6667 23H33.3333C34.4874 23 35.5742 23.5434 36.2667 24.4667L39.2914 28.4996L43.486 30.0726C44.3967 30.4141 45 31.2847 45 32.2573V34.2923C45 35.363 44.2713 36.2963 43.2326 36.556L42.3264 36.7825C42.331 36.8544 42.3333 36.9269 42.3333 37C42.3333 38.8409 40.841 40.3333 39 40.3333C37.1591 40.3333 35.6667 38.8409 35.6667 37H29C29 38.8409 27.5076 40.3333 25.6667 40.3333C23.8257 40.3333 22.3333 38.8409 22.3333 37H21.3333C20.0447 37 19 35.9553 19 34.6667V30.6667C19 29.567 19.7607 28.645 20.7847 28.3982L23.7333 24.4667ZM25.3333 25.6667L23.3333 28.3333H27.6667V25H26.6667C26.1421 25 25.6481 25.247 25.3333 25.6667ZM34.6667 25.6667L36.6667 28.3333H29.6667V25H33.3333C33.8579 25 34.3519 25.247 34.6667 25.6667ZM42.7837 31.9452L38.4853 30.3333H21.3434L21.3277 30.3334C21.1462 30.3364 21 30.4845 21 30.6667V34.6667C21 34.8508 21.1492 35 21.3333 35H22.9998C23.6079 34.1904 24.5761 33.6667 25.6667 33.6667C26.7572 33.6667 27.7254 34.1904 28.3336 35H36.3331C36.9412 34.1904 37.9095 33.6667 39 33.6667C40.047 33.6667 40.9813 34.1494 41.5924 34.9045L42.7475 34.6157C42.8959 34.5786 43 34.4453 43 34.2923V32.2573C43 32.1184 42.9138 31.994 42.7837 31.9452ZM24.3333 37C24.3333 36.2636 24.9303 35.6667 25.6667 35.6667C26.403 35.6667 27 36.2636 27 37C27 37.7364 26.403 38.3333 25.6667 38.3333C24.9303 38.3333 24.3333 37.7364 24.3333 37ZM37.6667 37C37.6667 36.2636 38.2636 35.6667 39 35.6667C39.7364 35.6667 40.3333 36.2636 40.3333 37C40.3333 37.7364 39.7364 38.3333 39 38.3333C38.2636 38.3333 37.6667 37.7364 37.6667 37Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Forerkort() {
    const { førerkort, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.FØRERKORT);
    const modalProps = useCvModal(førerkort, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();

    return (
        <div aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.FØRERKORT}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<FørerkortIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <FørerkortIcon />
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
        </div>
    );
}
