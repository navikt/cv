import { Checkbox, CheckboxGroup, HStack, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { AnsettelsesformEnum, ArbeidstidEnum, OmfangEnum, StarttidspunktEnum } from "@/app/_common/enums/cvEnums";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { handleZodValidation, revalidate } from "@/app/_common/utils/validationHelper";
import z from "zod";

export function JobbonskerModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [errors, setErrors] = useState({});
    const [yrker, setYrker] = useState([]);
    const [lokasjoner, setLokasjoner] = useState([]);
    const [omfang, setOmfang] = useState([]);
    const [ansettelsesform, setAnsettelsesform] = useState([]);
    const [arbeidstid, setArbeidstid] = useState([]);
    const [starttidspunkt, setStarttidspunkt] = useState("");
    const [yrkerError, setYrkerError] = useState(false);
    const [lokasjonerError, setLokasjonerError] = useState(false);

    useEffect(() => {
        const oppdaterJobbønsker = (jobbønsker) => {
            setYrker(jobbønsker?.occupations || []);
            setLokasjoner(jobbønsker?.locations || []);
            // setOmfang(jobbønsker?.workLoadTypes || []);
            // setAnsettelsesform(jobbønsker?.occupationTypes || []);
            // setArbeidstid(jobbønsker?.workScheduleTypes || []);
            // setStarttidspunkt(jobbønsker?.startOption || "ETTER_TRE_MND");
        };

        oppdaterJobbønsker(gjeldendeElement);
    }, [gjeldendeElement]);

    const JobbonskerSchema = z.object({
        occupations: z.string().min(1, "Du må legge til jobbønsker"),
        locations: z.string().min(1, "Du må legge til steder"),
        workLoadTypes: z.string().optional(),
        occupationTypes: z.string().optional(),
        workScheduleTypes: z.string().optional(),
        startOption: z.string().optional(),
    });

    // const lagre = (e) => {
    //     const data = Object.fromEntries(new FormData(e.currentTarget));
    //     setShouldAutoFocusErrors(true);

    //     handleZodValidation({
    //         onError: setErrors,
    //         data: data,
    //         onSuccess: (res) => {
    //             lagrePersonalia({
    //                 fornavn: res.fornavn,
    //                 etternavn: res.etternavn,
    //                 epost: res.epost,
    //                 telefonnummer: res.telefonnummer,
    //                 adresse: res.adresse,
    //                 postnummer: res.postnummer,
    //                 poststed: res.poststed,
    //             });
    //         },
    //         schema: PersonaliaSchema,
    //     });
    // };

    const lagre = (e) => {
        const formData = new FormData(e.currentTarget);

        formData.append("occupations", JSON.stringify(yrker));
        formData.append("locations", JSON.stringify(lokasjoner));
        const data = Object.fromEntries(
            Array.from(formData.keys()).map((key) => [
                key,
                formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key),
            ]),
        );

        setShouldAutoFocusErrors(true);

        handleZodValidation({
            onError: setErrors,
            data: data,
            onSuccess: (res) => {
                lagreElement({
                    ...gjeldendeElement,
                    occupations: yrker,
                    locations: lokasjoner,
                    workLoadTypes: omfang,
                    occupationTypes: ansettelsesform,
                    workScheduleTypes: arbeidstid,
                    startOption: starttidspunkt,
                });
            },
            schema: JobbonskerSchema,
        });

        // if (yrker.length === 0) setYrkerError(true);
        // if (lokasjoner.length === 0) setLokasjonerError(true);

        // if (yrker.length !== 0 && lokasjoner.length !== 0) {
        //     lagreElement({
        //         ...gjeldendeElement,
        //         occupations: yrker,
        //         locations: lokasjoner,
        //         workLoadTypes: omfang,
        //         occupationTypes: ansettelsesform,
        //         workScheduleTypes: arbeidstid,
        //         startOption: starttidspunkt,
        //     });
        // }
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
        setYrkerError(false);
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
        setLokasjonerError(false);
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til jobbønsker"
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
        >
            <VStack justify="space-between">
                <Typeahead
                    className={styles.mb6}
                    label="Jobber og yrker"
                    description="Må fylles ut"
                    type={TypeaheadEnum.STILLING}
                    oppdaterValg={oppdaterYrker}
                    valgtVerdi={yrker}
                    multiselect
                    placeholder="Søk og legg til yrker"
                    multiselectText="Yrker"
                    error={yrkerError && "Du må legge til jobbønsker"}
                />
                <Typeahead
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
                    error={lokasjonerError && "Du må legge til steder"}
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
                defaultValue={gjeldendeElement.startOption}
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
