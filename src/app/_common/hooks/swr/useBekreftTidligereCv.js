"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";
import { useState } from "react";

export const useBekreftTidligereCv = () => {
    const [bekreft, setBekreft] = useState(false);
    const fetcher = async (url) => (await simpleApiRequest(url, "POST")).ok;

    const { data, error, isLoading } = useSWR(
        bekreft ? `/personbruker/api/samtykke/bekreft_tidligere_cv` : null,
        fetcher,
    );

    if (data === true) setBekreft(false);

    return {
        bekreftSuksess: data,
        bekreftLaster: isLoading,
        bekreftHarFeil: error,
        setBekreft,
    };
};
