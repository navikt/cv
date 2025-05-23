"use client";

import useSWR from "swr";
import { getAPI } from "@/app/_common/utils/fetchUtils";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";

export const CV_KEY = "/min-cv/api/cv";

export const useCv = (erVeileder = false) => {
    const { erInnlogget } = useErInnlogget();
    const { person, erUnderOppfølging, harIkkeSettHjemmel, erManuell } = usePerson();

    const veilederSkalHente = () => (erVeileder ? erUnderOppfølging && erManuell && !harIkkeSettHjemmel : true);

    const skalHente = erInnlogget && person && erUnderOppfølging && veilederSkalHente();
    const { data, error, isLoading } = useSWR(skalHente ? CV_KEY : null, getAPI);
    return {
        cv: data,
        cvLaster: isLoading || (!data && !error),
        cvHarFeil: error,
        jobbønsker: data?.jobboensker || {},
        utdanninger: data?.utdanning || [],
        fagbrev: data?.fagbrev || [],
        arbeidsforhold: data?.arbeidserfaring || [],
        andreErfaringer: data?.annenErfaring || [],
        andreGodkjenninger: data?.andreGodkjenninger || [],
        førerkort: data?.foererkort || [],
        kompetanser: data?.kompetanser || [],
        kurs: data?.kurs || [],
        offentligeGodkjenninger: data?.offentligeGodkjenninger || [],
        språk: data?.spraak || [],
        sammendrag: data?.sammendrag || "",
        sistEndret: data?.sistEndret || null,
    };
};
