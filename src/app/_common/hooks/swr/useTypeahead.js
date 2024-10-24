"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";
import { useContext, useMemo, useState } from "react";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { debounce } from "@navikt/ds-react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";

export const useTypeahead = (type, visningsfelt, forhåndshentet, alleredeValgte, oppdaterValg) => {
    const { errorNotifikasjon } = useContext(ApplicationContext);
    const [typeaheadverdi, setTypeaheadverdi] = useState("");
    const [typeaheadforslag, setTypeaheadforslag] = useState([]);
    const debouncedSetTypeaheadverdi = useMemo(() => debounce(setTypeaheadverdi, 200), []);

    const fetcher = async (url) => {
        const response = await simpleApiRequest(url, "GET", null, false);

        if (!response.ok) {
            errorNotifikasjon("Det skjedde en feil ved henting av typeahead-data");
            const error = Error(`Det skjedde en feil ved henting av typeahead ${type}`);
            error.status = response.status;
            throw error;
        }

        const data = await response.json();

        const mappetData = data.map((treff) => ({
            ...treff,
            [visningsfelt]: treff.label || treff.term || treff.location,
            conceptId: treff.konseptId,
        }));

        oppdaterTypeaheadForslag(mappetData.map((e) => e[visningsfelt]));
        return mappetData;
    };

    const oppdaterTypeahead = (verdi) => {
        if (!verdi) return;

        if (forhåndshentet) {
            const filtrertTypeahead = typeaheadforslag
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

    const url = skalHente ? `/personbruker/api/typeahead/${type}/${query}` : null;

    const { data, error, isLoading } = useSWR(url, fetcher, { fallbackData: [] });

    const velgVerdi = (verdi, erValgt) => {
        const valgtTypeahead = data.find((e) => e[visningsfelt] === verdi) || { [visningsfelt]: verdi };
        oppdaterValg(valgtTypeahead, erValgt);
    };

    return {
        typeaheadforslag,
        typeaheadLaster: isLoading,
        typeaheadHarFeil: error,
        oppdaterTypeahead,
        velgVerdi,
    };
};
