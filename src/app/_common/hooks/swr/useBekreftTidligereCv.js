"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";

export const useBekreftTidligereCv = (skalOppdatere) => {
    const fetcher = async (url) => (await simpleApiRequest(url, "POST")).ok;

    const { data, error, isLoading } = useSWR(
        skalOppdatere ? `/personbruker/api/samtykke/bekreft_tidligere_cv` : null,
        fetcher,
    );

    return {
        bekreftSuccess: data,
        bekreftIsLoading: isLoading,
        bekreftIsError: error,
    };
};
