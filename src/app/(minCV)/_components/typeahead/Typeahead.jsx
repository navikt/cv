import { UNSAFE_Combobox } from "@navikt/ds-react";
import {useEffect, useState} from "react";
import {mapTypeaheadResponse} from "@/app/utils/fetchUtils";

// TODO: Bytt mock med url ved kobling mot backend
export const Typeahead = ({ mockData, oppdaterValg, valgtVerdi, label, description, multiselect }) => {
    const [typeahead, setTypeahead] = useState([]);

    const hentTypeahead = () => {
        // TODO: Hent fra URL
        const data = mapTypeaheadResponse(mockData)
        setTypeahead(data);
    };

    const mapTypeahead = (typeaheadVerdier) => {
        return typeaheadVerdier.map((verdi) => verdi.title);
    };

    const velgVerdi = (verdi) => {
        const valgtTypeahead = typeahead.find((e) => e.title === verdi);
        oppdaterValg(valgtTypeahead);
    };

    return (
        <UNSAFE_Combobox
            label={label}
            description={description}
            options={mapTypeahead(typeahead)}
            filteredOptions={mapTypeahead(typeahead)}
            shouldAutocomplete={false}
            isMultiSelect={multiselect || false}
            defaultValue={valgtVerdi || ""}
            onChange={(e) => hentTypeahead(e?.target?.value || "")}
            onToggleSelected={(e) => velgVerdi(e)}
        />
    );
};
