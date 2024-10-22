"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";
import {useState} from "react";

export const useHentArbeidsforhold = (oppdaterArbeidsforhold) => {
    const [skalHenteData, setSkalHenteData] = useState(false);

    const fetcher = async (url) => {
        const response = await simpleApiRequest(url, "GET");

        if (!response.ok) {
            const error = new Error(`Det oppstod en feil ved henting av arbeidsforhold fra AAREG.`);
            error.status = response.status;
            throw error;
        }

        const data = await response.json()
        oppdaterArbeidsforhold(data)
        return data
    };

    const { data, error, isLoading } = useSWR(skalHenteData ? `/personbruker/api/arbeidsforhold` : null, fetcher);

    return {
        aaregSuksess:!!data && !error,
        aaregManglerData: data?.length === 0,
        aaregLaster: isLoading,
        aaregHarFeil: error,
        setSkalHenteData
    };
};
