"use client";

import useSWR from "swr";
import { simpleApiRequest } from "@/app/_common/utils/fetchUtils";

export const useHentArbeidsforhold = (skalHente) => {
    const fetcher = async (url) => {
        const response = await simpleApiRequest(url, "GET");
        return response.json();
    };

    const { data, error, isLoading } = useSWR(skalHente ? `/personbruker/api/arbeidsforhold` : null, fetcher);

    return {
        aaregForhold: data,
        aaregIsLoading: isLoading,
        aaregIsError: error,
    };
};
