import { DatePicker, HStack, useDatepicker, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";

const DatoFeilTypeEnum = Object.freeze({
    ER_ETTER: "Dato er frem i tid",
    UGYLDIG: "Dato er ikke gyldig",
    TOM_DATO: "Dato må fylles ut",
});

export function Datovelger({
    valgtDato,
    oppdaterDato,
    label,
    fremtid = false,
    obligatorisk = false,
    className,
    setError,
    skalViseFeilmelding,
    setSkalViseFeilmelding,
}) {
    const [feiltype, setFeiltype] = useState(null);

    useEffect(() => {
        const oppdaterDatepickerDato = (dato) => setSelected(dato);
        if (valgtDato && valgtDato !== selectedDay) oppdaterDatepickerDato(valgtDato);
        if (obligatorisk && !valgtDato) setFeiltype(DatoFeilTypeEnum.TOM_DATO);
    }, [valgtDato]);

    useEffect(() => {
        if (feiltype) setError(true);
        else setError(false);
    }, [feiltype]);

    const hentDatoMedÅrsforskjell = (deltaÅr) => {
        const dato = new Date();
        dato.setFullYear(dato.getFullYear() + deltaÅr);
        return dato;
    };

    const { datepickerProps, inputProps, selectedDay, setSelected } = useDatepicker({
        fromDate: hentDatoMedÅrsforskjell(-50),
        toDate: hentDatoMedÅrsforskjell(fremtid ? 25 : 0),
        onDateChange: (val) => {
            oppdaterDato(val);
            setFeiltype(null);
            setSkalViseFeilmelding(false);
        },
        onValidate: (val) => {
            if (val.isAfter) {
                setFeiltype(DatoFeilTypeEnum.ER_ETTER);
            } else if (!val.isEmpty && !val.isValidDate) {
                setFeiltype(DatoFeilTypeEnum.UGYLDIG);
            } else if (obligatorisk && val.isEmpty) {
                setFeiltype(DatoFeilTypeEnum.TOM_DATO);
            }
        },
    });

    return (
        <VStack className={className}>
            <HStack gap="4">
                <DatePicker {...datepickerProps} dropdownCaption>
                    <DatePicker.Input
                        {...inputProps}
                        label={label}
                        placeholder="dd.mm.yy"
                        error={skalViseFeilmelding && feiltype}
                    />
                </DatePicker>
            </HStack>
        </VStack>
    );
}
