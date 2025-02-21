"use client";

import useSWR from "swr";
import { getAPI } from "@/app/_common/utils/fetchUtils";
import { euLand } from "@/app/_common/data/euLand";

export const EURES_KEY = "/min-cv/api/samtykke/eures";

export const useEures = () => {
    const { data, error, isLoading } = useSWR(EURES_KEY, getAPI, { shouldRetryOnError: (err) => err.status !== 404 });

    let initKategorier;
    const initSelectionLand = [];

    if (data) {
        initKategorier = Object.keys(data)
            .filter((k) => data[k])
            .map(String)
            .slice(1, -1);

        if (data.land) {
            data.land.forEach((code) => {
                const c = euLand.filter((i) => i.code === code)[0];
                if (c) {
                    initSelectionLand.push(c.name);
                }
            });
        }
    }

    return {
        eures: data,
        euresLaster: isLoading || (!data && !error),
        euresHarFeil: error,
        delerEures: data && error?.status !== 404,
        kategori: initKategorier,
        land: initSelectionLand,
        euresPersonalia: data?.personalia || false,
        euresUtdanning: data?.utdanning || false,
        euresFagbrev: data?.fagbrev || false,
        euresArbeidserfaring: data?.arbeidserfaring || false,
        euresFoererkort: data?.foererkort || false,
        euresOffentligeGodkjenninger: data?.offentligeGodkjenninger || false,
        euresAndreGodkjenninger: data?.andreGodkjenninger || false,
        euresKurs: data?.kurs || false,
        euresSpraak: data?.spraak || false,
        euresSammendrag: data?.sammendrag || false,
        euresKompetanser: data?.kompetanser || false,
    };
};
