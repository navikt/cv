import { Alert, BodyLong, Box, Button, Heading, HStack, Modal, Textarea, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { useOppdaterCvSeksjon } from "@/app/_common/hooks/swr/useOppdaterCvSeksjon";
import { useCvModal } from "@/app/_common/hooks/useCvModal";

export default function Sammendrag() {
    const { cv } = useCv();
    const sammendrag = cv.sammendrag;
    const [sammendragEndring, setSammendragEndring] = useState(sammendrag || "");

    const { oppdateringOk, laster, feilet, oppdaterMedData } = useOppdaterCvSeksjon(CvSeksjonEnum.SAMMENDRAG);
    const { modalÅpen, toggleModal } = useCvModal(sammendrag, oppdaterMedData, oppdateringOk, laster, feilet);

    const SammendragIcon = () => (
        <svg
            style={{ marginTop: "-4.5rem", marginBottom: "4rem" }}
            width="64"
            height="68"
            viewBox="0 0 64 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="64" height="67.8788" rx="32" fill="#7CDAF8" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.3333 25.606C21.1492 25.606 21 25.7552 21 25.9393C21 26.1234 21.1492 26.2726 21.3333 26.2726C21.5174 26.2726 21.6667 26.1234 21.6667 25.9393C21.6667 25.7552 21.5174 25.606 21.3333 25.606ZM19 25.9393C19 24.6506 20.0447 23.606 21.3333 23.606C22.622 23.606 23.6667 24.6506 23.6667 25.9393C23.6667 27.228 22.622 28.2726 21.3333 28.2726C20.0447 28.2726 19 27.228 19 25.9393ZM21 33.9393C21 33.7552 21.1492 33.606 21.3333 33.606C21.5174 33.606 21.6667 33.7552 21.6667 33.9393C21.6667 34.1234 21.5174 34.2726 21.3333 34.2726C21.1492 34.2726 21 34.1234 21 33.9393ZM21.3333 31.606C20.0447 31.606 19 32.6506 19 33.9393C19 35.228 20.0447 36.2726 21.3333 36.2726C22.622 36.2726 23.6667 35.228 23.6667 33.9393C23.6667 32.6506 22.622 31.606 21.3333 31.606ZM21 41.9393C21 41.7552 21.1492 41.606 21.3333 41.606C21.5174 41.606 21.6667 41.7552 21.6667 41.9393C21.6667 42.1234 21.5174 42.2726 21.3333 42.2726C21.1492 42.2726 21 42.1234 21 41.9393ZM21.3333 39.606C20.0447 39.606 19 40.6506 19 41.9393C19 43.228 20.0447 44.2726 21.3333 44.2726C22.622 44.2726 23.6667 43.228 23.6667 41.9393C23.6667 40.6506 22.622 39.606 21.3333 39.606ZM28 40.9393C27.4477 40.9393 27 41.387 27 41.9393C27 42.4916 27.4477 42.9393 28 42.9393H44C44.5523 42.9393 45 42.4916 45 41.9393C45 41.387 44.5523 40.9393 44 40.9393H28ZM27 33.9393C27 33.387 27.4477 32.9393 28 32.9393H44C44.5523 32.9393 45 33.387 45 33.9393C45 34.4916 44.5523 34.9393 44 34.9393H28C27.4477 34.9393 27 34.4916 27 33.9393ZM28 24.9393C27.4477 24.9393 27 25.387 27 25.9393C27 26.4916 27.4477 26.9393 28 26.9393H44C44.5523 26.9393 45 26.4916 45 25.9393C45 25.387 44.5523 24.9393 44 24.9393H28Z"
                fill="#23262A"
            />
        </svg>
    );

    return (
        <div data-section id={SeksjonsIdEnum.SAMMENDRAG}>
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <SammendragIcon />
                </HStack>
                <Heading level="2" size="large" align="start" spacing>
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
                        <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                            Legg til
                        </Button>
                    </div>
                ) : (
                    <div className={styles.mb6}>
                        <VStack style={{ padding: "1rem" }}>
                            <BodyLong weight="semibold" className={styles.mb3}>
                                Om meg
                            </BodyLong>
                            <BodyLong className={styles.mb6}>{sammendrag}</BodyLong>
                        </VStack>
                        <HStack justify="space-between">
                            <Button
                                icon={<PencilIcon aria-hidden />}
                                variant="primary"
                                onClick={() => toggleModal(true)}
                            >
                                Endre
                            </Button>
                            <Button
                                icon={<TrashIcon aria-hidden />}
                                variant="tertiary"
                                onClick={() => oppdaterMedData("")}
                            >
                                Fjern
                            </Button>
                        </HStack>
                    </div>
                )}
            </Box>

            <Modal open={modalÅpen} aria-label="Legg til sammendrag" onClose={() => toggleModal(false)} width="medium">
                <Modal.Header closeButton={true}>
                    <Heading align="start" level="3" size="medium">
                        <HStack gap="1" align="center">
                            Legg til Sammendrag
                        </HStack>
                    </Heading>
                </Modal.Header>
                <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }}>
                    <VStack>
                        <Alert variant="warning" className={styles.mb12}>
                            <Heading spacing size="xsmall" level="3">
                                Viktig informasjon om personopplysninger
                            </Heading>
                            <BodyLong size="small">
                                Husk at du <b>ikke</b> skal skrive sensitive opplysninger i CV-en om for eksempel din
                                helse, religion eller politiske oppfatning.
                            </BodyLong>
                        </Alert>
                        <Textarea
                            label="Gi en kort oppsummering av deg selv"
                            description=""
                            placeholder="En kort oppsummering av din kompetanse og dine personlige egenskaper."
                            className={styles.mb6}
                            value={sammendragEndring}
                            onChange={(e) => setSammendragEndring(e.target.value)}
                        />
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <HStack gap="4">
                        <Button variant="secondary" onClick={() => toggleModal(false)}>
                            Avbryt
                        </Button>
                        <Button variant="primary" onClick={() => oppdaterMedData(sammendragEndring)}>
                            Lagre
                        </Button>
                    </HStack>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
