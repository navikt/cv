import { BodyShort, Checkbox, CheckboxGroup, HStack, Textarea, TextField, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useRef, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { DatovelgerWithoutValidation } from "@/app/(minCV)/_components/datovelger/DatovelgerWithoutValidation";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { dateStringSchema, handleZodValidation, revalidateExplicitValue } from "@/app/_common/utils/validationHelper";
import z from "zod";

export function ArbeidsforholdModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [pågår, setPågår] = useState([]);
    const [stillingstittel, setStillingstittel] = useState(gjeldendeElement?.jobTitle || "");
    const [konseptId, setKonseptId] = useState("");
    const [styrk, setStyrk] = useState("");
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [errors, setErrors] = useState({});
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
    const modalFormRef = useRef();

    useEffect(() => {
        const oppdaterArbeidsforhold = (arbeidsforhold) => {
            setStillingstittel(arbeidsforhold?.jobTitle || "");
            setKonseptId(arbeidsforhold?.conceptId || "");
            setStyrk(arbeidsforhold?.styrkkode || "");
            setPågår(arbeidsforhold?.ongoing ? ["true"] : []);
        };

        oppdaterArbeidsforhold(gjeldendeElement);
    }, [gjeldendeElement]);

    const ArbeidsforholdSchema = z.object({
        employer: z.string().optional(),
        jobTitle: z.string().min(1, "Stilling eller yrke må fylles ut"),
        conceptId: z.coerce.string().optional(),
        styrkkode: z.coerce.string().optional(),
        alternativeJobTitle: z.string().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
        fromDate: dateStringSchema.refine((data) => data <= new Date(), { message: "Dato kan ikke være frem i tid" }),
        ongoing: z.boolean().optional(),
    });

    const ArbeidsforholdSchemaWithEndDate = ArbeidsforholdSchema.extend({
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
            toDate: formData.get("toDate"),
            ongoing: formData.get("ongoing") === "true",
            jobTitle: stillingstittel,
            conceptId: konseptId,
            styrkkode: styrk,
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
            schema: data.ongoing ? ArbeidsforholdSchema : ArbeidsforholdSchemaWithEndDate,
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
                schema: data.ongoing ? ArbeidsforholdSchema : ArbeidsforholdSchemaWithEndDate,
            });
        }
    };

    const setStillingTypeahead = (stilling, erValgt) => {
        setStillingstittel(erValgt ? stilling.label : "");
        setKonseptId(erValgt ? stilling.konseptId : "");
        setStyrk(erValgt ? stilling.styrk08 : "");
        if (hasTriedSubmit) {
            revalidateExplicitValue("jobTitle", stilling?.label, ArbeidsforholdSchema, errors, setErrors);
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til arbeidsforhold"
            icon={<HStack as="span" className={[styles.iconArbeidsforholdBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            ref={modalFormRef}
        >
            <Typeahead
                id="jobTitle"
                name="jobTitle"
                className={styles.mb6}
                label="Stilling eller yrke"
                description="Må fylles ut"
                type={TypeaheadEnum.STILLING}
                oppdaterValg={setStillingTypeahead}
                valgtVerdi={stillingstittel}
                error={errors?.jobTitle}
            />
            <TextField
                id="alternativeJobTitle"
                name="alternativeJobTitle"
                label="Alternativ tittel"
                description="Dersom ditt yrke ikke står i listen"
                className={styles.mb6}
                defaultValue={gjeldendeElement?.alternativeJobTitle}
            />

            <HStack justify="space-between">
                <div className={styles.element}>
                    <TextField
                        id="employer"
                        name="employer"
                        label="Bedrift"
                        className={styles.mb6}
                        defaultValue={gjeldendeElement?.employer}
                    />
                </div>
                <div className={styles.element}>
                    <TextField
                        id="location"
                        name="location"
                        label="Sted"
                        className={styles.mb6}
                        defaultValue={gjeldendeElement?.location}
                    />
                </div>
            </HStack>
            <Textarea
                id="description"
                name="description"
                label="Arbeidsoppgaver"
                description="Skriv litt om rollen din og de viktigste oppgavene dine"
                className={styles.mb6}
                defaultValue={gjeldendeElement?.description}
            />
            <CheckboxGroup
                id="ongoing"
                legend="Jeg har denne jobben nå"
                className={styles.mb6}
                value={pågår}
                onChange={setPågår}
            >
                <Checkbox name="ongoing" value="true">
                    Jeg har denne jobben nå
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
                    revalidate={revalidate}
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
                        revalidate={revalidate}
                    />
                )}
            </HStack>
            <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
        </CvModalForm>
    );
}
