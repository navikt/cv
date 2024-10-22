"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";

export const useHentEuresSamtykke = () => {
    const fetcher = async (url) => (await simpleApiRequest(url, "GET")).ok;
    const { data, error, isLoading } = useSWR(`/personbruker/api/samtykke/eures`, fetcher);

    return {
        delerEures: data,
        euresIsLoading: isLoading,
        euresIsError: error,
    };
};
