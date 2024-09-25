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
    TextField, VStack,
} from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { MånedEnum, UtdanningsnivåEnum } from "@/app/enums/cvEnums";
import { useEffect, useState } from "react";

export const UtdanningModal = ({ modalÅpen, toggleModal, utdanning, lagreUtdanning }) => {
    const [utdanningsnivå, setUtdanningsnivå] = useState("");
    const [gradOgRetning, setGradOgRetning] = useState("");
    const [institusjon, setInstitusjon] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");
    const [startmåned, setStartmåned] = useState(-1);
    const [startår, setStartår] = useState(-1);
    const [sluttmåned, setSluttmåned] = useState(-1);
    const [sluttår, setSluttår] = useState(-1);
    const [pågår, setPågår] = useState([]);

    useEffect(() => {
        const oppdaterUtdanning = (utdanning) => {
            setUtdanningsnivå(utdanning?.nuskode || "");
            setGradOgRetning(utdanning?.field || "");
            setInstitusjon(utdanning?.institution || "");
            setBeskrivelse(utdanning?.description || "");

            const startDato = utdanning ? new Date(utdanning.startDate) : null;
            setStartmåned(startDato?.getMonth() >= 0 ? startDato?.getMonth() : -1);
            setStartår(startDato?.getFullYear() || -1);

            const sluttDato = utdanning && utdanning.endDate ? new Date(utdanning.endDate) : null;
            setSluttmåned(sluttDato?.getMonth() >= 0 ? sluttDato?.getMonth() : -1);
            setSluttår(sluttDato?.getFullYear() || -1);

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
            startDate: new Date(startår, startmåned, 1, 12),
            endDate: erPågående ? null : new Date(sluttår, sluttmåned, 1, 12),
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
                    <VStack>
                        <BodyLong>
                            <b>Fra</b> *obligatorisk
                        </BodyLong>
                        <HStack gap="4">
                            <Select label="" value={startmåned} onChange={(e) => setStartmåned(e.target.value)}>
                                <option value={-1}>Måned</option>
                                {Object.keys(MånedEnum).map((måned) => (
                                    <option key={måned} value={måned}>
                                        {MånedEnum[måned]}
                                    </option>
                                ))}
                            </Select>
                            <Select label="" value={startår} onChange={(e) => setStartår(e.target.value)}>
                                <option value={-1}>År</option>
                                {årspenn.map((år) => (
                                    <option key={år} value={år}>
                                        {år}
                                    </option>
                                ))}
                            </Select>
                        </HStack>
                    </VStack>

                    {!pågår.includes(true) && (
                        <VStack>
                            <BodyLong>
                                <b>Til</b> *obligatorisk
                            </BodyLong>
                            <HStack gap="4">
                                <Select label="" value={sluttmåned} onChange={(e) => setSluttmåned(e.target.value)}>
                                    <option value={-1}>Måned</option>
                                    {Object.keys(MånedEnum).map((måned) => (
                                        <option key={måned} value={måned}>
                                            {MånedEnum[måned]}
                                        </option>
                                    ))}
                                </Select>
                                <Select label="" value={sluttår} onChange={(e) => setSluttår(e.target.value)}>
                                    <option value={-1}>År</option>
                                    {årspenn.map((år) => (
                                        <option key={år} value={år}>
                                            {år}
                                        </option>
                                    ))}
                                </Select>
                            </HStack>
                        </VStack>
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
