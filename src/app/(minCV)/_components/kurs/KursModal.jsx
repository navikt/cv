import { BodyShort, HStack, Select, TextField, VStack } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/page.module.css";
import { DatovelgerWithoutValidation } from "@/app/(minCV)/_components/datovelger/DatovelgerWithoutValidation";
import { TidsenhetEnum } from "@/app/_common/enums/cvEnums";
import { formatterTidsenhet, storForbokstav } from "@/app/_common/utils/stringUtils";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { handleZodValidation, dateStringSchema } from "@/app/_common/utils/validationHelper";
import z from "zod";

export default function KursModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [errors, setErrors] = useState({});
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
    const [tidsenhet, setTidsenhet] = useState(gjeldendeElement?.durationUnit || "");
    const modalFormRef = useRef();

    useEffect(() => {
        if (gjeldendeElement) {
            setTidsenhet(gjeldendeElement?.durationUnit || "");
        }
    }, [gjeldendeElement]);

    const KursSchema = z
        .object({
            title: z.string().min(1, "Du må skrive inn kursnavn"),
            issuer: z.string().optional(),
            durationUnit: z.enum([...Object.keys(TidsenhetEnum), ""]).optional(),
            duration: z.coerce
                .number()
                .int({ message: `Antall ${formatterTidsenhet(tidsenhet, 2)} er ikke gyldig` })
                .optional()
                .refine((val) => !val.isNaN && parseInt(val, 10) > 0, {
                    message: `Antall ${formatterTidsenhet(tidsenhet, 2)} er ikke gyldig`,
                })
                .optional(),
        })
        .refine((data) => !(data.durationUnit && data.durationUnit !== "UKJENT" && !data.duration), {
            path: ["duration"],
            message: `Antall ${formatterTidsenhet(tidsenhet, 2)} er ikke gyldig`,
        });

    const KursSchemaWithDate = z
        .object({
            title: z.string().min(1, "Du må skrive inn kursnavn"),
            issuer: z.string().optional(),
            date: dateStringSchema("Fullført")
                .optional()
                .refine((date) => date <= new Date(), { message: "Fullført kan ikke være frem i tid" }),
            durationUnit: z.enum([...Object.keys(TidsenhetEnum), ""]).optional(),
            duration: z.coerce
                .number()
                .int({ message: `Antall ${formatterTidsenhet(tidsenhet, 2)} er ikke gyldig` })
                .optional()
                .refine((val) => !val.isNaN && parseInt(val, 10) > 0, {
                    message: `Antall ${formatterTidsenhet(tidsenhet, 2)} er ikke gyldig`,
                })
                .optional(),
        })
        .refine((data) => !(data.durationUnit && data.durationUnit !== "UKJENT" && !data.duration), {
            path: ["duration"],
            message: `Antall ${formatterTidsenhet(tidsenhet, 2)} er ikke gyldig`,
        });

    const getFormData = (target) => {
        const formData = new FormData(target);

        const data = {
            ...Object.fromEntries(formData),
            durationUnit: formData.get("durationUnit") || undefined,
        };

        return data;
    };

    const lagre = (e) => {
        setShouldAutoFocusErrors(true);
        setHasTriedSubmit(true);

        const data = getFormData(e.currentTarget);
        const hasDate = data.date !== "";

        handleZodValidation({
            onError: setErrors,
            data,
            onSuccess: (res) => {
                lagreElement({
                    ...res,
                });
            },
            schema: hasDate ? KursSchemaWithDate : KursSchema,
        });
    };

    const revalidate = () => {
        if (hasTriedSubmit) {
            setShouldAutoFocusErrors(false);
            const formData = getFormData(modalFormRef.current);
            // Handle duration value based on selected duration unit for revalidation
            const data = {
                ...formData,
                duration:
                    formData.durationUnit && formData.durationUnit !== "UKJENT"
                        ? formData.duration || gjeldendeElement?.duration?.toString()
                        : undefined,
            };
            handleZodValidation({
                onError: setErrors,
                data,
                onSuccess: () => setErrors({}),
                schema: KursSchema,
            });
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til kurs"
            icon={<HStack as="span" className={[styles.iconKursBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            ref={modalFormRef}
        >
            <TextField
                id="title"
                name="title"
                className={styles.mb6}
                label="Kursnavn"
                description="Må fylles ut"
                defaultValue={gjeldendeElement?.title}
                error={errors?.title}
                onBlur={revalidate}
            />
            <TextField
                id="issuer"
                name="issuer"
                className={styles.mb6}
                label="Kursholder"
                description=""
                defaultValue={gjeldendeElement?.issuer}
                error={errors?.issuer}
            />
            <DatovelgerWithoutValidation
                id="date"
                name="date"
                defaultSelected={gjeldendeElement?.date}
                label={
                    <>
                        Fullført<span className={styles.visuallyhidden}> dato</span>
                    </>
                }
                className={styles.mb6}
                error={errors?.date}
                revalidate={revalidate}
            />
            <HStack gap="8">
                <VStack>
                    <Select
                        id="durationUnit"
                        name="durationUnit"
                        label="Kurslengde"
                        className={styles.mb6}
                        value={tidsenhet}
                        onChange={(e) => {
                            setTidsenhet(e.target.value);
                            revalidate();
                        }}
                        error={errors?.durationUnit}
                    >
                        <option value="">Velg</option>
                        {Object.keys(TidsenhetEnum).map((enhet) => (
                            <option key={enhet} value={enhet}>
                                {storForbokstav(formatterTidsenhet(enhet, 2))}
                            </option>
                        ))}
                    </Select>
                </VStack>
                {tidsenhet && tidsenhet !== "UKJENT" && (
                    <VStack>
                        <TextField
                            id="duration"
                            name="duration"
                            className={styles.mb6}
                            label={
                                <HStack gap="2" key={tidsenhet}>
                                    <BodyShort weight="semibold">Antall {formatterTidsenhet(tidsenhet, 2)}</BodyShort>
                                    <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                                </HStack>
                            }
                            inputMode="numeric"
                            type="number"
                            step="any"
                            defaultValue={gjeldendeElement?.duration}
                            error={errors?.duration}
                            onBlur={revalidate}
                        />
                    </VStack>
                )}
            </HStack>
            <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
        </CvModalForm>
    );
}
