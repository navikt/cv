import { UNSAFE_Combobox } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { hentTypeahead } from "@/app/_common/utils/fetchUtils";

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
        const alleForslag = [...hentAlleredeValgteVerdier(), ...forslag];
        setTypeaheadForslag([...new Set(alleForslag)]);
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
        <UNSAFE_Combobox
            className={className}
            label={label}
            description={description}
            options={typeaheadForslag}
            filteredOptions={typeaheadForslag}
            shouldAutocomplete={false}
            isMultiSelect={multiselect || false}
            selectedOptions={hentAlleredeValgteVerdier()}
            onChange={(e) => oppdaterTypeahead(e?.target?.value || "")}
            onToggleSelected={(e, isSelected) => velgVerdi(e, isSelected)}
        />
    );
};
