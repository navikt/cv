"use client";

import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { deleteAPI, postAPI } from "@/app/_common/utils/fetchUtils";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";
import { EURES_KEY, useEures } from "@/app/_common/hooks/swr/useEures";

export const useOppdaterEures = () => {
    const { suksessNotifikasjon, errorNotifikasjon } = useContext(ApplicationContext);
    const [visFeilmelding, setVisFeilmelding] = useState(false);

    const { eures } = useEures();

    const fetcher = async (url, { arg }) => {
        const { body } = arg;
        if (!url) return;

        setVisFeilmelding(false);

        try {
            if (body === null) {
                await deleteAPI(url);
                await mutate(EURES_KEY);
                suksessNotifikasjon("Euressamtykket er trukket");
            } else {
                const response = await postAPI(url, body);
                await mutate(EURES_KEY, { ...eures, response }, { revalidate: false });
                suksessNotifikasjon("Euressamtykket er oppdatert");
            }
            return true;
        } catch (error) {
            errorNotifikasjon("Det oppstod en feil ved lagring");
            setVisFeilmelding(true);
            throw error;
        }
    };

    const { trigger, data, error, isMutating } = useSWRMutation(EURES_KEY, fetcher, { revalidate: false });

    const triggerOppdatering = (body) => trigger({ body });

    return {
        oppdateringSuksess: data,
        oppdateringLaster: isMutating,
        oppdateringHarFeil: visFeilmelding || error,
        setVisFeilmelding,
        triggerOppdatering,
    };
};
