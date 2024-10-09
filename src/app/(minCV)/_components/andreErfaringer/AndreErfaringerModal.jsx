import { BodyLong, Button, Checkbox, CheckboxGroup, Heading, HStack, Modal, TextField } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";

export const AndreErfaringerModal = ({ modalÅpen, toggleModal, erfaring, lagreErfaring }) => {
    const [beskrivelse, setBeskrivelse] = useState("");
    const [rolle, setRolle] = useState("");
    const [pågår, setPågår] = useState([]);
    const [startdato, setStartdato] = useState(null);
    const [sluttdato, setSluttdato] = useState(null);

    useEffect(() => {
        const oppdaterErfaring = (erfaring) => {
            setRolle(erfaring?.role || "");
            setBeskrivelse(erfaring?.description || "");
            setStartdato(erfaring ? new Date(erfaring.fromDate) : null);
            setSluttdato(erfaring && erfaring?.toDate ? new Date(erfaring.toDate) : null);
            setPågår(erfaring && erfaring.ongoing ? [true] : []);
        };

        oppdaterErfaring(erfaring);
    }, [erfaring]);

    const lagre = async () => {
        const erPågående = pågår.includes(true);
        await lagreErfaring({
            ...erfaring,
            role: rolle,
            description: beskrivelse,
            fromDate: startdato,
            toDate: erPågående ? null : sluttdato,
            ongoing: erPågående,
        });
    };

    return (
        <Modal open={modalÅpen} aria-label="Legg til utdanning" onClose={() => toggleModal(false)} width="medium">
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    Legg til annen erfaring
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong>
                    <b>Rolle</b> *obligatorisk
                </BodyLong>
                <TextField
                    label=""
                    description="Eksempel: militærtjeneste, styreverv eller fotballtrener"
                    className={styles.mb6}
                    value={rolle}
                    onChange={(e) => setRolle(e.target.value)}
                />
                <TextField
                    label="Beskrivelse"
                    description="Eksempel: 5 års erfaring som fotballtrener for guttelag i Oslo"
                    className={styles.mb6}
                    value={beskrivelse}
                    onChange={(e) => setBeskrivelse(e.target.value)}
                />
                <CheckboxGroup legend="" className={styles.mb6} value={pågår} onChange={setPågår}>
                    <Checkbox value={true}>Pågår</Checkbox>
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
