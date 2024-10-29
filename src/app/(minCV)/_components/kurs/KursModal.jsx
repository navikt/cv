import { BodyLong, HStack, Select, TextField, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { TidsenhetEnum } from "@/app/_common/enums/cvEnums";
import { formatterTidsenhet, storForbokstav } from "@/app/_common/utils/stringUtils";
import { CvModal } from "@/app/_common/components/CvModal";

export default function KursModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [valgtKurs, setValgtKurs] = useState(gjeldendeElement || null);
    const [kursnavn, setKursnavn] = useState(gjeldendeElement?.title || "");
    const [utsteder, setUtsteder] = useState(gjeldendeElement?.issuer || "");
    const [kursDato, setKursDato] = useState(gjeldendeElement?.date ? new Date(gjeldendeElement?.date) : null);
    const [tidsenhet, setTidsenhet] = useState(gjeldendeElement?.durationUnit || "");
    const [lengde, setLengde] = useState(gjeldendeElement?.duration || "");
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
        oppdaterKurs(gjeldendeElement);
    }, [gjeldendeElement]);

    const lagre = async () => {
        if (!kursnavn) setKursnavnError(true);
        if (tidsenhet && !lengde) setLengdeError(true);

        if (kursnavn && !kursDatoError && (tidsenhet ? lengde : true)) {
            await lagreElement({
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
        <CvModal
            modalÅpen={modalÅpen}
            tittel="Legg til kurs"
            feilet={feilet}
            laster={laster}
            lagre={lagre}
            toggleModal={toggleModal}
            overflowVisible
        >
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
                            type="number"
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
        </CvModal>
    );
}
