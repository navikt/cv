import { BodyShort, Checkbox, CheckboxGroup, HStack, Select, Textarea, TextField, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { UtdanningsnivåEnum } from "@/app/_common/enums/cvEnums";
import { useEffect, useRef, useState } from "react";
import { DatovelgerWithoutValidation } from "@/app/(minCV)/_components/datovelger/DatovelgerWithoutValidation";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { dateStringSchema, handleZodValidation } from "@/app/_common/utils/validationHelper";
import z from "zod";

export function UtdanningModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [nusKode, setNusKode] = useState("");
    const [pågår, setPågår] = useState([]);
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [errors, setErrors] = useState({});
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
    const modalFormRef = useRef();

    useEffect(() => {
        if (gjeldendeElement) {
            setPågår(gjeldendeElement.ongoing ? ["true"] : []);
            setNusKode(gjeldendeElement.nuskode);
        }
    }, [gjeldendeElement]);

    const UtdanningSchema = z.object({
        institution: z.string().optional(),
        field: z.string().optional(),
        nuskode: z.string().min(1, "Utdanningsnivå mangler"),
        hasAuthorization: z.string().optional(),
        startDate: dateStringSchema.refine((data) => data <= new Date(), { message: "Dato kan ikke være frem i tid" }),
        ongoing: z.boolean().optional(),
        description: z.string().optional(),
    });

    const UtdanningSchemaWithEndDate = UtdanningSchema.extend({
        endDate: dateStringSchema,
    }).refine((data) => data.endDate >= data.startDate, {
        path: ["endDate"],
        message: "Til dato må være etter fra dato",
    });

    const getFormData = (target) => {
        const formData = new FormData(target);

        const data = {
            ...Object.fromEntries(formData),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
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
            // Validate with end date if not ongoing
            schema: data.ongoing ? UtdanningSchema : UtdanningSchemaWithEndDate,
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
                // Validate with end date if not ongoing
                schema: data.ongoing ? UtdanningSchema : UtdanningSchemaWithEndDate,
            });
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til utdanning"
            icon={<HStack className={[styles.iconUtdanningerBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            ref={modalFormRef}
        >
            <Select
                id="nuskode"
                name="nuskode"
                label={
                    <HStack gap="2">
                        <BodyShort weight="semibold">Utdanningsnivå</BodyShort>
                        <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                    </HStack>
                }
                value={nusKode}
                description="Hvilken type utdanning har du gått?"
                className={styles.mb6}
                error={errors?.nuskode}
                onChange={(e) => {
                    setNusKode(e.target.value);
                }}
                onBlur={revalidate}
            >
                <option value="">Velg</option>
                {Object.keys(UtdanningsnivåEnum).map((nuskode) => (
                    <option key={nuskode} value={nuskode}>
                        {UtdanningsnivåEnum[nuskode]}
                    </option>
                ))}
            </Select>
            <TextField
                label="Grad og utdanningsretning"
                id="field"
                name="field"
                description="Eksempel: elektrofag, bachelor i historie"
                className={styles.mb6}
                defaultValue={gjeldendeElement?.field}
            />
            <TextField
                id="institution"
                name="institution"
                label="Skole/studiested"
                description="Eksempel: Drammen videregående, Universitetet i Tromsø"
                className={styles.mb6}
                defaultValue={gjeldendeElement?.institution}
            />
            <Textarea
                id="description"
                name="description"
                label="Beskriv utdanningen"
                description="Eksempel: Studieretning eller fag du har fordypet deg i"
                className={styles.mb6}
                defaultValue={gjeldendeElement?.description}
            />
            <CheckboxGroup
                id="ongoing"
                legend="Utdanning jeg tar nå"
                className={styles.mb6}
                value={pågår}
                onChange={setPågår}
            >
                <Checkbox name="ongoing" value="true">
                    Utdanning jeg tar nå
                </Checkbox>
            </CheckboxGroup>

            <HStack gap="8">
                <DatovelgerWithoutValidation
                    id="startDate"
                    name="startDate"
                    label={
                        <VStack>
                            <BodyShort weight="semibold">Fra dato</BodyShort>
                            <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                        </VStack>
                    }
                    defaultSelected={gjeldendeElement?.startDate}
                    error={errors?.startDate}
                    revalidate={revalidate}
                />
                {!pågår.includes("true") && (
                    <DatovelgerWithoutValidation
                        id="endDate"
                        name="endDate"
                        label={
                            <VStack>
                                <BodyShort weight="semibold">Til dato</BodyShort>
                                <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                            </VStack>
                        }
                        defaultSelected={gjeldendeElement?.endDate}
                        error={errors?.endDate}
                        revalidate={revalidate}
                    />
                )}
            </HStack>
            <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
        </CvModalForm>
    );
}
