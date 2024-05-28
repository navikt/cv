import { BodyLong, Box, Button, Heading, HStack, Modal, TextField } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { useState } from "react";

export default function Fagbrev() {
    const [fagbrev, setFagbrev] = useState(true);
    const [leggTilFagbrev, setLeggTilFagbrev] = useState(false);
    const [fagdokumentasjon, setFagdokumentasjon] = useState();

    return (
        <div id="5">
            <Box background="surface-default" padding="10" className={styles.box}>
                <Heading className={styles.mb6} level="2" size="large" align="start" spacing>
                    Fagbrev
                </Heading>
                {!fagbrev && (
                    <>
                        <BodyLong weight="semibold" spacing>
                            Du har ikke lagt til noen fagbrev i CV-en
                        </BodyLong>
                        <BodyLong className={styles.mb12}>
                            Her kan du sette inn ulike fagbrev som du har tatt, f.eks i bilpleie.
                        </BodyLong>
                        <Button icon={<PlusIcon aria-hidden />} variant="primary">
                            Legg til
                        </Button>
                    </>
                )}
                {fagbrev && (
                    <>
                        <BodyLong weight="semibold">Yrkeskompetanse mediedesigner</BodyLong>
                        <HStack justify="space-between" className={styles.mb3}>
                            <Button icon={<PencilIcon aria-hidden />} variant="tertiary">
                                Endre
                            </Button>
                            <Button icon={<TrashIcon aria-hidden />} variant="tertiary">
                                Fjern
                            </Button>
                        </HStack>
                        <div className={styles.divider}></div>
                        <BodyLong weight="semibold">Svennebrev profileringsdesigner</BodyLong>
                        <HStack justify="space-between" className={styles.mb3}>
                            <Button icon={<PencilIcon aria-hidden />} variant="tertiary">
                                Endre
                            </Button>
                            <Button icon={<TrashIcon aria-hidden />} variant="tertiary">
                                Fjern
                            </Button>
                        </HStack>
                        <div className={styles.divider}></div>
                        <BodyLong weight="semibold">Mesterbrev profileringsdesigner</BodyLong>
                        <HStack justify="space-between" className={styles.mb12}>
                            <Button icon={<PencilIcon aria-hidden />} variant="tertiary">
                                Endre
                            </Button>
                            <Button icon={<TrashIcon aria-hidden />} variant="tertiary">
                                Fjern
                            </Button>
                        </HStack>
                        <Button
                            icon={<PlusIcon aria-hidden />}
                            variant="primary"
                            onClick={() => setLeggTilFagbrev(true)}
                        >
                            Legg til flere
                        </Button>
                    </>
                )}
            </Box>
            <Modal
                open={leggTilFagbrev}
                aria-label="Legg til fagbrev"
                onClose={() => setLeggTilFagbrev(false)}
                width="medium"
            >
                <Modal.Header closeButton={true}>
                    <Heading align="start" level="3" size="medium">
                        <HStack gap="1" align="center">
                            Legg til Fagbrev
                        </HStack>
                    </Heading>
                </Modal.Header>
                <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }}>
                    <TextField
                        className={styles.mb6}
                        label="Fagdokumentasjon"
                        description="Må fylles ut"
                        value={fagdokumentasjon}
                        onChange={(e) => setFagdokumentasjon(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <HStack gap="4">
                        <Button variant="secondary" onClick={() => setLeggTilFagbrev(false)}>
                            Avbryt
                        </Button>
                        <Button variant="primary">Lagre</Button>
                    </HStack>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
