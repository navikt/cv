import { Button, Heading, HStack, Modal, Select, TextField } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import offentligeGodkjenningerMock from "../../../mocks/typeahead/offentligeGodkjenningerTypeaheadMock.json";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import styles from "@/app/page.module.css";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";

export default function OffentligeGodkjenningerModal({ modalÅpen, toggleModal, godkjenning, lagreGodkjenning }) {
    const [valgtGodkjenning, setValgtGodkjenning] = useState(godkjenning || null);
    const [utsteder, setUtsteder] = useState(godkjenning?.issuer || "");
    const [godkjenningFraDato, setGodkjenningFraDato] = useState(
        godkjenning?.fromDate ? new Date(godkjenning.fromDate) : null,
    );
    const [godkjenningTilDato, setGodkjenningTilDato] = useState(
        godkjenning?.toDate ? new Date(godkjenning.toDate) : null,
    );

    useEffect(() => {
        const oppdaterGodkjenning = (godkjenning) => {
            setValgtGodkjenning(godkjenning);
            setUtsteder(godkjenning?.issuer || "");

            console.log("Fra dato", godkjenning.fromDate, "Til dato", godkjenning.toDate);

            setGodkjenningFraDato(godkjenning?.fromDate ? new Date(godkjenning.fromDate) : null);
            setGodkjenningTilDato(godkjenning?.toDate ? new Date(godkjenning.toDate) : null);
        };
        oppdaterGodkjenning(godkjenning || []);
    }, [godkjenning]);

    const lagre = () => {
        lagreGodkjenning({
            title: valgtGodkjenning.title,
            conceptId: valgtGodkjenning.conceptId,
            issuer: utsteder,
            fromDate: godkjenningFraDato,
            toDate: godkjenningTilDato,
        });
        setValgtGodkjenning(null);
    };

    return (
        <Modal
            open={modalÅpen}
            aria-label="Legg til offentlig godkjenning"
            onClose={() => toggleModal(false)}
            width="medium"
            className={"overflow-visible"}
        >
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    <HStack gap="1" align="center">
                        Legg til språk
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }} className={"overflow-visible"}>
                <Typeahead
                    className={styles.mb6}
                    label="Offentlig godkjenning"
                    description="Autorisasjoner, førerbevis, tjenestebevis m.m"
                    mockData={offentligeGodkjenningerMock}
                    oppdaterValg={setValgtGodkjenning}
                    valgtVerdi={valgtGodkjenning?.title}
                />
                <TextField
                    className={styles.mb6}
                    label="Utsteder"
                    description="Organisasjonen som har utstedt godkjenningen"
                    value={utsteder}
                    onChange={(e) => setUtsteder(e.target.value)}
                />
                <HStack gap="8">
                    <Datovelger valgtDato={godkjenningFraDato} oppdaterDato={setGodkjenningFraDato} label="Fullført" />
                    <Datovelger
                        valgtDato={godkjenningTilDato}
                        oppdaterDato={setGodkjenningTilDato}
                        label="Utløper"
                        fremtid
                    />
                </HStack>
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button variant="secondary" onClick={() => toggleModal(false)}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={() => lagre(valgtGodkjenning)}>
                        Lagre
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
