import { Button, Heading, HStack, Modal, TextField } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import styles from "@/app/page.module.css";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";

export default function AndreGodkjenningerModal({ modalÅpen, toggleModal, godkjenning, lagreGodkjenning }) {
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
            setGodkjenningFraDato(godkjenning?.fromDate ? new Date(godkjenning.fromDate) : null);
            setGodkjenningTilDato(godkjenning?.toDate ? new Date(godkjenning.toDate) : null);
        };
        oppdaterGodkjenning(godkjenning || []);
    }, [godkjenning]);

    const lagre = () => {
        lagreGodkjenning({
            certificateName: valgtGodkjenning.title || valgtGodkjenning.certificateName,
            conceptId: valgtGodkjenning.conceptId,
            issuer: utsteder,
            fromDate: godkjenningFraDato,
            toDate: godkjenningTilDato,
        });
    };

    const oppdaterValgtGodkjenning = (verdi, erValgt) => {
        setValgtGodkjenning(erValgt ? verdi : null);
    };

    return (
        <Modal
            open={modalÅpen}
            aria-label="Legg til annen godkjenning"
            onClose={() => toggleModal(false)}
            width="medium"
            className={"overflow-visible"}
        >
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    <HStack gap="1" align="center">
                        Legg til annen godkjenning
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }} className={"overflow-visible"}>
                <Typeahead
                    className={styles.mb6}
                    label="Annen godkjenning"
                    description="Yrkessertifikater, attester, bevis o.l."
                    type={TypeaheadEnum.ANDRE_GODKJENNINGER}
                    oppdaterValg={oppdaterValgtGodkjenning}
                    valgtVerdi={valgtGodkjenning?.certificateName || valgtGodkjenning?.title}
                />
                <TextField
                    className={styles.mb6}
                    label="Utsteder"
                    description="Organisasjon, forening, opplæringssted"
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
