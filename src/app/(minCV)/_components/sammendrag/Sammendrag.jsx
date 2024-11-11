import { BodyLong, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import parse from "html-react-parser";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import SammendragModal from "@/app/(minCV)/_components/sammendrag/SammendragModal";
import { useId } from "react";

function SammendragIcon() {
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
                d="M21.3333 23.6665C21.1492 23.6665 21 23.8157 21 23.9998C21 24.1839 21.1492 24.3332 21.3333 24.3332C21.5174 24.3332 21.6667 24.1839 21.6667 23.9998C21.6667 23.8157 21.5174 23.6665 21.3333 23.6665ZM19 23.9998C19 22.7112 20.0447 21.6665 21.3333 21.6665C22.622 21.6665 23.6667 22.7112 23.6667 23.9998C23.6667 25.2885 22.622 26.3332 21.3333 26.3332C20.0447 26.3332 19 25.2885 19 23.9998ZM21 31.9998C21 31.8157 21.1492 31.6665 21.3333 31.6665C21.5174 31.6665 21.6667 31.8157 21.6667 31.9998C21.6667 32.1839 21.5174 32.3332 21.3333 32.3332C21.1492 32.3332 21 32.1839 21 31.9998ZM21.3333 29.6665C20.0447 29.6665 19 30.7112 19 31.9998C19 33.2885 20.0447 34.3332 21.3333 34.3332C22.622 34.3332 23.6667 33.2885 23.6667 31.9998C23.6667 30.7112 22.622 29.6665 21.3333 29.6665ZM21 39.9998C21 39.8157 21.1492 39.6665 21.3333 39.6665C21.5174 39.6665 21.6667 39.8157 21.6667 39.9998C21.6667 40.1839 21.5174 40.3332 21.3333 40.3332C21.1492 40.3332 21 40.1839 21 39.9998ZM21.3333 37.6665C20.0447 37.6665 19 38.7112 19 39.9998C19 41.2885 20.0447 42.3332 21.3333 42.3332C22.622 42.3332 23.6667 41.2885 23.6667 39.9998C23.6667 38.7112 22.622 37.6665 21.3333 37.6665ZM28 38.9998C27.4477 38.9998 27 39.4476 27 39.9998C27 40.5521 27.4477 40.9998 28 40.9998H44C44.5523 40.9998 45 40.5521 45 39.9998C45 39.4476 44.5523 38.9998 44 38.9998H28ZM27 31.9998C27 31.4476 27.4477 30.9998 28 30.9998H44C44.5523 30.9998 45 31.4476 45 31.9998C45 32.5521 44.5523 32.9998 44 32.9998H28C27.4477 32.9998 27 32.5521 27 31.9998ZM28 22.9998C27.4477 22.9998 27 23.4476 27 23.9998C27 24.5521 27.4477 24.9998 28 24.9998H44C44.5523 24.9998 45 24.5521 45 23.9998C45 23.4476 44.5523 22.9998 44 22.9998H28Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Sammendrag() {
    const { sammendrag, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.SAMMENDRAG);
    const modalProps = useCvModal(sammendrag, oppdateringprops);
    const { modalÅpen, toggleModal, laster } = modalProps;
    const { triggerOppdatering } = oppdateringprops;
    const headingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.SAMMENDRAG}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<SammendragIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <SammendragIcon />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Sammendrag
                    </Heading>
                    {!sammendrag ? (
                        <div>
                            <VStack style={{ padding: "1rem" }}>
                                <BodyLong weight="semibold" className={styles.mb3}>
                                    Om meg
                                </BodyLong>
                                <BodyLong className={styles.mb6}>
                                    Her kan du beskrive deg selv, hvordan du er som arbeidstaker og ulike personlige
                                    egenskaper.
                                </BodyLong>
                            </VStack>
                            <Button
                                aria-label="Legg til sammendrag"
                                icon={<PlusIcon aria-hidden />}
                                variant="primary"
                                onClick={() => toggleModal(true)}
                            >
                                Legg til
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            <VStack style={{ padding: "1rem" }}>
                                <BodyLong weight="semibold" className={styles.mb3}>
                                    Om meg
                                </BodyLong>
                                <BodyLong className={styles.mb6}>{parse(sammendrag.replace(/\n/g, "<br>"))}</BodyLong>
                            </VStack>
                            <HStack justify="space-between">
                                <Button
                                    aria-label="Endre sammendrag"
                                    icon={<PencilIcon aria-hidden />}
                                    variant="primary"
                                    onClick={() => toggleModal(true)}
                                >
                                    Endre
                                </Button>
                                <Button
                                    aria-label="Fjern sammendrag"
                                    icon={<TrashIcon aria-hidden />}
                                    variant="tertiary"
                                    onClick={() => triggerOppdatering("")}
                                    loading={laster}
                                >
                                    Fjern
                                </Button>
                            </HStack>
                        </div>
                    )}
                </Box>
            )}

            {modalÅpen && (
                <SammendragModal {...modalProps} lagreElement={triggerOppdatering} gjeldendeElement={sammendrag} />
            )}
        </section>
    );
}
