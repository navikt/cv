import { Button, Checkbox, CheckboxGroup, Heading, HStack, Modal, Textarea, TextField, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import stillingstittelMock from "../../../mocks/typeahead/stillingstittelTypeaheadMock.json";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";

export const ArbeidsforholdModal = ({ modalÅpen, toggleModal, arbeidsforhold, lagreArbeidsforhold }) => {
    const [arbeidsgiver, setArbeidsgiver] = useState("");
    const [alternativTittel, setAlternativTittel] = useState("");
    const [arbeidssted, setArbeidssted] = useState("");
    const [arbeidsoppgaver, setArbeidsoppgaver] = useState("");

    const [startdato, setStartdato] = useState(null);
    const [sluttdato, setSluttdato] = useState(null);
    const [pågår, setPågår] = useState([]);

    const [stillingstittel, setStillingstittel] = useState(arbeidsforhold?.jobTitle || "");
    const [konseptId, setKonseptId] = useState("");
    const [styrk, setStyrk] = useState("");

    useEffect(() => {
        const oppdaterArbeidsforhold = (arbeidsforhold) => {
            setArbeidsgiver(arbeidsforhold?.employer || "");
            setAlternativTittel(arbeidsforhold?.alternativeJobTitle || "");
            setArbeidssted(arbeidsforhold?.location || "");
            setArbeidsoppgaver(arbeidsforhold?.description || "");

            setStillingstittel(arbeidsforhold?.jobTitle || "");
            setKonseptId(arbeidsforhold?.conceptId || "");
            setStyrk(arbeidsforhold?.styrkkode || "");

            setStartdato(arbeidsforhold ? new Date(arbeidsforhold.fromDate) : null);
            setSluttdato(arbeidsforhold && arbeidsforhold?.toDate ? new Date(arbeidsforhold.toDate) : null);
            setPågår(arbeidsforhold && arbeidsforhold.ongoing ? [true] : []);
        };

        oppdaterArbeidsforhold(arbeidsforhold);
    }, [arbeidsforhold]);

    const lagre = () => {
        const erPågående = pågår.includes(true);
        lagreArbeidsforhold({
            ...arbeidsforhold,
            employer: arbeidsgiver,
            jobTitle: stillingstittel,
            conceptId: konseptId,
            styrkkode: styrk,
            alternativeJobTitle: alternativTittel,
            location: arbeidssted,
            description: arbeidsoppgaver,
            fromDate: startdato,
            toDate: erPågående ? null : sluttdato,
            ongoing: erPågående,
        });
    };

    const setStillingTypeahead = (stilling) => {
        setStillingstittel(stilling.label);
        setKonseptId(stilling.konseptId);
        setStyrk(stilling.styrk08);
    };

    const årspenn = Array.from({ length: 100 }, (år, index) => new Date().getFullYear() - index);

    return (
        <Modal open={modalÅpen} aria-label="Legg til arbeidsforhold" onClose={() => toggleModal(false)} width="medium">
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    <HStack gap="1" align="center">
                        Legg til Arbeidsforhold
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <HStack justify="space-between">
                    <VStack className={styles.element}>
                        <Typeahead
                            className={styles.mb6}
                            label="Stilling/yrke"
                            description="Må fylles ut"
                            mockData={stillingstittelMock}
                            oppdaterValg={setStillingTypeahead}
                            valgtVerdi={stillingstittel}
                        />
                    </VStack>
                    <VStack className={styles.element}>
                        <TextField
                            className={styles.mb6}
                            label="Alternativ tittel"
                            description="Dersom ditt yrke ikke står i listen"
                            value={alternativTittel}
                            onChange={(e) => setAlternativTittel(e.target.value)}
                        />
                    </VStack>
                </HStack>
                <HStack justify="space-between">
                    <VStack className={styles.element}>
                        <TextField
                            className={styles.mb6}
                            label="Bedrift"
                            value={arbeidsgiver}
                            onChange={(e) => setArbeidsgiver(e.target.value)}
                        />
                    </VStack>
                    <VStack className={styles.element}>
                        <TextField
                            className={styles.mb6}
                            label="Sted"
                            value={arbeidssted}
                            onChange={(e) => setArbeidssted(e.target.value)}
                        />
                    </VStack>
                </HStack>
                <Textarea
                    label="Arbeidsoppgaver"
                    description="Skriv litt om rollen din og de viktigste oppgavene dine"
                    className={styles.mb6}
                    value={arbeidsoppgaver}
                    onChange={(e) => setArbeidsoppgaver(e.target.value)}
                />
                <CheckboxGroup legend="Jobb jeg har nå" className={styles.mb6} value={pågår} onChange={setPågår}>
                    <Checkbox value={true}>Jobb jeg har nå</Checkbox>
                </CheckboxGroup>

                <HStack gap="8">
                    <Datovelger valgtDato={startdato} oppdaterDato={setStartdato} label="Fra" obligatorisk />

                    {!pågår.includes(true) && (
                        <Datovelger valgtDato={sluttdato} oppdaterDato={setSluttdato} label="Til" obligatorisk />
                    )}
                </HStack>
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
