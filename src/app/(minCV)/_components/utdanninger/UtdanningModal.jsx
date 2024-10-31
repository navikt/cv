import { BodyLong, Checkbox, CheckboxGroup, HStack, Select, Textarea, TextField } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { UtdanningsnivåEnum } from "@/app/_common/enums/cvEnums";
import { useEffect, useState } from "react";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { CvModal } from "@/app/_common/components/CvModal";

export function UtdanningModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [utdanningsnivå, setUtdanningsnivå] = useState("");
    const [gradOgRetning, setGradOgRetning] = useState("");
    const [institusjon, setInstitusjon] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");
    const [startdato, setStartdato] = useState(null);
    const [sluttdato, setSluttdato] = useState(null);
    const [pågår, setPågår] = useState([]);
    const [utdanningsnivaError, setUtdanningsnivaError] = useState(false);
    const [startdatoError, setStartdatoError] = useState(false);
    const [sluttdatoError, setSluttdatoError] = useState(false);

    useEffect(() => {
        const oppdaterUtdanning = (utdanning) => {
            setUtdanningsnivå(utdanning?.nuskode || "");
            setGradOgRetning(utdanning?.field || "");
            setInstitusjon(utdanning?.institution || "");
            setBeskrivelse(utdanning?.description || "");
            setStartdato(utdanning ? new Date(utdanning.startDate) : null);
            setSluttdato(utdanning && utdanning?.endDate ? new Date(utdanning.endDate) : null);
            setPågår(utdanning && utdanning.ongoing ? ["true"] : []);
        };

        oppdaterUtdanning(gjeldendeElement);
    }, [gjeldendeElement]);

    const lagre = () => {
        const erPågående = pågår.includes("true");

        if (!utdanningsnivå) setUtdanningsnivaError(true);
        if (!startdato) setStartdatoError(true);
        if (!erPågående && !sluttdato) setSluttdatoError(true);

        if (utdanningsnivå && startdato && (sluttdato || erPågående)) {
            lagreElement({
                ...gjeldendeElement,
                nuskode: utdanningsnivå,
                field: gradOgRetning,
                institution: institusjon,
                description: beskrivelse,
                startDate: startdato,
                endDate: erPågående ? null : sluttdato,
                ongoing: erPågående,
            });
        }
    };

    return (
        <CvModal
            modalÅpen={modalÅpen}
            tittel="Legg til utdanning"
            feilet={feilet}
            laster={laster}
            lagre={lagre}
            toggleModal={toggleModal}
        >
            <BodyLong>
                <b>Utdanningsnivå</b> *obligatorisk
            </BodyLong>
            <Select
                id="utdanningsnivå"
                label="Hvilken type utdanning har du gått?"
                className={styles.mb6}
                value={utdanningsnivå}
                onChange={(e) => {
                    setUtdanningsnivå(e.target.value);
                    setUtdanningsnivaError(false);
                }}
                error={utdanningsnivaError && "Utdanningsnivå mangler"}
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
                description="Eksempel: elektrofag, bachelor i historie"
                className={styles.mb6}
                value={gradOgRetning}
                onChange={(e) => setGradOgRetning(e.target.value)}
            />
            <TextField
                label="Skole/studiested"
                description="Eksempel: Drammen videregående, Universitetet i Tromsø"
                className={styles.mb6}
                value={institusjon}
                onChange={(e) => setInstitusjon(e.target.value)}
            />
            <Textarea
                label="Beskriv utdanningen"
                description="Eksempel: Studieretning eller fag du har fordypet deg i"
                className={styles.mb6}
                value={beskrivelse}
                onChange={(e) => setBeskrivelse(e.target.value)}
            />
            <CheckboxGroup legend="Utdanning jeg tar nå" className={styles.mb6} value={pågår} onChange={setPågår}>
                <Checkbox value="true">Utdanning jeg tar nå</Checkbox>
            </CheckboxGroup>

            <HStack gap="8">
                <Datovelger
                    valgtDato={startdato}
                    oppdaterDato={setStartdato}
                    label="Fra dato"
                    obligatorisk
                    error={startdatoError}
                    setError={setStartdatoError}
                />

                {!pågår.includes("true") && (
                    <Datovelger
                        valgtDato={sluttdato}
                        oppdaterDato={setSluttdato}
                        label="Til dato"
                        obligatorisk
                        error={sluttdatoError}
                        setError={setSluttdatoError}
                    />
                )}
            </HStack>
        </CvModal>
    );
}
