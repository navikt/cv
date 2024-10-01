import {
    BodyLong,
    Button,
    Checkbox,
    CheckboxGroup,
    Heading,
    HStack,
    Modal,
    Select,
    Textarea,
    TextField,
} from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { UtdanningsnivåEnum } from "@/app/enums/cvEnums";
import { useEffect, useState } from "react";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";

export const UtdanningModal = ({ modalÅpen, toggleModal, utdanning, lagreUtdanning }) => {
    const [utdanningsnivå, setUtdanningsnivå] = useState("");
    const [gradOgRetning, setGradOgRetning] = useState("");
    const [institusjon, setInstitusjon] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");
    const [startdato, setStartdato] = useState(null);
    const [sluttdato, setSluttdato] = useState(null);
    const [pågår, setPågår] = useState([]);

    useEffect(() => {
        const oppdaterUtdanning = (utdanning) => {
            setUtdanningsnivå(utdanning?.nuskode || "");
            setGradOgRetning(utdanning?.field || "");
            setInstitusjon(utdanning?.institution || "");
            setBeskrivelse(utdanning?.description || "");
            setStartdato(utdanning ? new Date(utdanning.startDate) : null);
            setSluttdato(utdanning && utdanning?.endDate ? new Date(utdanning.endDate) : null);
            setPågår(utdanning && utdanning.ongoing ? [true] : []);
        };

        oppdaterUtdanning(utdanning);
    }, [utdanning]);

    const lagre = () => {
        const erPågående = pågår.includes(true);
        lagreUtdanning({
            ...utdanning,
            nuskode: utdanningsnivå,
            field: gradOgRetning,
            institution: institusjon,
            description: beskrivelse,
            startDate: startdato,
            endDate: erPågående ? null : sluttdato,
            ongoing: erPågående,
        });
    };

    const årspenn = Array.from({ length: 100 }, (år, index) => new Date().getFullYear() - index);

    return (
        <Modal open={modalÅpen} aria-label="Legg til utdanning" onClose={() => toggleModal(false)} width="medium">
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    Legg til Utdanning
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong>
                    <b>Utdanningsnivå</b> *obligatorisk
                </BodyLong>
                <Select
                    id="utdanningsnivå"
                    label="Hvilken type utdanning har du gått?"
                    className={styles.mb6}
                    value={utdanningsnivå}
                    onChange={(e) => setUtdanningsnivå(e.target.value)}
                >
                    <option value={""}>Velg</option>
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
                    <Checkbox value={true}>Utdanning jeg tar nå</Checkbox>
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
