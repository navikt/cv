import { BodyShort, HStack, TextField } from "@navikt/ds-react";
import { useEffect, useState, useRef } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import styles from "@/app/page.module.css";
import { DatovelgerWithoutValidation } from "@/app/(minCV)/_components/datovelger/DatovelgerWithoutValidation";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { dateStringSchema, handleZodValidation, revalidateExplicitValue } from "@/app/_common/utils/validationHelper";
import z from "zod";

export default function AndreGodkjenningerModal({
    modalÅpen,
    toggleModal,
    gjeldendeElement,
    lagreElement,
    laster,
    feilet,
}) {
    const [valgtGodkjenning, setValgtGodkjenning] = useState(gjeldendeElement || null);
    const [utsteder, setUtsteder] = useState(gjeldendeElement?.issuer || "");
    const [errors, setErrors] = useState({});
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
    const modalFormRef = useRef();

    useEffect(() => {
        if (gjeldendeElement) {
            console.log("GJEL", gjeldendeElement);
            setValgtGodkjenning(gjeldendeElement);
            setUtsteder(gjeldendeElement.issuer || "");
        }
    }, [gjeldendeElement]);

    // Validation schema
    const GodkjenningSchema = z.object({
        title: z.string().min(1, "Du må velge en godkjenning"),
        issuer: z.string().optional(),
        fromDate: dateStringSchema.refine((data) => data <= new Date(), { message: "Dato kan ikke være frem i tid" }),
    });

    const GodkjenningSchemaWithEndDate = GodkjenningSchema.extend({
        toDate: dateStringSchema.optional(),
    }).refine(
        (data) => {
            if (data.toDate) {
                return new Date(data.toDate) >= new Date(data.fromDate);
            }
            return true;
        },
        {
            path: ["toDate"],
            message: "Til dato må være etter fra dato",
        },
    );

    const getFormData = (target) => {
        const formData = new FormData(target);
        return {
            title: valgtGodkjenning?.title || "",
            issuer: utsteder,
            fromDate: formData.get("fromDate"),
            toDate: formData.get("toDate") || undefined,
        };
    };

    const lagre = (e) => {
        e.preventDefault();
        setShouldAutoFocusErrors(true);
        setHasTriedSubmit(true);

        const data = getFormData(e.currentTarget);

        handleZodValidation({
            onError: setErrors,
            data: data,
            onSuccess: (res) => {
                lagreElement({
                    ...gjeldendeElement,
                    ...res,
                });
            },
            schema: GodkjenningSchemaWithEndDate,
        });
    };

    const revalidate = () => {
        if (hasTriedSubmit) {
            setShouldAutoFocusErrors(false);
            const data = getFormData();
            handleZodValidation({
                onError: setErrors,
                data: data,
                onSuccess: () => setErrors({}),
                schema: GodkjenningSchemaWithEndDate,
            });
        }
    };

    const oppdaterValgtGodkjenning = (verdi, erValgt) => {
        setValgtGodkjenning(erValgt ? verdi : null);
        if (hasTriedSubmit) {
            setShouldAutoFocusErrors(false);
            // Don't validate with end date schema
            revalidateExplicitValue("title", verdi?.label, GodkjenningSchema, errors, setErrors);
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til annen godkjenning"
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            ref={modalFormRef}
            overflowVisible
        >
            <Typeahead
                id="title"
                name="title"
                className={styles.mb6}
                label={
                    <HStack gap="2">
                        <BodyShort weight="semibold">Annen godkjenning</BodyShort>
                        <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                    </HStack>
                }
                description="Yrkessertifikater, attester, bevis o.l."
                type={TypeaheadEnum.ANDRE_GODKJENNINGER}
                oppdaterValg={oppdaterValgtGodkjenning}
                valgtVerdi={valgtGodkjenning?.title}
                error={errors?.title}
            />
            <TextField
                id="issuer"
                name="issuer"
                className={styles.mb6}
                label="Utsteder"
                description="Organisasjon, forening, opplæringssted"
                value={gjeldendeElement?.issuer}
                error={errors?.issuer}
            />
            <HStack gap="8">
                <DatovelgerWithoutValidation
                    id="fromDate"
                    name="fromDate"
                    label={
                        <HStack gap="2">
                            <BodyShort weight="semibold">Fullført</BodyShort>
                            <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                        </HStack>
                    }
                    defaultSelected={gjeldendeElement?.fromDate}
                    error={errors?.fromDate}
                    onBlur={revalidate}
                />
                <DatovelgerWithoutValidation
                    id="toDate"
                    name="toDate"
                    label="Utløper"
                    fremtid
                    defaultSelected={gjeldendeElement?.toDate}
                    error={errors?.toDate}
                    onBlur={revalidate}
                />
            </HStack>

            <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
        </CvModalForm>
    );
}
