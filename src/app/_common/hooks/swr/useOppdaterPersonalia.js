"use client";

import { mutate } from "swr";
import { putAPI } from "@/app/_common/utils/fetchUtils";
import { PERSON_KEY, usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";

export const useOppdaterPersonalia = () => {
    const { suksessNotifikasjon, errorNotifikasjon } = useContext(ApplicationContext);
    const [dataForOppdatering, oppdaterSeksjon] = useState(null);
    const [visFeilmelding, setVisFeilmelding] = useState(false);
    const [oppdateringLaster, setOppdateringLaster] = useState(false);
    const [oppdateringSuksess, setOppdateringSuksess] = useState(false);

    const { person } = usePerson();
    const url = "personbruker/api/personalia";

    const oppdaterPersonalia = async (data) => {
        setOppdateringLaster(true);
        setVisFeilmelding(false);

        try {
            const response = await putAPI(url, data);
            await mutate(PERSON_KEY, { ...person, personalia: response }, { revalidate: false });
            suksessNotifikasjon("Personalia er oppdatert");
            setOppdateringSuksess(true);
        } catch (error) {
            errorNotifikasjon("Det oppstod en feil ved lagring");
            setVisFeilmelding(true);
        } finally {
            setOppdateringLaster(false);
        }
    };

    return {
        oppdateringSuksess,
        oppdateringLaster,
        oppdateringHarFeil: visFeilmelding,
        oppdaterPersonalia, // Direct function to trigger PUT request
        oppdaterSeksjon,
        setVisFeilmelding,
    };
};
