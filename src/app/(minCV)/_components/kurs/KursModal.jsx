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
            date: dateStringSchema
                .optional()
                .refine((date) => date <= new Date(), { message: "Dato kan ikke være frem i tid" }),
            durationUnit: z.enum([...Object.keys(TidsenhetEnum), ""]).optional(),
            duration: z
                .string()
                .optional()
                .refine((val) => !val.isNaN && parseInt(val, 10) > 0, {
                    message: "Varighet må være et positivt tall",
                })
                .optional(),
        })
        .refine((data) => !(data.durationUnit && data.durationUnit !== "UKJENT" && !data.duration), {
            path: ["duration"],
            message: "Du må fylle ut varighet hvis tidsenhet er valgt",
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

        handleZodValidation({
            onError: setErrors,
            data,
            onSuccess: (res) => {
                lagreElement({
                    ...res,
                });
            },
            schema: KursSchema,
        });
    };

    const revalidate = () => {
        if (hasTriedSubmit) {
            setShouldAutoFocusErrors(false);
            const data = getFormData(modalFormRef.current);
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
                label="Fullført"
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
                                <HStack gap="2">
                                    <BodyShort weight="semibold">Antall {formatterTidsenhet(tidsenhet, 2)}</BodyShort>
                                    <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                                </HStack>
                            }
                            inputMode="numeric"
                            type="number"
                            min="1"
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
