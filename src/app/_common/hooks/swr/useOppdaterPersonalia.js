"use client";

import useSWR, { mutate } from "swr";
import { putAPI } from "@/app/_common/utils/fetchUtils";
import { PERSON_KEY, usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";

export const useOppdaterPersonalia = () => {
    const { suksessNotifikasjon, errorNotifikasjon } = useContext(ApplicationContext);
    const [dataForOppdatering, oppdaterSeksjon] = useState(null);
    const [visFeilmelding, setVisFeilmelding] = useState(false);

    const { person } = usePerson();

    const fetcher = async ({ url, body }) => {
        if (!url || !body) return;

        setVisFeilmelding(false);

        try {
            const response = await putAPI(url, body);
            await mutate(PERSON_KEY, { ...person, personalia: response }, { revalidate: false });
            suksessNotifikasjon("Personalia er oppdatert");
            return true;
        } catch (error) {
            errorNotifikasjon("Det oppstod en feil ved lagring");
            setVisFeilmelding(true);
            throw error;
        }
    };

    const skalOppdatere = !!dataForOppdatering;
    const url = "personbruker/api/personalia";

    const { data, error, isLoading } = useSWR(skalOppdatere ? { url, body: dataForOppdatering } : null, fetcher);

    return {
        oppdateringSuksess: data,
        oppdateringLaster: isLoading,
        oppdateringHarFeil: visFeilmelding || error,
        oppdaterSeksjon,
        setVisFeilmelding,
    };
};
