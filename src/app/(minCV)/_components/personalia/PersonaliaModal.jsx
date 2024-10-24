import { useEffect, useState } from "react";
import { Button, Heading, HStack, Modal, TextField, VStack } from "@navikt/ds-react";
import { PersonCircleIcon } from "@navikt/aksel-icons";
import styles from "@/app/page.module.css";
import { formatterFullDato } from "@/app/_common/utils/stringUtils";
import ValidateEmail from "@/app/_common/components/ValidateEmail";

export default function PersonaliaModal({ modalÅpen, toggleModal, personalia, lagrePersonalia }) {
    const [fornavn, setFornavn] = useState("");
    const [etternavn, setEtternavn] = useState("");
    const [epost, setEpost] = useState("");
    const [telefon, setTelefon] = useState("");
    const [adresse, setAdresse] = useState("");
    const [postnummer, setPostnummer] = useState("");
    const [sted, setSted] = useState("");
    const [fødselsdato, setFødselsdato] = useState("");
    const [fornavnError, setFornavnError] = useState(false);
    const [etternavnError, setEtternavnError] = useState(false);
    const [epostError, setEpostError] = useState(false);
    const [epostValidationError, setEpostValidationError] = useState(false);
    const [telefonError, setTelefonError] = useState(false);

    useEffect(() => {
        const oppdaterPersonalia = (personalia) => {
            setFornavn(personalia?.fornavn || "");
            setEtternavn(personalia?.etternavn || "");
            setEpost(personalia?.epost || "");
            setTelefon(personalia?.telefonnummer || "");
            setAdresse(personalia?.adresse || "");
            setPostnummer(personalia?.postnummer || "");
            setSted(personalia?.poststed || "");
            setFødselsdato(personalia?.foedselsdato || "");
        };

        oppdaterPersonalia(personalia);
    }, [personalia]);

    const lagre = () => {
        let isEpostValid = false;

        if (!fornavn) setFornavnError(true);
        if (!etternavn) setEtternavnError(true);
        if (!telefon) setTelefonError(true);
        if (!epost) {
            setEpostError(true);
        } else {
            isEpostValid = ValidateEmail(epost);
            setEpostValidationError(!isEpostValid);
        }

        if (fornavn && etternavn && isEpostValid && telefon) {
            lagrePersonalia({
                fornavn: fornavn,
                etternavn: etternavn,
                epost: epost,
                telefonnummer: telefon,
                adresse: adresse,
                postnummer: postnummer,
                poststed: sted,
            });
        }
    };

    return (
        <Modal open={modalÅpen} aria-label="Legg til personalia" onClose={() => toggleModal(false)} width="medium">
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    <HStack gap="1" align="center">
                        <PersonCircleIcon fontSize="1.5rem" />
                        Legg til Personalia
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }}>
                <HStack justify="space-between">
                    <VStack className={styles.element}>
                        <TextField
                            className={styles.mb6}
                            label="Fornavn"
                            description="Må fylles ut"
                            value={fornavn}
                            onChange={(e) => {
                                setFornavn(e.target.value);
                                setFornavnError(false);
                            }}
                            error={fornavnError && "Fornavn må fylles ut"}
                        />
                    </VStack>
                    <VStack className={styles.element}>
                        <TextField
                            className={styles.mb6}
                            label="Etternavn"
                            description="Må fylles ut"
                            value={etternavn}
                            onChange={(e) => {
                                setEtternavn(e.target.value);
                                setEtternavnError(false);
                            }}
                            error={etternavnError && "Etternavn må fylles ut"}
                        />
                    </VStack>
                </HStack>
                <HStack justify="space-between">
                    <VStack className={styles.element}>
                        <TextField
                            className={styles.mb6}
                            type="email"
                            label="E-post"
                            description="Må fylles ut"
                            value={epost}
                            onChange={(e) => {
                                setEpost(e.target.value);
                                setEpostError(false);
                                setEpostValidationError(false);
                            }}
                            error={
                                (epostError && "E-post må fylles ut") ||
                                (epostValidationError && "Du har lagt inn en ugyldig E-post")
                            }
                        />
                    </VStack>
                    <VStack className={styles.element}>
                        <TextField
                            className={styles.mb6}
                            type="tel"
                            label="Telefon"
                            description="Må fylles ut"
                            value={telefon}
                            onChange={(e) => {
                                setTelefon(e.target.value);
                                setTelefonError(false);
                            }}
                            error={telefonError && "Telefon må fylles ut"}
                        />
                    </VStack>
                </HStack>
                <TextField
                    className={styles.mb6}
                    label="Gateadresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                />
                <HStack justify="space-between">
                    <VStack className={styles.element}>
                        <TextField
                            className={styles.mb6}
                            label="Postnummer"
                            value={postnummer}
                            onChange={(e) => setPostnummer(e.target.value)}
                        />
                    </VStack>
                    <VStack className={styles.element}>
                        <TextField
                            className={styles.mb6}
                            label="Sted"
                            value={sted}
                            onChange={(e) => setSted(e.target.value)}
                        />
                    </VStack>
                </HStack>
                <TextField
                    label="Fødselsdato"
                    description="Kan ikke endres"
                    value={!!fødselsdato ? formatterFullDato(fødselsdato) : ""}
                    readOnly
                />
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button variant="secondary" onClick={() => toggleModal(false)}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={() => lagre()}>
                        Lagre
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
