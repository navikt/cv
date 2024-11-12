"use client";

import useSWR from "swr";
import { useState } from "react";

export const useErInnlogget = () => {
    const [harVærtInnlogget, setHarVærtInnlogget] = useState(false);

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

    const { data, error, isLoading } = useSWR("/personbruker/api/isAuthenticated", fetcher, {
        refreshInterval: 60 * 1000,
    });

    if (data === true && harVærtInnlogget === false) setHarVærtInnlogget(true);

    return {
        erInnlogget: data,
        innloggingLaster: isLoading,
        innloggingHarFeil: error,
        harBlittUtlogget: data === false && harVærtInnlogget === true,
    };
};
