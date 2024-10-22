"use client";

import useSWR, { mutate } from "swr";
import { putAPI } from "@/app/_common/utils/fetchUtils";
import { CV_KEY } from "@/app/_common/hooks/swr/useCv";
import {useState} from "react";

export const useOppdaterCvSeksjon = (seksjon) => {
    const [dataForOppdatering, oppdaterMedData] = useState(null)

    const fetcher = async ({ url, seksjon, body }) => {
        if (!url || !body || !seksjon) return;

        const response = await putAPI(url, body);
        await mutate(CV_KEY, response, { revalidate: false });
        return true;
    };

    const skalOppdatere = !!dataForOppdatering && !!seksjon;
    const url = `${CV_KEY}/${seksjon}`;
    const body = { [seksjon]: dataForOppdatering };

    const { data, error, isLoading } = useSWR(skalOppdatere ? { url, seksjon, body } : null, fetcher);
    return { oppdateringSuksess: data, oppdateringLaster: isLoading, oppdateringFeilet: error, oppdaterMedData };
};
