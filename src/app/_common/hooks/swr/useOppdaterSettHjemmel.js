"use client";

import useSWR, { mutate } from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";
import { PERSON_KEY } from "@/app/_common/hooks/swr/usePerson";
import { useContext } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";

export const useOppdaterSettHjemmel = (skalOppdatere) => {
    const { errorNotifikasjon } = useContext(ApplicationContext);
    const fetcher = async (url) => {
        const response = await simpleApiRequest(url, "POST");

        if (!response.ok) {
            errorNotifikasjon("Det oppstod en feil ved bekreftelse av sett hjemmel");
            const error = Error(`Det skjedde en feil under kall til ${url}`);
            error.status = response.status;
            throw error;
        }

        await mutate(PERSON_KEY);
        return true;
    };

    const { data, error, isLoading } = useSWR(skalOppdatere ? `/personbruker/api/samtykke` : null, fetcher);

    return {
        settHjemmelSuksess: data,
        settHjemmelLaster: isLoading,
        settHjemmelHarFeil: error,
    };
};
