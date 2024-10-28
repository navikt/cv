import { useEffect, useState } from "react";
import { HStack, TextField, VStack } from "@navikt/ds-react";
import { PersonCircleIcon } from "@navikt/aksel-icons";
import styles from "@/app/page.module.css";
import { formatterFullDato } from "@/app/_common/utils/stringUtils";
import ValidateEmail from "@/app/_common/components/ValidateEmail";
import { CvModal } from "@/app/_common/components/CvModal";

export default function PersonaliaModal({ modalÅpen, toggleModal, personalia, lagrePersonalia, laster, feilet }) {
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
        <CvModal
            modalÅpen={modalÅpen}
            tittel={"Legg til personalia"}
            icon={<PersonCircleIcon fontSize="1.5rem" />}
            feilet={feilet}
            laster={laster}
            lagre={lagre}
            toggleModal={toggleModal}
        >
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
                disabled={laster}
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
        </CvModal>
    );
}
