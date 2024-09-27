import { UNSAFE_Combobox } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { mapTypeaheadResponse } from "@/app/utils/fetchUtils";

// TODO: Bytt mock med url ved kobling mot backend
export const Typeahead = ({
    mockData,
    oppdaterValg,
    valgtVerdi,
    label,
    description,
    multiselect,
    forhåndshentet = false,
    className,
}) => {
    const [typeaheadData, setTypeaheadData] = useState([]);
    const [typeaheadValg, setTypeaheadValg] = useState([]);

    useEffect(() => {
        if (forhåndshentet) hentTypeaheadData();
    }, []);

    useEffect(() => {
        if (!forhåndshentet) setTypeaheadValg(typeaheadData.map((e) => e.title));
    }, [typeaheadData]);

    const oppdaterTypeahead = (verdi) => {
        if (!verdi) return;

        if (forhåndshentet) {
            const filtrertTypeahead = typeaheadData
                .map((e) => e.title)
                .filter((e) => e.toLowerCase().includes(verdi.toLowerCase()));
            setTypeaheadValg(filtrertTypeahead);
        } else {
            hentTypeaheadData(verdi);
        }
    };

    const hentTypeaheadData = (verdi) => {
        // TODO: Hent fra URL
        const data = mapTypeaheadResponse(mockData);
        setTypeaheadData(data);
        setTypeaheadValg(data.map((e) => e.title));
    };

    const velgVerdi = (verdi) => {
        const valgtTypeahead = typeaheadData.find((e) => e.title === verdi);
        oppdaterValg(valgtTypeahead);
    };

    return (
        <UNSAFE_Combobox
            className={className}
            label={label}
            description={description}
            options={typeaheadValg}
            filteredOptions={typeaheadValg}
            shouldAutocomplete={false}
            isMultiSelect={multiselect || false}
            defaultValue={valgtVerdi || ""}
            onChange={(e) => oppdaterTypeahead(e?.target?.value || "")}
            onToggleSelected={(e) => velgVerdi(e)}
        />
    );
};
