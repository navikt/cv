import { BodyShort, Checkbox, CheckboxGroup, HStack, TextField, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { CvModalForm } from "@/app/_common/components/CvModalForm";

export function AndreErfaringerModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [beskrivelse, setBeskrivelse] = useState("");
    const [rolle, setRolle] = useState("");
    const [pågår, setPågår] = useState([]);
    const [startdato, setStartdato] = useState(null);
    const [sluttdato, setSluttdato] = useState(null);

    const [rolleError, setRolleError] = useState(false);
    const [startdatoError, setStartdatoError] = useState(false);
    const [startdatoIsAfterError, setStartdatoIsAfterError] = useState(false);
    const [startdatoIsValidDateError, setStartdatoIsValidDateError] = useState(false);
    const [sluttdatoError, setSluttdatoError] = useState(false);
    const [sluttdatoIsAfterError, setSluttdatoIsAfterError] = useState(false);
    const [sluttdatoIsValidDateError, setSluttdatoIsValidDateError] = useState(false);

    const [isLagre, setIsLagre] = useState(false);

    useEffect(() => {
        const oppdaterErfaring = (erfaring) => {
            setRolle(erfaring?.role || "");
            setBeskrivelse(erfaring?.description || "");
            setStartdato(erfaring ? new Date(erfaring.fromDate) : null);
            setSluttdato(erfaring && erfaring?.toDate ? new Date(erfaring.toDate) : null);
            setPågår(erfaring && erfaring.ongoing ? ["true"] : []);
        };

        oppdaterErfaring(gjeldendeElement);
    }, [gjeldendeElement]);

    const lagre = () => {
        setIsLagre(true);
        const erPågående = pågår.includes("true");

        if (!rolle) setRolleError(true);
        if (!startdato) setStartdatoError(true);
        if (!erPågående && !sluttdato) setSluttdatoError(true);

        if (
            rolle &&
            startdato &&
            (sluttdato || erPågående) &&
            !startdatoIsAfterError &&
            !startdatoIsValidDateError &&
            !sluttdatoIsAfterError &&
            !sluttdatoIsValidDateError
        ) {
            lagreElement({
                ...gjeldendeElement,
                role: rolle,
                description: beskrivelse,
                fromDate: startdato,
                toDate: erPågående ? null : sluttdato,
                ongoing: erPågående,
            });
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til annen erfaring"
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
        >
            <TextField
                label={
                    <HStack gap="2">
                        <BodyShort weight="semibold">Rolle</BodyShort>
                        <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                    </HStack>
                }
                description="Eksempel: militærtjeneste, styreverv eller fotballtrener"
                className={styles.mb6}
                value={rolle}
                onChange={(e) => {
                    setRolle(e.target.value);
                    setRolleError(false);
                }}
                error={rolleError && "Du må skrive inn rolle"}
            />
            <TextField
                label="Beskrivelse"
                description="Eksempel: 5 års erfaring som fotballtrener for guttelag i Oslo"
                className={styles.mb6}
                value={beskrivelse}
                onChange={(e) => setBeskrivelse(e.target.value)}
            />
            <CheckboxGroup legend="" className={styles.mb6} value={pågår} onChange={setPågår}>
                <Checkbox value="true">Pågår</Checkbox>
            </CheckboxGroup>

            <HStack gap="8">
                <Datovelger
                    valgtDato={startdato}
                    oppdaterDato={setStartdato}
                    label={
                        <VStack>
                            <BodyShort weight="semibold">Fra dato</BodyShort>
                            <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                        </VStack>
                    }
                    obligatorisk
                    isEmptyError={startdatoError}
                    setIsEmptyError={setStartdatoError}
                    isAfterError={startdatoIsAfterError}
                    setIsAfterError={setStartdatoIsAfterError}
                    isValidDateError={startdatoIsValidDateError}
                    setIsValidDateError={setStartdatoIsValidDateError}
                    isLagre={isLagre}
                    setIsLagre={setIsLagre}
                />

                {!pågår.includes("true") && (
                    <Datovelger
                        valgtDato={sluttdato}
                        oppdaterDato={setSluttdato}
                        label={
                            <VStack>
                                <BodyShort weight="semibold">Til dato</BodyShort>
                                <BodyShort className={styles.mandatoryColor}>Må fylles ut</BodyShort>
                            </VStack>
                        }
                        obligatorisk
                        isEmptyError={sluttdatoError}
                        setIsEmptyError={setSluttdatoError}
                        isAfterError={sluttdatoIsAfterError}
                        setIsAfterError={setSluttdatoIsAfterError}
                        isValidDateError={sluttdatoIsValidDateError}
                        setIsValidDateError={setSluttdatoIsValidDateError}
                        isLagre={isLagre}
                        setIsLagre={setIsLagre}
                    />
                )}
            </HStack>
        </CvModalForm>
    );
}
