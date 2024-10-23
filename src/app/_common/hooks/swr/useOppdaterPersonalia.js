"use client";

import useSWR, { mutate } from "swr";
import { putAPI } from "@/app/_common/utils/fetchUtils";
import { PERSON_KEY, usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useState } from "react";

export const useOppdaterPersonalia = () => {
    const [dataForOppdatering, oppdaterMedData] = useState(null);

    const { person } = usePerson();

    const fetcher = async ({ url, body }) => {
        if (!url || !body) return;

        const response = await putAPI(url, body);
        await mutate(PERSON_KEY, { ...person, personalia: response }, { revalidate: false });
        return true;
    };

    const skalOppdatere = !!dataForOppdatering;
    const url = "personbruker/api/personalia";

    const { data, error, isLoading } = useSWR(skalOppdatere ? { url, body: dataForOppdatering } : null, fetcher);

    return { oppdateringOk: data, laster: isLoading, feilet: error, oppdaterMedData };
};
