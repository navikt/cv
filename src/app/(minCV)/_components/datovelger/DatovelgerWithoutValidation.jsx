import { DatePicker, HStack, useDatepicker, VStack } from "@navikt/ds-react";
import { useEffect } from "react";
import { hentDatoMedÅrsforskjell } from "@/app/_common/utils/validationHelper";

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
            try {
                setSelected(new Date(defaultSelected));
            } catch (err) {
                setSelected(undefined);
            }
        }
    }, [defaultSelected]);

    const { datepickerProps, inputProps, setSelected } = useDatepicker({
        fromDate: hentDatoMedÅrsforskjell(-70),
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
