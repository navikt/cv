// eslint-disable-next-line camelcase
import { Alert, BodyLong, Chips, UNSAFE_Combobox, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useTypeahead } from "@/app/_common/hooks/swr/useTypeahead";

export function Typeahead({
    id = undefined,
    type,
    oppdaterValg,
    valgtVerdi,
    label,
    description,
    visningsfelt = "title",
    multiselect = false,
    forhåndshentet = false,
    className,
    placeholder,
    multiselectText,
    error,
}) {
    let alleredeValgte;

    if (multiselect) {
        alleredeValgte = valgtVerdi.map((e) => e[visningsfelt]);
    } else if (valgtVerdi) {
        alleredeValgte = [valgtVerdi];
    } else {
        alleredeValgte = [];
    }

    const { typeaheadforslag, typeaheadLaster, typeaheadHarFeil, oppdaterTypeahead, velgVerdi } = useTypeahead(
        type,
        visningsfelt,
        forhåndshentet,
        alleredeValgte,
        oppdaterValg,
    );

    return (
        <VStack className={className}>
            {typeaheadHarFeil && (
                <Alert aria-live="polite" role="alert" className={styles.mb3} variant="error">
                    Det har oppstått en feil ved henting av forslag, vennligst prøv igjen.
                </Alert>
            )}
            <UNSAFE_Combobox
                id={id}
                label={label}
                description={description}
                options={typeaheadforslag}
                filteredOptions={typeaheadforslag}
                shouldAutocomplete={false}
                isMultiSelect={false}
                selectedOptions={alleredeValgte}
                shouldShowSelectedOptions={!multiselect}
                onChange={(verdi) => oppdaterTypeahead(verdi || "")}
                onToggleSelected={(verdi, isSelected) => velgVerdi(verdi, isSelected)}
                placeholder={placeholder || "Søk og velg et alternativ"}
                isLoading={typeaheadLaster}
                error={error}
            />
            {multiselect && (
                <VStack className={styles.mt6}>
                    {alleredeValgte.length === 0 ? (
                        <BodyLong weight="regular" size="small" className={styles.mb3}>
                            {`Du har ikke lagt til noen ${multiselectText.toLowerCase()}`}
                        </BodyLong>
                    ) : (
                        <VStack>
                            <BodyLong weight="regular" size="small" className={styles.mb3}>
                                {`${multiselectText} du har lagt til:`}
                            </BodyLong>
                            <Chips>
                                {alleredeValgte.map((valg) => (
                                    <Chips.Removable key={valg} onClick={() => velgVerdi(valg, false)}>
                                        {valg}
                                    </Chips.Removable>
                                ))}
                            </Chips>
                        </VStack>
                    )}
                </VStack>
            )}
        </VStack>
    );
}
