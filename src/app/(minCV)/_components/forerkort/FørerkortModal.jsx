import { BodyLong, Button, Heading, HStack, Modal, Select, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import førerkortData from "@/app/_common/data/førerkort.json";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";

export default function FørerkortModal({ modalÅpen, toggleModal, førerkort, lagreFørerkort }) {
    const [valgtFørerkort, setValgtFørerkort] = useState(førerkort || null);
    const [gyldigFra, setGyldigFra] = useState(førerkort?.acquiredDate ? new Date(førerkort.acquiredDate) : null);
    const [gyldigTil, setGyldigTil] = useState(førerkort?.expiryDate ? new Date(førerkort.expiryDate) : null);
    const [kreverDato, setKreverDato] = useState(!!førerkort?.acquiredDate);
    const [valgtForerkortError, setValgtForerkortError] = useState(false);
    const [gyldigFraError, setGyldigFraError] = useState(false);
    const [gyldigTilError, setGyldigTilError] = useState(false);

    const gyldigeFørerkort = førerkortData.gyldigeFørerkort;

    useEffect(() => {
        const oppdaterFørerkort = (førerkort) => setValgtFørerkort(førerkort);
        oppdaterFørerkort(førerkort || []);
    }, [førerkort]);

    const velgFørerkort = (verdi) => {
        const valgtFørerkort = gyldigeFørerkort.find((e) => e.type === verdi);
        setValgtFørerkort(valgtFørerkort);
        setKreverDato(valgtFørerkort?.kreverDato || false);
        setValgtForerkortError(false);
    };

    const lagre = async () => {
        if (!valgtFørerkort || valgtFørerkort.length === 0) setValgtForerkortError(true);
        if (kreverDato && !gyldigFra) setGyldigFraError(true);
        if (kreverDato && !gyldigTil) setGyldigTilError(true);

        if (valgtFørerkort && valgtFørerkort.length !== 0 && (kreverDato ? gyldigFra && gyldigTil : true)) {
            lagreFørerkort({
                type: valgtFørerkort.label || valgtFørerkort.type,
                acquiredDate: gyldigFra,
                expiryDate: gyldigTil,
            });
        }
    };

    return (
        <Modal
            open={modalÅpen}
            aria-label="Legg til fagbrev"
            onClose={() => toggleModal(false)}
            width="medium"
            className={"overflow-visible"}
        >
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    <HStack gap="1" align="center">
                        Legg til Førerkort
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }} className={"overflow-visible"}>
                <VStack>
                    <BodyLong>
                        <b>Førerkort</b> *obligatorisk
                    </BodyLong>
                    <Select
                        id="Førerkort"
                        label=""
                        className={styles.mb6}
                        value={valgtFørerkort?.type || ""}
                        onChange={(e) => velgFørerkort(e.target.value)}
                        error={valgtForerkortError && "Du må velge førerkort"}
                    >
                        <option value={null}>Velg</option>
                        {gyldigeFørerkort.map((e) => (
                            <option key={e.type} value={e.type}>
                                {e.type}
                            </option>
                        ))}
                    </Select>
                    {kreverDato && (
                        <HStack gap="8">
                            <Datovelger
                                valgtDato={gyldigFra}
                                oppdaterDato={setGyldigFra}
                                label="Gyldig fra"
                                obligatorisk
                                error={gyldigFraError}
                                setError={setGyldigFraError}
                            />
                            <Datovelger
                                valgtDato={gyldigTil}
                                oppdaterDato={setGyldigTil}
                                label="Gyldig til"
                                obligatorisk
                                fremtid
                                error={gyldigTilError}
                                setError={setGyldigTilError}
                            />
                        </HStack>
                    )}
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button variant="secondary" onClick={() => toggleModal(false)}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={() => lagre(valgtFørerkort)}>
                        Lagre
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
