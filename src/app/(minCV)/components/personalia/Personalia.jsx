import { BodyLong, Box, Button, Heading, HStack, Modal, TextField } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useState } from "react";

export default function Personalia() {
    const [leggTilPersonalia, setLeggTilPersonalia] = useState(false);

    return (
        <div>
            <Box id="2" background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
                <Heading level="2" size="large" align="start" spacing>
                    Personalia
                </Heading>
                <BodyLong weight="semibold">Navn</BodyLong>
                <BodyLong spacing>Luke Skywalker</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Telefon</BodyLong>
                <BodyLong spacing>+47 99 99 99 99</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">E-post</BodyLong>
                <BodyLong spacing>Luke@jedi.no</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Adresse</BodyLong>
                <BodyLong spacing>Alderaan gate 24, 0661 Oslo</BodyLong>
                <Button variant="primary" onClick={() => setLeggTilPersonalia(true)}>
                    Endre
                </Button>
            </Box>
            <Modal
                open={leggTilPersonalia}
                aria-label="Tilbakemelding"
                onClose={() => setLeggTilPersonalia(false)}
                width="medium"
            >
                <Modal.Header closeButton={true}>
                    <Heading align="center" level="3" size="medium">
                        Legg til personalia
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <BodyLong>
                        <b>Fornavn</b> *obligatorisk
                    </BodyLong>
                    <TextField label="" className={styles.mb6} />
                    <BodyLong>
                        <b>Etternavn</b> *obligatorisk
                    </BodyLong>
                    <TextField label="" className={styles.mb6} />
                    <BodyLong>
                        <b>E-post</b> *obligatorisk
                    </BodyLong>
                    <TextField label="" description="Eksempel: navn@mail.no" className={styles.mb6} />
                    <BodyLong>
                        <b>Gateadresse</b> *obligatorisk
                    </BodyLong>
                    <TextField label="" className={styles.mb6} />
                    <BodyLong>
                        <b>Postnummer</b> *obligatorisk
                    </BodyLong>
                    <TextField label="" className={styles.mb6} />
                    <BodyLong>
                        <b>Sted</b> *obligatorisk
                    </BodyLong>
                    <TextField label="" className={styles.mb6} />
                    <BodyLong>
                        <b>Fødselsdato</b> -kan ikke endres
                    </BodyLong>
                    <TextField label="" className={styles.mb6} />
                </Modal.Body>
                <Modal.Footer>
                    <HStack gap="4">
                        <Button variant="primary">Lagre</Button>
                        <Button variant="secondary" onClick={() => setLeggTilPersonalia(false)}>
                            Avbryt
                        </Button>
                    </HStack>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
