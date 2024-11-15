import { HStack, Select, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import førerkortData from "@/app/_common/data/førerkort.json";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { CvModalForm } from "@/app/_common/components/CvModalForm";

export default function FørerkortModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [valgtFørerkort, setValgtFørerkort] = useState(gjeldendeElement || null);
    const [gyldigFra, setGyldigFra] = useState(
        gjeldendeElement?.acquiredDate ? new Date(gjeldendeElement.acquiredDate) : null,
    );
    const [gyldigTil, setGyldigTil] = useState(
        gjeldendeElement?.expiryDate ? new Date(gjeldendeElement.expiryDate) : null,
    );
    const [kreverDato, setKreverDato] = useState(!!gjeldendeElement?.acquiredDate);
    const [valgtForerkortError, setValgtForerkortError] = useState(false);
    const [gyldigFraError, setGyldigFraError] = useState(false);
    const [gyldigFraIsAfterError, setGyldigFraIsAfterError] = useState(false);
    const [gyldigFraIsValidDateError, setGyldigFraIsValidDateError] = useState(false);
    const [gyldigTilError, setGyldigTilError] = useState(false);
    const [gyldigTilIsAfterError, setGyldigTilIsAfterError] = useState(false);
    const [gyldigTilIsValidDateError, setGyldigTilIsValidDateError] = useState(false);
    const [isLagre, setIsLagre] = useState(false);

    const { gyldigeFørerkort } = førerkortData;

    useEffect(() => {
        const oppdaterFørerkort = (førerkort) => setValgtFørerkort(førerkort);
        oppdaterFørerkort(gjeldendeElement || []);
    }, [gjeldendeElement]);

    const velgFørerkort = (verdi) => {
        const funnetFørerkort = gyldigeFørerkort.find((e) => e.type === verdi);
        setValgtFørerkort(funnetFørerkort);
        setKreverDato(funnetFørerkort?.kreverDato || false);
        setValgtForerkortError(false);
    };

    const lagre = async () => {
        setIsLagre(true);
        if (!valgtFørerkort || valgtFørerkort.length === 0) setValgtForerkortError(true);
        if (kreverDato && !gyldigFra) setGyldigFraError(true);
        if (kreverDato && !gyldigTil) setGyldigTilError(true);

        const datoFeil =
            gyldigFraIsAfterError ||
            gyldigFraIsValidDateError ||
            gyldigTilError ||
            gyldigTilIsAfterError ||
            gyldigTilIsValidDateError;

        if (kreverDato && datoFeil) return;

        if (valgtFørerkort && valgtFørerkort.length !== 0 && (kreverDato ? gyldigFra && gyldigTil : true)) {
            lagreElement({
                type: valgtFørerkort.label || valgtFørerkort.type,
                acquiredDate: gyldigFra,
                expiryDate: gyldigTil,
            });
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til førerkort"
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            overflowVisible
        >
            <VStack>
                <Select
                    id="Førerkort"
                    label="Førerkort"
                    description="Må fylles ut"
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
                            isEmptyError={gyldigFraError}
                            setIsEmptyError={setGyldigFraError}
                            isAfterError={gyldigFraIsAfterError}
                            setIsAfterError={setGyldigFraIsAfterError}
                            isValidDateError={gyldigFraIsValidDateError}
                            setIsValidDateError={setGyldigFraIsValidDateError}
                            isLagre={isLagre}
                            setIsLagre={setIsLagre}
                        />
                        <Datovelger
                            valgtDato={gyldigTil}
                            oppdaterDato={setGyldigTil}
                            label="Gyldig til"
                            obligatorisk
                            fremtid
                            isEmptyError={gyldigTilError}
                            setIsEmptyError={setGyldigTilError}
                            isAfterError={gyldigTilIsAfterError}
                            setIsAfterError={setGyldigTilIsAfterError}
                            isValidDateError={gyldigTilIsValidDateError}
                            setIsValidDateError={setGyldigTilIsValidDateError}
                            isLagre={isLagre}
                            setIsLagre={setIsLagre}
                        />
                    </HStack>
                )}
            </VStack>
        </CvModalForm>
    );
}
