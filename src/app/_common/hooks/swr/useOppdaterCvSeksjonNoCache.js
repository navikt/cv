"use client";

import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { putAPI } from "@/app/_common/utils/fetchUtils";
import { CV_KEY } from "@/app/_common/hooks/swr/useCv";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";
import { CvSeksjonEnum } from "@/app/_common/enums/cvEnums";

export const useOppdaterCvSeksjonNoCache = (seksjon) => {
    const { suksessNotifikasjon, errorNotifikasjon } = useContext(ApplicationContext);
    // eslint-disable-next-line
    const [dataForOppdatering, oppdaterSeksjon] = useState(null);
    const [visFeilmelding, setVisFeilmelding] = useState(false);

    const dataErGyldigForSeksjon = (lokalSeksjon, data) => {
        if (!lokalSeksjon) return false;
        switch (lokalSeksjon) {
            case CvSeksjonEnum.SAMMENDRAG:
                return !!data || data === "";
            default:
                return !!data;
        }
    };

    const fetcher = async (url, { arg }) => {
        const { body } = arg;
        if (!url || !body) return;

        setVisFeilmelding(false);

        try {
            const response = await putAPI(url, body);
            await mutate(CV_KEY, response, { revalidate: false });
            suksessNotifikasjon("CV-en din ble oppdatert");
            return true;
        } catch (error) {
            errorNotifikasjon("Det oppstod en feil ved lagring");
            setVisFeilmelding(true);
            throw error;
        }
    };

    const url = `${CV_KEY}/${seksjon}`;
    const { trigger, data, error, isMutating } = useSWRMutation(url, fetcher, { revalidate: false });

    const triggerOppdatering = (data) => {
        if (dataErGyldigForSeksjon(seksjon, data)) {
            trigger({ body: { [seksjon]: data } });
        }
    };

    return {
        oppdateringSuksess: data,
        oppdateringLaster: isMutating,
        oppdateringHarFeil: visFeilmelding || error,
        oppdaterSeksjon,
        setVisFeilmelding,
        triggerOppdatering,
    };
};
