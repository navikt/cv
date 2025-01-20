"use client";

import useSWR from "swr";
import { getAPI } from "@/app/_common/utils/fetchUtils";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";

export const AKTIV_BRUKER_KEY = "/min-cv/api/veileder/api/context/v2/aktivbruker";

export const useAktivBruker = () => {
    const { erInnlogget } = useErInnlogget();
    const { data, error, isLoading } = useSWR(erInnlogget ? AKTIV_BRUKER_KEY : null, getAPI);
    return {
        aktivBruker: data.aktivBruker,
        aktivBrukerLaster: isLoading || (!data && !error),
        aktivBrukerHarFeil: error,
    };
};
