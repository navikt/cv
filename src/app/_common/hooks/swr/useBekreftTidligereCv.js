"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";

export const useBekreftTidligereCv = () => {
    const { suksessNotifikasjon, errorNotifikasjon } = useContext(ApplicationContext);
    const [bekreft, setBekreft] = useState(false);

    const fetcher = async (url) => {
        const response = await simpleApiRequest(url, "POST");
        if (!response.ok) {
            errorNotifikasjon("Det oppstod en feil ved deling av CV");
            return false;
        }

        suksessNotifikasjon("CV-en din ble delt med Nav");
        return true;
    };

    const { data, error, isLoading } = useSWR(bekreft ? `/min-cv/api/samtykke/bekreft_tidligere_cv` : null, fetcher);

    if (data === true) setBekreft(false);

    return {
        bekreftSuksess: data,
        bekreftLaster: isLoading,
        bekreftHarFeil: error,
        setBekreft,
    };
};
