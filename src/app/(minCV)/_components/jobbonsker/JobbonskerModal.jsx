import { Button, Checkbox, CheckboxGroup, Heading, HStack, Modal, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { AnsettelsesformEnum, ArbeidstidEnum, OmfangEnum, StarttidspunktEnum } from "@/app/_common/enums/cvEnums";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";

export const JobbonskerModal = ({ modalÅpen, toggleModal, jobbønsker, lagreJobbønsker }) => {
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
            setOmfang(jobbønsker?.workLoadTypes || []);
            setAnsettelsesform(jobbønsker?.occupationTypes || []);
            setArbeidstid(jobbønsker?.workScheduleTypes || []);
            setStarttidspunkt(jobbønsker?.startOption || "ETTER_TRE_MND");
        };

        oppdaterJobbønsker(jobbønsker);
    }, [jobbønsker]);

    const lagre = () => {
        if (yrker.length === 0) setYrkerError(true);
        if (lokasjoner.length === 0) setLokasjonerError(true);

        if (yrker.length !== 0 && lokasjoner.length !== 0) {
            lagreJobbønsker({
                ...jobbønsker,
                occupations: yrker,
                locations: lokasjoner,
                workLoadTypes: omfang,
                occupationTypes: ansettelsesform,
                workScheduleTypes: arbeidstid,
                startOption: starttidspunkt,
            });
        }
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
        <Modal open={modalÅpen} aria-label="Legg til jobbønske" onClose={() => toggleModal(false)} width="medium">
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    <HStack gap="1" align="center">
                        Legg til Jobbønsker
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }}>
                <VStack justify="space-between">
                    <Typeahead
                        className={styles.mb6}
                        label="Jobber og yrker"
                        description="Må fylles ut"
                        type={TypeaheadEnum.STILLING}
                        oppdaterValg={oppdaterYrker}
                        valgtVerdi={yrker}
                        multiselect={true}
                        placeholder={"Søk og legg til yrker"}
                        multiselectText={"Yrker"}
                        error={yrkerError && "Du må legge til jobbønsker"}
                    />
                    <Typeahead
                        className={styles.mb6}
                        label="Hvor kan du jobbe"
                        description="Må fylles ut"
                        type={TypeaheadEnum.STED}
                        oppdaterValg={oppdaterLokasjoner}
                        valgtVerdi={lokasjoner}
                        visningsfelt={"location"}
                        multiselect={true}
                        placeholder={"Søk og legg til steder"}
                        multiselectText={"Steder"}
                        error={lokasjonerError && "Du må legge til steder"}
                    />
                </VStack>
                <CheckboxGroup
                    className={styles.mb6}
                    onChange={setOmfang}
                    value={omfang}
                    legend="Vil du jobbe heltid eller deltid?"
                >
                    <HStack gap="4">
                        {Object.keys(OmfangEnum).map((key) => (
                            <Checkbox value={key} key={key}>
                                {OmfangEnum[key]}
                            </Checkbox>
                        ))}
                    </HStack>
                </CheckboxGroup>
                <CheckboxGroup
                    className={styles.mb6}
                    onChange={setArbeidstid}
                    value={arbeidstid}
                    legend="Når kan du jobbe?"
                >
                    <HStack>
                        {Object.keys(ArbeidstidEnum).map((verdi) => (
                            <Checkbox className={styles.checkbox} key={verdi} value={verdi}>
                                {ArbeidstidEnum[verdi]}
                            </Checkbox>
                        ))}
                    </HStack>
                </CheckboxGroup>
                <CheckboxGroup
                    className={styles.mb6}
                    onChange={setAnsettelsesform}
                    value={ansettelsesform}
                    legend="Hva slags ansettelse ønsker du?"
                >
                    <HStack>
                        {Object.keys(AnsettelsesformEnum).map((verdi) => (
                            <Checkbox className={styles.checkbox} key={verdi} value={verdi}>
                                {AnsettelsesformEnum[verdi]}
                            </Checkbox>
                        ))}
                    </HStack>
                </CheckboxGroup>
                <RadioGroup legend="Når kan du begynne i ny jobb?" onChange={setStarttidspunkt} value={starttidspunkt}>
                    <HStack>
                        {Object.keys(StarttidspunktEnum).map((verdi) => (
                            <Radio className={styles.checkbox} key={verdi} value={verdi}>
                                {StarttidspunktEnum[verdi]}
                            </Radio>
                        ))}
                    </HStack>
                </RadioGroup>
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button variant="secondary" onClick={() => toggleModal(false)}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={lagre}>
                        Lagre
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
};
