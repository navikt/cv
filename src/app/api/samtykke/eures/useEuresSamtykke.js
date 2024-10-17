"use client";

import useSWR from "swr";
import { simpleGetRequest } from "@/app/_common/utils/fetchUtils";

export const useEuresSamtykke = () => {
    const { data, error, isLoading } = useSWR(`/personbruker/api/samtykke/eures`, simpleGetRequest);

    return {
        delerEures: data,
        euresIsLoading: isLoading,
        euresIsError: error,
    };
};
