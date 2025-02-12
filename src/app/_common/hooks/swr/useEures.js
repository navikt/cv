"use client";

import useSWR from "swr";
import { getAPI } from "@/app/_common/utils/fetchUtils";

export const EURES_KEY = "/min-cv/api/samtykke/eures";

export const useEures = () => {
    const { data, error, isLoading } = useSWR(EURES_KEY, getAPI);

    return {
        eures: data,
        delerEures: data && error.status !== 404,
        euresLaster: isLoading || (!data && !error),
        euresHarFeil: error,
    };
};
