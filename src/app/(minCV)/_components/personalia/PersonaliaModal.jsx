import { useEffect, useState } from "react";
import { HStack, TextField, VStack } from "@navikt/ds-react";
import { PersonCircleIcon } from "@navikt/aksel-icons";
import styles from "@/app/page.module.css";
import { formatterFullDatoMedFallback } from "@/app/_common/utils/stringUtils";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { handleZodValidation, revalidate } from "@/app/_common/utils/validationHelper";
import z from "zod";

export default function PersonaliaModal({
    modalÅpen,
    toggleModal,
    gjeldendeElement: personalia,
    lagreElement: lagrePersonalia,
    laster,
    feilet,
}) {
    const [fornavn, setFornavn] = useState("");
    const [etternavn, setEtternavn] = useState("");
    const [epost, setEpost] = useState("");
    const [telefon, setTelefon] = useState("");
    const [adresse, setAdresse] = useState("");
    const [postnummer, setPostnummer] = useState("");
    const [sted, setSted] = useState("");
    const [fødselsdato, setFødselsdato] = useState("");
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [errors, setErrors] = useState({});

    const PersonaliaSchema = z.object({
        fornavn: z.string().min(1, "Fornavn må fylles ut"),
        etternavn: z.string().min(1, "Etternavn må fylles ut"),
        telefonnummer: z.string().min(1, "Telefon må fylles ut"),
        epost: z.string().email("Du har lagt inn en ugyldig e-post").min(1, "E-post må fylles ut"),
        postnummer: z.string().optional(),
        poststed: z.string().optional(),
        adresse: z.string().optional(),
    });

    useEffect(() => {
        const oppdaterPersonalia = (personaliaVerdi) => {
            setFornavn(personaliaVerdi?.fornavn || "");
            setEtternavn(personaliaVerdi?.etternavn || "");
            setEpost(personaliaVerdi?.epost || "");
            setTelefon(personaliaVerdi?.telefonnummer || "");
            setAdresse(personaliaVerdi?.adresse || "");
            setPostnummer(personaliaVerdi?.postnummer || "");
            setSted(personaliaVerdi?.poststed || "");
            setFødselsdato(personaliaVerdi?.foedselsdato || "");
        };

        oppdaterPersonalia(personalia);
    }, [personalia]);

    const lagre = (e) => {
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setShouldAutoFocusErrors(true);

        handleZodValidation({
            onError: setErrors,
            data: data,
            onSuccess: () => {
                lagrePersonalia({
                    fornavn: fornavn,
                    etternavn: etternavn,
                    epost: epost,
                    telefonnummer: telefon,
                    adresse: adresse,
                    postnummer: postnummer,
                    poststed: sted,
                });
            },
            schema: PersonaliaSchema,
        });
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til personalia"
            icon={<PersonCircleIcon aria-hidden="true" fontSize="1.5rem" />}
            feilet={feilet}
            laster={laster}
            toggleModal={toggleModal}
            handleFormSubmit={lagre}
        >
            <HStack justify="space-between">
                <VStack className={styles.element}>
                    <TextField
                        id="fornavn"
                        name="fornavn"
                        className={styles.mb6}
                        label="Fornavn"
                        description="Må fylles ut"
                        value={fornavn}
                        onChange={(e) => {
                            setFornavn(e.target.value);
                        }}
                        onBlur={(e) => {
                            setShouldAutoFocusErrors(false);
                            revalidate(e, PersonaliaSchema, errors, setErrors);
                        }}
                        error={errors?.fornavn}
                    />
                </VStack>
                <VStack className={styles.element}>
                    <TextField
                        id="etternavn"
                        name="etternavn"
                        className={styles.mb6}
                        label="Etternavn"
                        description="Må fylles ut"
                        value={etternavn}
                        onChange={(e) => {
                            setEtternavn(e.target.value);
                        }}
                        onBlur={(e) => {
                            setShouldAutoFocusErrors(false);
                            revalidate(e, PersonaliaSchema, errors, setErrors);
                        }}
                        error={errors?.etternavn}
                    />
                </VStack>
            </HStack>
            <HStack justify="space-between">
                <VStack className={styles.element}>
                    <TextField
                        className={styles.mb6}
                        id="epost"
                        name="epost"
                        type="email"
                        label="E-post"
                        description="Må fylles ut"
                        value={epost}
                        onChange={(e) => {
                            setEpost(e.target.value);
                        }}
                        onBlur={(e) => {
                            setShouldAutoFocusErrors(false);
                            revalidate(e, PersonaliaSchema, errors, setErrors);
                        }}
                        error={errors?.epost}
                    />
                </VStack>
                <VStack className={styles.element}>
                    <TextField
                        className={styles.mb6}
                        id="telefonnummer"
                        name="telefonnummer"
                        type="tel"
                        label="Telefon"
                        description="Må fylles ut"
                        value={telefon}
                        onChange={(e) => {
                            setTelefon(e.target.value);
                        }}
                        onBlur={(e) => {
                            setShouldAutoFocusErrors(false);
                            revalidate(e, PersonaliaSchema, errors, setErrors);
                        }}
                        error={errors?.telefon}
                    />
                </VStack>
            </HStack>
            <TextField
                name="adresse"
                className={styles.mb6}
                label="Gateadresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
            />
            <HStack justify="space-between">
                <VStack className={styles.element}>
                    <TextField
                        name="postnummer"
                        className={styles.mb6}
                        label="Postnummer"
                        value={postnummer}
                        onChange={(e) => setPostnummer(e.target.value)}
                    />
                </VStack>
                <VStack className={styles.element}>
                    <TextField
                        name="poststed"
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
                value={fødselsdato ? formatterFullDatoMedFallback(fødselsdato) : ""}
                readOnly
            />
            <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
        </CvModalForm>
    );
}
