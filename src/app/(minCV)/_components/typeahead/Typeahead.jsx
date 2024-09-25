import { UNSAFE_Combobox } from "@navikt/ds-react";
import { useState } from "react";

// TODO: Bytt mock med url ved kobling mot backend
export const Typeahead = ({ mockData, oppdaterValg, visningsfelt, valgtVerdi }) => {
    const [typeahead, setTypeahead] = useState([]);

    const hentTypeahead = (verdi) => {
        // TODO: Hent fra URL
        setTypeahead(mockData);
    };

    const mapTypeahead = (typeaheadVerdier, felt) => {
        return typeaheadVerdier.map((verdi) => verdi[felt]);
    };

    const velgVerdi = (verdi) => {
        const valgtTypeahead = typeahead.find((e) => e[visningsfelt] === verdi);
        oppdaterValg(valgtTypeahead);
    };

    return (
        <UNSAFE_Combobox
            label="Fagdokumentasjon"
            description="Må fylles ut"
            options={mapTypeahead(typeahead, visningsfelt)}
            filteredOptions={mapTypeahead(typeahead, visningsfelt)}
            shouldAutocomplete={false}
            defaultValue={valgtVerdi || ""}
            onChange={(e) => hentTypeahead(e?.target?.value || "")}
            onToggleSelected={(e) => velgVerdi(e)}
        />
    );
};
