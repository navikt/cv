import { DatePicker, HStack, useDatepicker, VStack } from "@navikt/ds-react";
import { useEffect } from "react";

export function Datovelger({
    valgtDato,
    oppdaterDato,
    label,
    fremtid = false,
    obligatorisk = false,
    className,
    isEmptyError,
    setIsEmptyError,
    isAfterError,
    setIsAfterError,
    isValidDateError,
    setIsValidDateError,
    isLagre,
    setIsLagre,
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
            setIsEmptyError(false);
            setIsValidDateError(false);
            setIsAfterError(false);
            setIsLagre(false);
        },
        onValidate: (val) => {
            if (val.isAfter) {
                setIsAfterError(true);
            }
            if (!val.isEmpty) {
                setIsValidDateError(!val.isValidDate);
            }
            if (obligatorisk && val.isEmpty) {
                setIsEmptyError(true);
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
                        error={
                            (isLagre && isAfterError && "Dato er frem i tid") ||
                            (isLagre && isValidDateError && "Dato er ikke gyldig") ||
                            (isLagre && isEmptyError && "Dato må fylles ut")
                        }
                    />
                </DatePicker>
            </HStack>
        </VStack>
    );
}
