import { BodyLong, DatePicker, HStack, useDatepicker, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";

export const Datovelger = ({ valgtDato, oppdaterDato, label, fremtid = false, obligatorisk = false }) => {
    const [error, setError] = useState(false);

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
        onDateChange: (val) => oppdaterDato(val),
        onValidate: (val) => setError(!val.isValidDate),
    });

    return (
        <VStack>
            <BodyLong>
                <b>{label}</b> {obligatorisk && "*obligatorisk"}
            </BodyLong>
            <HStack gap="4">
                <DatePicker {...datepickerProps} dropdownCaption>
                    <DatePicker.Input {...inputProps} placeholder={"dd.mm.yy"} error={error && "Dato er ikke gyldig"} />
                </DatePicker>
            </HStack>
        </VStack>
    );
};
