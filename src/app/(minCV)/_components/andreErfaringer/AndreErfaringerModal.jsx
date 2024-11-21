import { BodyShort, Checkbox, CheckboxGroup, HStack, TextField, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useRef, useState } from "react";
import { DatovelgerWithoutValidation } from "@/app/(minCV)/_components/datovelger/DatovelgerWithoutValidation";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { dateStringSchema, handleZodValidation } from "@/app/_common/utils/validationHelper";
import z from "zod";

export function AndreErfaringerModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [pågår, setPågår] = useState([]);
    const [errors, setErrors] = useState({});
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
    const modalFormRef = useRef();

    useEffect(() => {
        if (gjeldendeElement) {
            setPågår(gjeldendeElement.ongoing ? ["true"] : []);
        }
    }, [gjeldendeElement]);

    const ErfaringSchema = z.object({
        role: z.string().min(1, "Rolle må fylles ut"),
        description: z.string().optional(),
        fromDate: dateStringSchema.refine((data) => data <= new Date(), { message: "Dato kan ikke være frem i tid" }),
        ongoing: z.boolean().optional(),
    });

    const ErfaringSchemaWithEndDate = ErfaringSchema.extend({
        toDate: dateStringSchema,
    }).refine((data) => data.toDate >= data.fromDate, {
        path: ["toDate"],
        message: "Til dato må være etter fra dato",
    });

    const getFormData = (target) => {
        const formData = new FormData(target);

        const data = {
            ...Object.fromEntries(formData),
            fromDate: formData.get("fromDate"),
            toDate: formData.get("toDate") || undefined,
            ongoing: formData.get("ongoing") === "true",
        };

        return data;
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
            schema: data.ongoing ? ErfaringSchema : ErfaringSchemaWithEndDate,
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
                schema: data.ongoing ? ErfaringSchema : ErfaringSchemaWithEndDate,
            });
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til annen erfaring"
            icon={<HStack className={[styles.iconAndreErfaringerBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            ref={modalFormRef}
        >
            <TextField
                id="role"
                name="role"
                label={
                    <HStack gap="2">
                        <BodyShort weight="semibold">Rolle</BodyShort>
                        <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                    </HStack>
                }
                description="Eksempel: militærtjeneste, styreverv eller fotballtrener"
                className={styles.mb6}
                defaultValue={gjeldendeElement?.role}
                error={errors?.role}
                onBlur={revalidate}
            />
            <TextField
                id="description"
                name="description"
                label="Beskrivelse"
                description="Eksempel: 5 års erfaring som fotballtrener for guttelag i Oslo"
                className={styles.mb6}
                defaultValue={gjeldendeElement?.description}
            />
            <CheckboxGroup id="ongoing" legend="" className={styles.mb6} value={pågår} onChange={setPågår}>
                <Checkbox name="ongoing" value="true">
                    Pågår
                </Checkbox>
            </CheckboxGroup>

            <HStack gap="8">
                <DatovelgerWithoutValidation
                    id="fromDate"
                    name="fromDate"
                    label={
                        <VStack>
                            <BodyShort weight="semibold">Fra dato</BodyShort>
                            <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                        </VStack>
                    }
                    defaultSelected={gjeldendeElement?.fromDate}
                    error={errors?.fromDate}
                    onBlur={revalidate}
                />
                {!pågår.includes("true") && (
                    <DatovelgerWithoutValidation
                        id="toDate"
                        name="toDate"
                        label={
                            <VStack>
                                <BodyShort weight="semibold">Til dato</BodyShort>
                                <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                            </VStack>
                        }
                        defaultSelected={gjeldendeElement?.toDate}
                        error={errors?.toDate}
                        onBlur={revalidate}
                    />
                )}
            </HStack>
            <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
        </CvModalForm>
    );
}
