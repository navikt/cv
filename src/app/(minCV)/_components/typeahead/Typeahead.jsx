import { BodyLong, Chips, HStack, UNSAFE_Combobox, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { hentTypeahead } from "@/app/_common/utils/fetchUtils";
import styles from "@/app/page.module.css";

export const Typeahead = ({
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
}) => {
    const [typeaheadData, setTypeaheadData] = useState([]);
    const [typeaheadForslag, setTypeaheadForslag] = useState([]);

    useEffect(() => {
        if (forhåndshentet) hentTypeaheadData();
    }, []);

    useEffect(() => {
        if (!forhåndshentet) oppdaterTypeaheadForslag(typeaheadData.map((e) => e[visningsfelt]));
    }, [typeaheadData, valgtVerdi]);

    const oppdaterTypeahead = (verdi) => {
        if (!verdi) return;

        if (forhåndshentet) {
            const filtrertTypeahead = typeaheadData
                .map((e) => e[visningsfelt])
                .filter((e) => e.toLowerCase().includes(verdi.toLowerCase()));
            oppdaterTypeaheadForslag(filtrertTypeahead);
        } else {
            hentTypeaheadData(verdi);
        }
    };

    const hentTypeaheadData = async (verdi) => {
        const data = await hentTypeahead(verdi, type, visningsfelt);
        setTypeaheadData(data);
        oppdaterTypeaheadForslag(data.map((e) => e[visningsfelt]));
    };

    const oppdaterTypeaheadForslag = (forslag) => {
        const filtrerteForslag = forslag.filter((e) => !hentAlleredeValgteVerdier().includes(e));
        setTypeaheadForslag([...new Set(filtrerteForslag)]);
    };

    const velgVerdi = (verdi, erValgt) => {
        const valgtTypeahead = typeaheadData.find((e) => e[visningsfelt] === verdi) || { [visningsfelt]: verdi };
        oppdaterValg(valgtTypeahead, erValgt);
    };

    const hentAlleredeValgteVerdier = () => {
        if (multiselect) return valgtVerdi.map((e) => e[visningsfelt]);
        return valgtVerdi ? [valgtVerdi] : [];
    };

    return (
        <VStack className={className}>
            <UNSAFE_Combobox
                label={label}
                description={description}
                options={typeaheadForslag}
                filteredOptions={typeaheadForslag}
                shouldAutocomplete={false}
                isMultiSelect={false}
                selectedOptions={hentAlleredeValgteVerdier()}
                shouldShowSelectedOptions={!multiselect}
                onChange={(e) => oppdaterTypeahead(e?.target?.value || "")}
                onToggleSelected={(e, isSelected) => velgVerdi(e, isSelected)}
                placeholder={placeholder || "Søk og velg et alternativ"}
            />
            {multiselect && (
                <VStack className={styles.mt6}>
                    {hentAlleredeValgteVerdier().length === 0 ? (
                        <BodyLong weight="semibold" size={"small"}>
                            {`Du har ikke lagt til noen ${multiselectText.toLowerCase()}`}
                        </BodyLong>
                    ) : (
                        <VStack>
                            <BodyLong weight="semibold" className={styles.mb3} size={"small"}>
                                {`${multiselectText} du har lagt til:`}
                            </BodyLong>
                            <Chips>
                                {hentAlleredeValgteVerdier().map((valg) => (
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
};
