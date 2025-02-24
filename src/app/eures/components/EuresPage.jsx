"use client";

import "@navikt/ds-css";
import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import Eures from "@/app/eures/components/Eures";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import EuresForhandsvisning from "@/app/eures/components/EuresForhandsvisning";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { useEffect, useState } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";

export default function EuresPage() {
    const { eures, kategori, land } = useEures();
    const [kategorier, setKategorier] = useState([]);
    const [landSelectedOptions, setLandSelectedOptions] = useState([]);
    const [visHovedinnhold, setVisHovedinnhold] = useState(true);

    useEffect(() => {
        setBreadcrumbs([
            { title: "Min side", url: "/minside" },
            {
                title: "EURES",
                url: "/min-cv/eures",
                handleInApp: true,
            },
        ]);
    });

    useEffect(() => {
        if (eures) {
            setKategorier(kategori);

            if (eures.land) {
                setLandSelectedOptions(land);
            }
        }
    }, [eures]);

    return (
        <ApplicationProvider>
            {visHovedinnhold ? (
                <>
                    <HeaderPanel title="CV-deling med EURES-portalen" />
                    <Eures
                        eures={eures}
                        kategori={kategori}
                        land={land}
                        kategorier={kategorier}
                        setKategorier={setKategorier}
                        landSelectedOptions={landSelectedOptions}
                        setLandSelectedOptions={setLandSelectedOptions}
                        setVisHovedinnhold={setVisHovedinnhold}
                    />
                </>
            ) : (
                <EuresForhandsvisning setVisHovedinnhold={setVisHovedinnhold} kategorier={kategorier} />
            )}
        </ApplicationProvider>
    );
}
