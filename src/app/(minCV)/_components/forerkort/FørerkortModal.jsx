import { BodyShort, HStack, Select, VStack } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/page.module.css";
import førerkortData from "@/app/_common/data/førerkort.json";
import { DatovelgerWithoutValidation } from "@/app/(minCV)/_components/datovelger/DatovelgerWithoutValidation";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { dateStringSchema, handleZodValidation } from "@/app/_common/utils/validationHelper";
import z from "zod";

export default function FørerkortModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [errors, setErrors] = useState({});
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [valgtFørerkort, setValgtFørerkort] = useState(gjeldendeElement || null);
    const [kreverDato, setKreverDato] = useState(!!gjeldendeElement?.acquiredDate);
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
    const modalFormRef = useRef();
    const selectRef = useRef();

    const { gyldigeFørerkort } = førerkortData;

    useEffect(() => {
        if (gjeldendeElement) {
            setValgtFørerkort(gjeldendeElement);
            const funnetFørerkort = gyldigeFørerkort.find((e) => e.type === gjeldendeElement.type);
            setKreverDato(funnetFørerkort?.kreverDato || false);
        }
    }, [gjeldendeElement]);

    const velgFørerkort = (verdi) => {
        const funnetFørerkort = gyldigeFørerkort.find((e) => e.type === verdi);
        setValgtFørerkort(funnetFørerkort);
        setKreverDato(funnetFørerkort?.kreverDato || false);
    };

    const driverLicenseSchema = z.object({
        type: z.string().min(1, "Du må velge førerkort"),
    });

    const driverLicenseSchemaWithDates = driverLicenseSchema
        .extend({
            acquiredDate: dateStringSchema("Gyldig fra").refine((data) => data <= new Date(), {
                message: "Gyldig fra kan ikke være frem i tid",
            }),
            expiryDate: dateStringSchema("Gyldig til"),
        })
        .refine((data) => data.expiryDate >= data.acquiredDate, {
            path: ["expiryDate"],
            message: "Til dato må være etter fra dato",
        });

    const getFormData = (target) => {
        const formData = new FormData(target);

        const data = {
            type: valgtFørerkort?.label || valgtFørerkort?.type || "",
            acquiredDate: kreverDato && formData.get("acquiredDate") ? formData.get("acquiredDate") : undefined,
            expiryDate: kreverDato && formData.get("expiryDate") ? formData.get("expiryDate") : undefined,
        };

        return data;
    };

    const lagre = (e) => {
        setShouldAutoFocusErrors(true);
        setHasTriedSubmit(true);
        const data = getFormData(e.currentTarget);

        handleZodValidation({
            onError: (err) => {
                //  If no date needed for drivers license, set focus to <select> on error
                if (!kreverDato) {
                    selectRef.current.focus();
                }
                setErrors(err);
            },
            data: data,
            onSuccess: (res) => {
                lagreElement({
                    ...res,
                });
            },
            schema: kreverDato ? driverLicenseSchemaWithDates : driverLicenseSchema,
        });
    };

    const revalidate = () => {
        if (hasTriedSubmit) {
            setShouldAutoFocusErrors(false);
            const data = getFormData(modalFormRef.current);

            handleZodValidation({
                onError: setErrors,
                data: data,
                onSuccess: () => {
                    setErrors({});
                },
                schema: kreverDato ? driverLicenseSchemaWithDates : driverLicenseSchema,
            });
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til førerkort"
            feilet={feilet}
            icon={<HStack as="span" className={[styles.iconForerkortBig, styles.modalIcon]} aria-hidden="true" />}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            ref={modalFormRef}
        >
            <VStack>
                <Select
                    id="type"
                    name="type"
                    label="Førerkort"
                    description="Må fylles ut"
                    className={styles.mb6}
                    value={valgtFørerkort?.type || ""}
                    onChange={(e) => velgFørerkort(e.target.value)}
                    onBlur={revalidate}
                    error={errors?.type}
                    ref={selectRef}
                >
                    <option value={null}>Velg</option>
                    {gyldigeFørerkort.map((e) => (
                        <option key={e.type} value={e.type}>
                            {e.type}
                        </option>
                    ))}
                </Select>
                {kreverDato && (
                    <>
                        <HStack gap="12">
                            <DatovelgerWithoutValidation
                                id="acquiredDate"
                                name="acquiredDate"
                                defaultSelected={gjeldendeElement?.acquiredDate}
                                label={
                                    <VStack>
                                        <BodyShort weight="semibold">Gyldig fra</BodyShort>
                                        <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                                    </VStack>
                                }
                                revalidate={revalidate}
                                error={errors?.acquiredDate}
                            />
                            <DatovelgerWithoutValidation
                                id="expiryDate"
                                name="expiryDate"
                                defaultSelected={gjeldendeElement?.expiryDate}
                                label={
                                    <VStack>
                                        <BodyShort weight="semibold">Gyldig til</BodyShort>
                                        <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                                    </VStack>
                                }
                                fremtid
                                revalidate={revalidate}
                                error={errors?.expiryDate}
                            />
                        </HStack>
                        <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
                    </>
                )}
            </VStack>
        </CvModalForm>
    );
}
