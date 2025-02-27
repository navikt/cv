import { BodyShort, HStack, TextField } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import styles from "@/app/page.module.css";
import { DatovelgerWithoutValidation } from "@/app/(minCV)/_components/datovelger/DatovelgerWithoutValidation";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { dateStringSchema, handleZodValidation, revalidateExplicitValue } from "@/app/_common/utils/validationHelper";
import z from "zod";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { EuresDeleInfoBox } from "@/app/_common/components/EuresDeleInfoBox";

export default function AndreGodkjenningerModal({
    modalÅpen,
    toggleModal,
    gjeldendeElement,
    lagreElement,
    laster,
    feilet,
}) {
    const { euresAndreGodkjenninger } = useEures();

    const [valgtGodkjenning, setValgtGodkjenning] = useState(gjeldendeElement || null);
    const [errors, setErrors] = useState({});
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
    const modalFormRef = useRef();

    useEffect(() => {
        if (gjeldendeElement) {
            setValgtGodkjenning(gjeldendeElement);
        }
    }, [gjeldendeElement]);

    // Validation schema
    const GodkjenningSchema = z.object({
        certificateName: z.string().min(1, "Du må velge en godkjenning"),
        conceptId: z.coerce.string().optional(),
        issuer: z.string().optional(),
        fromDate: dateStringSchema("Fullført").refine((data) => data <= new Date(), {
            message: "Fullført kan ikke være frem i tid",
        }),
    });

    const GodkjenningSchemaWithEndDate = GodkjenningSchema.extend({
        toDate: dateStringSchema("Utløper").optional(),
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
            certificateName: valgtGodkjenning?.title || valgtGodkjenning?.certificateName || "",
            conceptId: valgtGodkjenning?.conceptId,
            issuer: formData.get("issuer"),
            fromDate: formData.get("fromDate") || undefined,
            toDate: formData.get("toDate") || undefined,
        };
    };

    const lagre = (e) => {
        setShouldAutoFocusErrors(true);
        setHasTriedSubmit(true);

        const data = getFormData(e.currentTarget);

        handleZodValidation({
            onError: setErrors,
            data: data,
            onSuccess: (res) => {
                lagreElement({
                    ...res,
                });
            },
            schema: GodkjenningSchemaWithEndDate,
        });
    };

    const revalidate = () => {
        if (hasTriedSubmit) {
            setShouldAutoFocusErrors(false);
            const data = getFormData(modalFormRef.current);

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
            revalidateExplicitValue(
                "certificateName",
                verdi?.title || verdi?.certificateName,
                GodkjenningSchema,
                errors,
                setErrors,
            );
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til annen godkjenning"
            icon={
                <HStack as="span" className={[styles.iconAndreGodkjenningerBig, styles.modalIcon]} aria-hidden="true" />
            }
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            ref={modalFormRef}
        >
            <Typeahead
                id="certificateName"
                name="certificateName"
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
                valgtVerdi={valgtGodkjenning?.certificateName || valgtGodkjenning?.title}
                error={errors?.certificateName}
            />
            <TextField
                id="issuer"
                name="issuer"
                className={styles.mb6}
                label="Utsteder"
                description="Organisasjon, forening, opplæringssted"
                defaultValue={gjeldendeElement?.issuer}
                error={errors?.issuer}
            />
            <HStack gap="12">
                <DatovelgerWithoutValidation
                    id="fromDate"
                    name="fromDate"
                    label={
                        <HStack gap="2">
                            <BodyShort weight="semibold">
                                Fullført<span className={styles.visuallyhidden}> dato</span>
                            </BodyShort>
                            <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                        </HStack>
                    }
                    defaultSelected={gjeldendeElement?.fromDate}
                    error={errors?.fromDate}
                    revalidate={revalidate}
                />
                <DatovelgerWithoutValidation
                    id="toDate"
                    name="toDate"
                    label={
                        <>
                            Utløper<span className={styles.visuallyhidden}> dato</span>
                        </>
                    }
                    fremtid
                    defaultSelected={gjeldendeElement?.toDate}
                    error={errors?.toDate}
                    revalidate={revalidate}
                />
            </HStack>
            <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />

            {euresAndreGodkjenninger && <EuresDeleInfoBox />}
        </CvModalForm>
    );
}
