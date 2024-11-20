import { Checkbox, CheckboxGroup, HStack, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { AnsettelsesformEnum, ArbeidstidEnum, OmfangEnum, StarttidspunktEnum } from "@/app/_common/enums/cvEnums";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { handleZodValidation, revalidateExplicitValue } from "@/app/_common/utils/validationHelper";
import z from "zod";

export function JobbonskerModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [errors, setErrors] = useState({});
    const [yrker, setYrker] = useState([]);
    const [lokasjoner, setLokasjoner] = useState([]);

    useEffect(() => {
        const oppdaterJobbønsker = (jobbønsker) => {
            setYrker(jobbønsker?.occupations || []);
            setLokasjoner(jobbønsker?.locations || []);
        };

        oppdaterJobbønsker(gjeldendeElement);
    }, []);

    const JobbonskerSchema = z.object({
        occupations: z.object({}).passthrough().array().min(1, "Du må legge til jobbønsker"),
        locations: z.object({}).passthrough().array().min(1, "Du må legge til steder"),
        workLoadTypes: z.string().array().optional(),
        occupationTypes: z.string().array().optional(),
        workScheduleTypes: z.string().array().optional(),
        startOption: z.string().optional(),
    });

    const lagre = (e) => {
        const formData = new FormData(e.currentTarget);

        const data = {
            ...Object.fromEntries(formData),
            workLoadTypes: formData.getAll("workLoadTypes"),
            occupationTypes: formData.getAll("occupationTypes"),
            workScheduleTypes: formData.getAll("workScheduleTypes"),
            occupations: yrker,
            locations: lokasjoner,
        };

        setShouldAutoFocusErrors(true);

        handleZodValidation({
            onError: setErrors,
            data: data,
            onSuccess: (res) => {
                lagreElement({
                    occupations: res.occupations,
                    locations: res.locations,
                    workLoadTypes: res.workLoadTypes,
                    occupationTypes: res.occupationTypes,
                    workScheduleTypes: res.workScheduleTypes,
                    startOption: res.startOption,
                });
            },
            schema: JobbonskerSchema,
        });
    };

    const oppdaterYrker = (yrke, erValgt) => {
        const oppdaterteYrker = [...yrker];
        if (erValgt) {
            oppdaterteYrker.push(yrke);
        } else {
            const eksisterendeIndex = oppdaterteYrker.findIndex((e) => e.title === yrke.title);
            oppdaterteYrker.splice(eksisterendeIndex, 1);
        }
        setYrker(oppdaterteYrker);
        setShouldAutoFocusErrors(false);
        revalidateExplicitValue("occupations", oppdaterteYrker, JobbonskerSchema, errors, setErrors);
    };

    const oppdaterLokasjoner = (lokasjon, erValgt) => {
        const oppdaterteLokasjoner = [...lokasjoner];
        if (erValgt) {
            oppdaterteLokasjoner.push(lokasjon);
        } else {
            const eksisterendeIndex = oppdaterteLokasjoner.findIndex((e) => e.location === lokasjon.location);
            oppdaterteLokasjoner.splice(eksisterendeIndex, 1);
        }
        setLokasjoner(oppdaterteLokasjoner);
        setShouldAutoFocusErrors(false);
        revalidateExplicitValue("locations", oppdaterteLokasjoner, JobbonskerSchema, errors, setErrors);
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til jobbønsker"
            icon={<HStack className={[styles.iconJobbonskerBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
        >
            <VStack justify="space-between">
                <Typeahead
                    id="occupations"
                    className={styles.mb6}
                    label="Jobber og yrker"
                    description="Må fylles ut"
                    type={TypeaheadEnum.STILLING}
                    oppdaterValg={oppdaterYrker}
                    valgtVerdi={yrker}
                    multiselect
                    placeholder="Søk og legg til yrker"
                    multiselectText="Yrker"
                    error={errors?.occupations}
                />
                <Typeahead
                    id="locations"
                    className={styles.mb6}
                    label="Hvor kan du jobbe"
                    description="Må fylles ut"
                    type={TypeaheadEnum.STED}
                    oppdaterValg={oppdaterLokasjoner}
                    valgtVerdi={lokasjoner}
                    visningsfelt="location"
                    multiselect
                    placeholder="Søk og legg til steder"
                    multiselectText="Steder"
                    error={errors?.locations}
                />
            </VStack>
            <CheckboxGroup
                id="workLoadTypes"
                className={styles.mb6}
                defaultValue={gjeldendeElement.workLoadTypes}
                legend="Vil du jobbe heltid eller deltid?"
            >
                <HStack gap="4">
                    {Object.keys(OmfangEnum).map((key) => (
                        <Checkbox name="workLoadTypes" value={key} key={key}>
                            {OmfangEnum[key]}
                        </Checkbox>
                    ))}
                </HStack>
            </CheckboxGroup>
            <CheckboxGroup
                id="workScheduleTypes"
                className={styles.mb6}
                defaultValue={gjeldendeElement.workScheduleTypes}
                legend="Når kan du jobbe?"
            >
                <HStack>
                    {Object.keys(ArbeidstidEnum).map((verdi) => (
                        <Checkbox name="workScheduleTypes" className={styles.checkbox} key={verdi} value={verdi}>
                            {ArbeidstidEnum[verdi]}
                        </Checkbox>
                    ))}
                </HStack>
            </CheckboxGroup>
            <CheckboxGroup
                id="occupationTypes"
                className={styles.mb6}
                defaultValue={gjeldendeElement.occupationTypes}
                legend="Hva slags ansettelse ønsker du?"
            >
                <HStack>
                    {Object.keys(AnsettelsesformEnum).map((verdi) => (
                        <Checkbox name="occupationTypes" className={styles.checkbox} key={verdi} value={verdi}>
                            {AnsettelsesformEnum[verdi]}
                        </Checkbox>
                    ))}
                </HStack>
            </CheckboxGroup>
            <RadioGroup
                id="startOption"
                name="startOption"
                legend="Når kan du begynne i ny jobb?"
                defaultValue={gjeldendeElement.startOption || "ETTER_TRE_MND"}
            >
                <HStack>
                    {Object.keys(StarttidspunktEnum).map((verdi) => (
                        <Radio className={styles.checkbox} key={verdi} value={verdi}>
                            {StarttidspunktEnum[verdi]}
                        </Radio>
                    ))}
                </HStack>
            </RadioGroup>
            <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
        </CvModalForm>
    );
}
