"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";

export const useHentArbeidsforhold = ({ oppdateringLaster, triggerOppdatering }) => {
    const { suksessNotifikasjon, errorNotifikasjon } = useContext(ApplicationContext);
    const [skalHenteData, setSkalHenteData] = useState(false);
    const [aaregManglerData, setAaregManglerData] = useState(false);
    const [skalViseSkeleton, setSkalViseSkeleton] = useState(false);

    useEffect(() => {
        if (oppdateringLaster === false) setSkalViseSkeleton(false);
    }, [oppdateringLaster]);

    const fetcher = async (url) => {
        const response = await simpleApiRequest(url, "GET");

        if (!response.ok) {
            errorNotifikasjon("Det oppstod en feil ved henting av tidligere arbeidsforhold");
            const error = new Error(`Det oppstod en feil ved henting av arbeidsforhold fra AAREG.`);
            error.status = response.status;
            setSkalHenteData(false);
            throw error;
        }

        const data = await response.json();

        if (data?.length === 0) {
            setAaregManglerData(true);
            setSkalViseSkeleton(false);
        } else {
            setSkalViseSkeleton(true);
            triggerOppdatering(data);
        }

        setSkalHenteData(false);
        suksessNotifikasjon("Tidligere arbeidsforhold ble hentet");
        return data;
    };

    const { data, error, isLoading } = useSWR(skalHenteData ? `/min-cv/api/arbeidsforhold` : null, fetcher);

    return {
        aaregSuksess: !!data && !error,
        aaregManglerData: aaregManglerData,
        aaregLaster: isLoading || (skalViseSkeleton && oppdateringLaster),
        aaregHarFeil: error,
        setSkalHenteData,
    };
};
