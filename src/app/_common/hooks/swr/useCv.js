"use client";

import useSWR from "swr";
import { getAPI } from "@/app/_common/utils/fetchUtils";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";

export const CV_KEY = "/personbruker/api/cv";

export const useCv = () => {
    const { erInnlogget } = useErInnlogget();
    const { person } = usePerson();
    const skalHente = erInnlogget && person;
    const { data, error, isLoading } = useSWR(skalHente ? CV_KEY : null, getAPI);
    return { cv: data, cvLaster: isLoading, cvHarFeil: error };
};
