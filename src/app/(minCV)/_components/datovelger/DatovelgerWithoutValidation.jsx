import { DatePicker, HStack, useDatepicker, VStack } from "@navikt/ds-react";
import { useEffect } from "react";

export function DatovelgerWithoutValidation({
    id,
    name,
    label,
    fremtid = false,
    defaultSelected = undefined,
    className,
    error = undefined,
    onBlur = undefined,
}) {
    useEffect(() => {
        if (defaultSelected) {
            setSelected(new Date(defaultSelected));
        }
    }, [defaultSelected]);

    const hentDatoMedÅrsforskjell = (deltaÅr) => {
        const dato = new Date();
        dato.setFullYear(dato.getFullYear() + deltaÅr);
        return dato;
    };

    const { datepickerProps, inputProps, setSelected } = useDatepicker({
        fromDate: hentDatoMedÅrsforskjell(-50),
        toDate: hentDatoMedÅrsforskjell(fremtid ? 25 : 0),
    });

    return (
        <VStack className={className}>
            <HStack gap="4">
                <DatePicker {...datepickerProps} dropdownCaption>
                    <DatePicker.Input
                        {...inputProps}
                        id={id}
                        name={name}
                        label={label}
                        placeholder="dd.mm.yyyy"
                        error={error}
                        onBlur={onBlur}
                    />
                </DatePicker>
            </HStack>
        </VStack>
    );
}
