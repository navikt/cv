import { BodyLong, Button, Heading, HStack, Modal, Select, TextField } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import styles from "@/app/page.module.css";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";

export default function OffentligeGodkjenningerModal({ modalÅpen, toggleModal, godkjenning, lagreGodkjenning }) {
    const [valgtGodkjenning, setValgtGodkjenning] = useState(godkjenning || null);
    const [utsteder, setUtsteder] = useState(godkjenning?.issuer || "");
    const [godkjenningFraDato, setGodkjenningFraDato] = useState(
        godkjenning?.fromDate ? new Date(godkjenning.fromDate) : null,
    );
    const [godkjenningTilDato, setGodkjenningTilDato] = useState(
        godkjenning?.toDate ? new Date(godkjenning.toDate) : null,
    );
    const [valgtGodkjenningError, setValgtGodkjenningError] = useState(false);
    const [godkjenningFraDatoError, setGodkjenningFraDatoError] = useState(false);
    const [godkjenningTilDatoError, setGodkjenningTilDatoError] = useState(false);

    useEffect(() => {
        const oppdaterGodkjenning = (godkjenning) => {
            setValgtGodkjenning(godkjenning);
            setUtsteder(godkjenning?.issuer || "");
            setGodkjenningFraDato(godkjenning?.fromDate ? new Date(godkjenning.fromDate) : null);
            setGodkjenningTilDato(godkjenning?.toDate ? new Date(godkjenning.toDate) : null);
        };
        oppdaterGodkjenning(godkjenning || []);
    }, [godkjenning]);

    const lagre = () => {
        if (!valgtGodkjenning || valgtGodkjenning.length === 0) setValgtGodkjenningError(true);
        if (!godkjenningFraDato) setGodkjenningFraDatoError(true);

        if (valgtGodkjenning && valgtGodkjenning.length !== 0 && godkjenningFraDato && !godkjenningTilDatoError) {
            lagreGodkjenning({
                title: valgtGodkjenning.title,
                conceptId: valgtGodkjenning.conceptId,
                issuer: utsteder,
                fromDate: godkjenningFraDato,
                toDate: godkjenningTilDato,
            });
        }
    };

    const oppdaterValgtGodkjenning = (verdi, erValgt) => {
        setValgtGodkjenning(erValgt ? verdi : null);
        setValgtGodkjenningError(false);
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
                        Legg til offentlig godkjenning
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }} className={"overflow-visible"}>
                <BodyLong>
                    <b>Offentlig godkjenning</b> *obligatorisk
                </BodyLong>
                <Typeahead
                    className={styles.mb6}
                    label=""
                    description="Autorisasjoner, førerbevis, tjenestebevis m.m"
                    type={TypeaheadEnum.OFFENTLIGE_GODKJENNINGER}
                    oppdaterValg={oppdaterValgtGodkjenning}
                    valgtVerdi={valgtGodkjenning?.title}
                    error={valgtGodkjenningError && "Du må velge en godkjenning"}
                />
                <TextField
                    className={styles.mb6}
                    label="Utsteder"
                    description="Organisasjonen som har utstedt godkjenningen"
                    value={utsteder}
                    onChange={(e) => setUtsteder(e.target.value)}
                />
                <HStack gap="8">
                    <Datovelger
                        valgtDato={godkjenningFraDato}
                        oppdaterDato={setGodkjenningFraDato}
                        label="Fullført"
                        obligatorisk
                        error={godkjenningFraDatoError}
                        setError={setGodkjenningFraDatoError}
                    />
                    <Datovelger
                        valgtDato={godkjenningTilDato}
                        oppdaterDato={setGodkjenningTilDato}
                        label="Utløper"
                        fremtid
                        error={godkjenningTilDatoError}
                        setError={setGodkjenningTilDatoError}
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
