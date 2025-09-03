import { DatePicker, HStack, useDatepicker, VStack } from "@navikt/ds-react";
import { useEffect, useRef } from "react";
import { hentDatoMedÅrsforskjell } from "@/app/_common/utils/validationHelper";
import styles from "@/app/page.module.css";

export function DatovelgerWithoutValidation({
    id,
    name,
    label,
    fremtid = false,
    defaultSelected = undefined,
    className,
    error = undefined,
    revalidate = () => {},
}) {
    const inputRef = useRef();
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
        onDateChange: (e) => {
            if (inputRef.current && e instanceof Date) {
                try {
                    inputRef.current.value = e.toLocaleDateString("no-nb", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                    // Don`t do anything here
                    // eslint-disable-next-line no-empty
                } catch (err) {}
            }

            revalidate();
        },
    });

    return (
        <VStack className={className}>
            <HStack gap="4" className={styles.datepicker}>
                <DatePicker {...datepickerProps} dropdownCaption>
                    <DatePicker.Input
                        ref={inputRef}
                        {...inputProps}
                        id={id}
                        name={name}
                        label={label}
                        placeholder="dd.mm.yyyy"
                        error={error}
                    />
                </DatePicker>
            </HStack>
        </VStack>
    );
}
