"use client";

import useSWR from "swr";

export const useErInnlogget = () => {
    const fetcher = async (url) => {
        const response = await fetch(url, {
            credentials: "include",
            cache: "no-store",
        });

        if (response.status === 200) return true;
        if (response.status === 401) return false;

        const error = new Error("Det oppstod en feil ved henting av innloggingsstatus.");
        error.status = response.status;
        throw error;
    };

    const { data, error, isLoading } = useSWR("/personbruker/api/isAuthenticated", fetcher);

    return {
        erInnlogget: data,
        innloggingLaster: isLoading,
        innloggingHarFeil: error,
    };
};
