import { BodyShort, HStack, Select, TextField, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { TidsenhetEnum } from "@/app/_common/enums/cvEnums";
import { formatterTidsenhet, storForbokstav } from "@/app/_common/utils/stringUtils";
import { CvModalForm } from "@/app/_common/components/CvModalForm";

export default function KursModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [kursnavn, setKursnavn] = useState(gjeldendeElement?.title || "");
    const [utsteder, setUtsteder] = useState(gjeldendeElement?.issuer || "");
    const [kursDato, setKursDato] = useState(gjeldendeElement?.date ? new Date(gjeldendeElement?.date) : null);
    const [tidsenhet, setTidsenhet] = useState(gjeldendeElement?.durationUnit || "");
    const [lengde, setLengde] = useState(gjeldendeElement?.duration || "");
    const [kursnavnError, setKursnavnError] = useState(false);
    const [kursDatoError, setKursDatoError] = useState(false);
    const [lengdeError, setLengdeError] = useState(false);
    const [skalViseDatofeilmelding, setSkalviseDatofeilmelding] = useState(false);

    useEffect(() => {
        const oppdaterKurs = (kurs) => {
            setKursnavn(kurs?.title || "");
            setUtsteder(kurs?.issuer || "");
            setTidsenhet(kurs?.durationUnit || "");
            setLengde(kurs?.duration || "");
            setKursDato(kurs?.date ? new Date(kurs.date) : null);
        };
        oppdaterKurs(gjeldendeElement);
    }, [gjeldendeElement]);

    const lagre = async () => {
        setSkalviseDatofeilmelding(true);
        if (!kursnavn) setKursnavnError(true);
        if (tidsenhet && tidsenhet !== "UKJENT" && !lengde) setLengdeError(true);
        if (kursDatoError) return;

        if (kursnavn && !kursDatoError && (tidsenhet && tidsenhet !== "UKJENT" ? lengde : true)) {
            await lagreElement({
                title: kursnavn,
                issuer: utsteder,
                date: kursDato,
                durationUnit: tidsenhet || null,
                duration: lengde || null,
            });
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til kurs"
            icon={<HStack className={[styles.iconKursBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
        >
            <TextField
                className={styles.mb6}
                label="Kursnavn"
                description="Må fylles ut"
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
                setError={setKursDatoError}
                skalViseFeilmelding={skalViseDatofeilmelding}
                setSkalViseFeilmelding={setSkalviseDatofeilmelding}
            />
            <HStack gap="8">
                <VStack>
                    <Select
                        label="Kurslengde"
                        className={styles.mb6}
                        value={tidsenhet}
                        onChange={(e) => {
                            setTidsenhet(e.target.value);
                            setLengdeError(false);
                        }}
                    >
                        <option value="">Velg</option>
                        {Object.keys(TidsenhetEnum).map((enhet) => (
                            <option key={enhet} value={enhet}>
                                {storForbokstav(formatterTidsenhet(enhet, 2))}
                            </option>
                        ))}
                    </Select>
                </VStack>
                {tidsenhet && tidsenhet !== "UKJENT" && (
                    <VStack>
                        <TextField
                            className={styles.mb6}
                            label={
                                <HStack gap="2">
                                    <BodyShort weight="semibold">Antall {formatterTidsenhet(tidsenhet, 2)}</BodyShort>
                                    <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                                </HStack>
                            }
                            inputMode="numeric"
                            type="number"
                            min="1"
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
        </CvModalForm>
    );
}
