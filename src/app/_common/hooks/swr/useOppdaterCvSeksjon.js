"use client";

import useSWR, { mutate } from "swr";
import { putAPI } from "@/app/_common/utils/fetchUtils";
import { CV_KEY } from "@/app/_common/hooks/swr/useCv";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";
import { CvSeksjonEnum } from "@/app/_common/enums/cvEnums";

export const useOppdaterCvSeksjon = (seksjon) => {
    const { suksessNotifikasjon, errorNotifikasjon } = useContext(ApplicationContext);
    const [dataForOppdatering, oppdaterSeksjon] = useState(null);
    const [visFeilmelding, setVisFeilmelding] = useState(false);

    const fetcher = async ({ url, seksjon, body }) => {
        if (!url || !body || !seksjon) return;

        setVisFeilmelding(false);

        try {
            const response = await putAPI(url, body, suksessNotifikasjon, errorNotifikasjon);
            await mutate(CV_KEY, response, { revalidate: false });
            suksessNotifikasjon("CV-en din ble oppdatert");
            return true;
        } catch (error) {
            errorNotifikasjon("Det oppstod en feil ved lagring");
            setVisFeilmelding(true);
            throw error;
        }
    };

    const dataErGyldigForSeksjon = (seksjon, data) => {
        if (!seksjon) return false;

        switch (seksjon) {
            case CvSeksjonEnum.SAMMENDRAG:
                return !!data || data === "";
            default:
                return !!data;
        }
    };

    const skalOppdatere = dataErGyldigForSeksjon(seksjon, dataForOppdatering);
    const url = `${CV_KEY}/${seksjon}`;
    const body = { [seksjon]: dataForOppdatering };

    const { data, error, isLoading } = useSWR(skalOppdatere ? { url, seksjon, body } : null, fetcher);
    return {
        oppdateringSuksess: data,
        oppdateringLaster: isLoading,
        oppdateringHarFeil: visFeilmelding || error,
        oppdaterSeksjon,
        setVisFeilmelding,
    };
};
