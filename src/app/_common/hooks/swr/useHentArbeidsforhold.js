"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";

export const useHentArbeidsforhold = (oppdaterArbeidsforhold) => {
    const { suksessNotifikasjon, errorNotifikasjon } = useContext(ApplicationContext);
    const [skalHenteData, setSkalHenteData] = useState(false);

    const fetcher = async (url) => {
        const response = await simpleApiRequest(url, "GET");

        if (!response.ok) {
            errorNotifikasjon("Det oppstod en feil ved henting av tidligere arbeidsforhold");
            const error = new Error(`Det oppstod en feil ved henting av arbeidsforhold fra AAREG.`);
            error.status = response.status;
            throw error;
        }

        const data = await response.json();
        oppdaterArbeidsforhold(data);
        setSkalHenteData(false);
        suksessNotifikasjon("Tidligere arbeidsforhold ble hentet");
        return data;
    };

    const { data, error, isLoading } = useSWR(skalHenteData ? `/personbruker/api/arbeidsforhold` : null, fetcher);

    return {
        aaregSuksess: !!data && !error,
        aaregManglerData: data?.length === 0,
        aaregLaster: isLoading,
        aaregHarFeil: error,
        setSkalHenteData,
    };
};
