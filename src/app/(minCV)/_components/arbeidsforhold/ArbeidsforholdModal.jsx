import { Checkbox, CheckboxGroup, HStack, Textarea, TextField, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModal } from "@/app/_common/components/CvModal";

export const ArbeidsforholdModal = ({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) => {
    const [arbeidsgiver, setArbeidsgiver] = useState("");
    const [alternativTittel, setAlternativTittel] = useState("");
    const [arbeidssted, setArbeidssted] = useState("");
    const [arbeidsoppgaver, setArbeidsoppgaver] = useState("");

    const [startdato, setStartdato] = useState(null);
    const [sluttdato, setSluttdato] = useState(null);
    const [pågår, setPågår] = useState([]);

    const [stillingstittel, setStillingstittel] = useState(gjeldendeElement?.jobTitle || "");
    const [konseptId, setKonseptId] = useState("");
    const [styrk, setStyrk] = useState("");

    const [stillingstittelError, setStillingstittelError] = useState(false);
    const [startdatoError, setStartdatoError] = useState(false);
    const [sluttdatoError, setSluttdatoError] = useState(false);

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

        oppdaterArbeidsforhold(gjeldendeElement);
    }, [gjeldendeElement]);

    const lagre = async () => {
        const erPågående = pågår.includes(true);

        if (!stillingstittel) setStillingstittelError(true);
        if (!startdato) setStartdatoError(true);
        if (!erPågående && !sluttdato) setSluttdatoError(true);

        if (stillingstittel && startdato && (sluttdato || erPågående)) {
            await lagreElement({
                ...gjeldendeElement,
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
        }
    };

    const setStillingTypeahead = (stilling, erValgt) => {
        setStillingstittel(erValgt ? stilling.label : "");
        setKonseptId(erValgt ? stilling.konseptId : "");
        setStyrk(erValgt ? stilling.styrk08 : "");
        setStillingstittelError(false);
    };

    return (
        <CvModal
            modalÅpen={modalÅpen}
            tittel={"Legg til arbeidsforhold"}
            feilet={feilet}
            laster={laster}
            lagre={lagre}
            toggleModal={toggleModal}
        >
            <HStack justify="space-between">
                <VStack className={styles.element}>
                    <Typeahead
                        className={styles.mb6}
                        label="Stilling/yrke"
                        description="Må fylles ut"
                        type={TypeaheadEnum.STILLING}
                        oppdaterValg={setStillingTypeahead}
                        valgtVerdi={stillingstittel}
                        error={stillingstittelError && "Du må velge stilling/yrke"}
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
                <Datovelger
                    valgtDato={startdato}
                    oppdaterDato={setStartdato}
                    label="Fra"
                    obligatorisk
                    error={startdatoError}
                    setError={setStartdatoError}
                />

                {!pågår.includes(true) && (
                    <Datovelger
                        valgtDato={sluttdato}
                        oppdaterDato={setSluttdato}
                        label="Til"
                        obligatorisk
                        error={sluttdatoError}
                        setError={setSluttdatoError}
                    />
                )}
            </HStack>
        </CvModal>
    );
};
