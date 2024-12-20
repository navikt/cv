"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";
import { useMemo, useState } from "react";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { debounce } from "@navikt/ds-react";

export const useTypeahead = (type, visningsfelt, forhåndshentet, alleredeValgte, oppdaterValg) => {
    const [typeaheadverdi, setTypeaheadverdi] = useState("");
    const [typeaheadforslag, setTypeaheadforslag] = useState([]);
    const [typeaheaddataFraBackend, setTypeaheaddataFraBackend] = useState([]);
    const debouncedSetTypeaheadverdi = useMemo(() => debounce(setTypeaheadverdi, 200), []);
    const [harHattFeil, setHarHattFeil] = useState(false);

    const fetcher = async (url) => {
        const response = await simpleApiRequest(url, "GET", null, false);

        if (!response.ok) {
            const error = Error(`Det skjedde en feil ved henting av typeahead ${type}`);
            error.status = response.status;
            setHarHattFeil(true);
            throw error;
        }

        setHarHattFeil(false);

        const data = await response.json();

        const mappetData = data.map((treff) => ({
            ...treff,
            [visningsfelt]: treff.label || treff.term || treff.location,
            conceptId: treff.konseptId,
        }));

        oppdaterTypeaheadForslag(mappetData.map((e) => e[visningsfelt]));
        setTypeaheaddataFraBackend(mappetData);
        return mappetData;
    };

    const oppdaterTypeahead = (verdi) => {
        if (!verdi) return;

        if (forhåndshentet) {
            const filtrertTypeahead = typeaheaddataFraBackend
                .map((e) => e[visningsfelt])
                .filter((e) => e.toLowerCase().includes(verdi.toLowerCase()));
            oppdaterTypeaheadForslag(filtrertTypeahead);
        } else {
            debouncedSetTypeaheadverdi(verdi);
        }
    };

    const oppdaterTypeaheadForslag = (forslag) => {
        const filtrerteForslag = forslag.filter((e) => !alleredeValgte.includes(e));
        setTypeaheadforslag([...new Set(filtrerteForslag)]);
    };

    const skalHente = type === TypeaheadEnum.SPRÅK || typeaheadverdi?.length >= 2;
    const query = type !== TypeaheadEnum.SPRÅK ? encodeURIComponent(typeaheadverdi) : "";

    const url = skalHente ? `/min-cv/api/typeahead/${type}/${query}` : null;

    const { data, error, isLoading } = useSWR(url, fetcher, { fallbackData: [] });

    const velgVerdi = (verdi, erValgt) => {
        const valgtTypeahead = data.find((e) => e[visningsfelt] === verdi) || { [visningsfelt]: verdi };
        oppdaterValg(valgtTypeahead, erValgt);
    };

    return {
        typeaheadforslag,
        typeaheadLaster: isLoading,
        typeaheadHarFeil: error || (harHattFeil && isLoading),
        oppdaterTypeahead,
        velgVerdi,
    };
};
