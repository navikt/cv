import { useState } from "react";
import { HStack, TextField } from "@navikt/ds-react";
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

    const lagre = (e) => {
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setShouldAutoFocusErrors(true);

        handleZodValidation({
            onError: setErrors,
            data: data,
            onSuccess: (res) => {
                lagrePersonalia({
                    ...res,
                });
            },
            schema: PersonaliaSchema,
        });
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til personalia"
            icon={<HStack className={[styles.iconPersonaliaBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            toggleModal={toggleModal}
            handleFormSubmit={lagre}
        >
            <HStack justify="space-between">
                <div className={styles.element}>
                    <TextField
                        id="fornavn"
                        name="fornavn"
                        className={styles.mb6}
                        label="Fornavn"
                        description="Må fylles ut"
                        defaultValue={personalia.fornavn}
                        onBlur={(e) => {
                            setShouldAutoFocusErrors(false);
                            revalidate(e, PersonaliaSchema, errors, setErrors);
                        }}
                        error={errors?.fornavn}
                    />
                </div>
                <div className={styles.element}>
                    <TextField
                        id="etternavn"
                        name="etternavn"
                        className={styles.mb6}
                        label="Etternavn"
                        description="Må fylles ut"
                        defaultValue={personalia.etternavn}
                        onBlur={(e) => {
                            setShouldAutoFocusErrors(false);
                            revalidate(e, PersonaliaSchema, errors, setErrors);
                        }}
                        error={errors?.etternavn}
                    />
                </div>
            </HStack>
            <HStack justify="space-between">
                <div className={styles.element}>
                    <TextField
                        className={styles.mb6}
                        id="epost"
                        name="epost"
                        type="email"
                        label="E-post"
                        description="Må fylles ut"
                        defaultValue={personalia.epost}
                        onBlur={(e) => {
                            setShouldAutoFocusErrors(false);
                            revalidate(e, PersonaliaSchema, errors, setErrors);
                        }}
                        error={errors?.epost}
                    />
                </div>
                <div className={styles.element}>
                    <TextField
                        className={styles.mb6}
                        id="telefonnummer"
                        name="telefonnummer"
                        type="tel"
                        label="Telefon"
                        description="Må fylles ut"
                        defaultValue={personalia.telefonnummer}
                        onBlur={(e) => {
                            setShouldAutoFocusErrors(false);
                            revalidate(e, PersonaliaSchema, errors, setErrors);
                        }}
                        error={errors?.telefon}
                    />
                </div>
            </HStack>
            <TextField name="adresse" className={styles.mb6} label="Gateadresse" defaultValue={personalia.adresse} />
            <HStack justify="space-between">
                <div className={styles.element}>
                    <TextField
                        name="postnummer"
                        className={styles.mb6}
                        label="Postnummer"
                        defaultValue={personalia.postnummer}
                    />
                </div>
                <div className={styles.element}>
                    <TextField name="poststed" className={styles.mb6} label="Sted" defaultValue={personalia.poststed} />
                </div>
            </HStack>
            <TextField
                label="Fødselsdato"
                description="Kan ikke endres"
                value={personalia.foedselsdato ? formatterFullDatoMedFallback(personalia.foedselsdato) : ""}
                readOnly
            />
            <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
        </CvModalForm>
    );
}
