"use client";

import useSWR from "swr";
import { simplePostRequest } from "@/app/_common/utils/fetchUtils";

export const useBekreftTidligereCv = (skalOppdatere) => {
    const { data, error, isLoading } = useSWR(
        skalOppdatere ? `/personbruker/api/samtykke/bekreft_tidligere_cv` : null,
        simplePostRequest,
    );

    return {
        bekreftSuccess: data,
        bekreftIsLoading: isLoading,
        bekreftIsError: error,
    };
};
