"use client";

import useSWR from "swr";
import { getAPI } from "@/app/_common/utils/fetchUtils";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";

export const PERSON_KEY = "/min-cv/api/person";

export const usePerson = () => {
    const { erInnlogget } = useErInnlogget();
    const { data, error, isLoading } = useSWR(erInnlogget ? PERSON_KEY : null, getAPI);
    return {
        person: data,
        personLaster: isLoading || (!data && !error),
        personHarFeil: error,
        personalia: data?.personalia || null,
    };
};
