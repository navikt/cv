"use client";

import { mutate } from "swr";
import { putAPI } from "@/app/_common/utils/fetchUtils";
import { CV_KEY } from "@/app/_common/hooks/swr/useCv";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";
import { CvSeksjonEnum } from "@/app/_common/enums/cvEnums";

export const useOppdaterCvSeksjonNoCache = (seksjon) => {
    const { suksessNotifikasjon, errorNotifikasjon } = useContext(ApplicationContext);
    const [dataForOppdatering, oppdaterSeksjon] = useState(null);
    const [visFeilmelding, setVisFeilmelding] = useState(false);
    const [oppdateringLaster, setOppdateringLaster] = useState(false);
    const [oppdateringSuksess, setOppdateringSuksess] = useState(false);

    const dataErGyldigForSeksjon = (lokalSeksjon, data) => {
        if (!lokalSeksjon) return false;
        switch (lokalSeksjon) {
            case CvSeksjonEnum.SAMMENDRAG:
                return !!data || data === "";
            default:
                return !!data;
        }
    };

    const oppdaterCvSeksjon = async (data) => {
        if (!dataErGyldigForSeksjon(seksjon, data)) return;

        setOppdateringLaster(true);
        setVisFeilmelding(false);

        const url = `${CV_KEY}/${seksjon}`;
        const body = { [seksjon]: data };

        try {
            const response = await putAPI(url, body);
            await mutate(CV_KEY, response, { revalidate: false });
            setOppdateringSuksess(true);
            suksessNotifikasjon("CV-en din ble oppdatert");
            return response;
        } catch (error) {
            errorNotifikasjon("Det oppstod en feil ved lagring");
            setVisFeilmelding(true);
            throw error;
        } finally {
            setOppdateringLaster(false);
        }
    };

    return {
        oppdateringSuksess,
        oppdateringLaster,
        oppdateringHarFeil: visFeilmelding,
        oppdaterCvSeksjon,
        oppdaterSeksjon,
        setVisFeilmelding,
    };
};
