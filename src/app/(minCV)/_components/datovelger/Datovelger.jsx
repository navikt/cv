import { DatePicker, HStack, useDatepicker, VStack } from "@navikt/ds-react";
import { useEffect } from "react";

export function Datovelger({
    valgtDato,
    oppdaterDato,
    label,
    fremtid = false,
    obligatorisk = false,
    className,
    error,
    setError,
}) {
    useEffect(() => {
        const oppdaterDatepickerDato = (dato) => setSelected(dato);
        if (valgtDato && valgtDato !== selectedDay) oppdaterDatepickerDato(valgtDato);
    }, [valgtDato]);

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
            setError(false);
        },
        onValidate: (val) => {
            if (!val.isEmpty) {
                setError(!val.isValidDate);
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
                        description={obligatorisk ? "*obligatorisk" : undefined}
                        placeholder="dd.mm.yy"
                        error={error && "Dato er ikke gyldig"}
                    />
                </DatePicker>
            </HStack>
        </VStack>
    );
}
