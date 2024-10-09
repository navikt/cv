import { Button, Heading, HStack, Modal, Select, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import førerkortData from "@/app/_common/data/førerkort.json";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";

export default function FørerkortModal({ modalÅpen, toggleModal, førerkort, lagreFørerkort }) {
    const [valgtFørerkort, setValgtFørerkort] = useState(førerkort || null);
    const [gyldigFra, setGyldigFra] = useState(førerkort?.acquiredDate ? new Date(førerkort.acquiredDate) : null);
    const [gyldigTil, setGyldigTil] = useState(førerkort?.expiryDate ? new Date(førerkort.expiryDate) : null);
    const [kreverDato, setKreverDato] = useState(!!førerkort?.acquiredDate);

    const gyldigeFørerkort = førerkortData.gyldigeFørerkort;

    useEffect(() => {
        const oppdaterFørerkort = (førerkort) => setValgtFørerkort(førerkort);
        oppdaterFørerkort(førerkort || []);
    }, [førerkort]);

    const velgFørerkort = (verdi) => {
        const valgtFørerkort = gyldigeFørerkort.find((e) => e.type === verdi);
        setValgtFørerkort(valgtFørerkort);
        setKreverDato(valgtFørerkort?.kreverDato || false);
    };

    const lagre = async () => {
        await lagreFørerkort({
            type: valgtFørerkort.label || valgtFørerkort.type,
            acquiredDate: gyldigFra,
            expiryDate: gyldigTil,
        });
        setValgtFørerkort(null);
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
                    <Select
                        id="Førerkort"
                        label="Førerkort"
                        className={styles.mb6}
                        value={valgtFørerkort?.type || ""}
                        onChange={(e) => velgFørerkort(e.target.value)}
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
                            />
                            <Datovelger
                                valgtDato={gyldigTil}
                                oppdaterDato={setGyldigTil}
                                label="Gyldig til"
                                obligatorisk
                                fremtid
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
