import { BodyLong, Button, Heading, HStack, Modal, Select, TextField, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { TidsenhetEnum } from "@/app/_common/enums/cvEnums";
import { formatterTidsenhet, storForbokstav } from "@/app/_common/utils/stringUtils";

export default function KursModal({ modalÅpen, toggleModal, kurs, lagreKurs }) {
    const [valgtKurs, setValgtKurs] = useState(kurs || null);
    const [kursnavn, setKursnavn] = useState(kurs?.title || "");
    const [utsteder, setUtsteder] = useState(kurs?.issuer || "");
    const [kursDato, setKursDato] = useState(kurs?.date ? new Date(kurs?.date) : null);
    const [tidsenhet, setTidsenhet] = useState(kurs?.durationUnit || "");
    const [lengde, setLengde] = useState(kurs?.duration || "");
    const [kursnavnError, setKursnavnError] = useState(false);
    const [kursDatoError, setKursDatoError] = useState(false);
    const [lengdeError, setLengdeError] = useState(false);

    useEffect(() => {
        const oppdaterKurs = (kurs) => {
            setValgtKurs(kurs);
            setKursnavn(kurs?.title || "");
            setUtsteder(kurs?.issuer || "");
            setTidsenhet(kurs?.durationUnit || "");
            setLengde(kurs?.duration || "");
            setKursDato(kurs?.date ? new Date(kurs.date) : null);
        };
        oppdaterKurs(kurs);
    }, [kurs]);

    const lagre = async () => {
        if (!kursnavn) setKursnavnError(true);
        if (tidsenhet && !lengde) setLengdeError(true);

        if (kursnavn && !kursDatoError && (tidsenhet ? lengde : true)) {
            await lagreKurs({
                title: kursnavn,
                issuer: utsteder,
                date: kursDato,
                durationUnit: tidsenhet || null,
                duration: lengde || null,
            });
        }
        setValgtKurs(null);
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
                        Legg til kurs
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }} className={"overflow-visible"}>
                <BodyLong>
                    <b>Kursnavn</b> *obligatorisk
                </BodyLong>
                <TextField
                    className={styles.mb6}
                    label=""
                    description=""
                    value={kursnavn}
                    onChange={(e) => {
                        setKursnavn(e.target.value);
                        setKursnavnError(false);
                    }}
                    error={kursnavnError && "Du må skrive inn kursnavn"}
                />
                <TextField
                    className={styles.mb6}
                    label="Kursholder"
                    description=""
                    value={utsteder}
                    onChange={(e) => setUtsteder(e.target.value)}
                />
                <Datovelger
                    valgtDato={kursDato}
                    oppdaterDato={setKursDato}
                    label="Fullført"
                    className={styles.mb6}
                    error={kursDatoError}
                    setError={setKursDatoError}
                />
                <HStack gap="8">
                    <VStack>
                        <Select
                            label="Kurslengde"
                            className={styles.mb6}
                            value={tidsenhet}
                            onChange={(e) => setTidsenhet(e.target.value)}
                        >
                            <option value="">Velg</option>
                            {Object.keys(TidsenhetEnum).map((enhet) => (
                                <option key={enhet} value={enhet}>
                                    {storForbokstav(formatterTidsenhet(enhet, 2))}
                                </option>
                            ))}
                        </Select>
                    </VStack>
                    {tidsenhet && (
                        <VStack>
                            <TextField
                                className={styles.mb6}
                                label={`Antall ${formatterTidsenhet(tidsenhet, 2)}`}
                                inputMode="numeric"
                                type={"number"}
                                description=""
                                value={lengde}
                                onChange={(e) => {
                                    setLengde(e.target.value);
                                    setLengdeError(false);
                                }}
                                error={lengdeError && "Du må fylle ut varighet"}
                            />
                        </VStack>
                    )}
                </HStack>
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button variant="secondary" onClick={() => toggleModal(false)}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={() => lagre(valgtKurs)}>
                        Lagre
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
