"use client";

import "@navikt/ds-css";
import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import Eures from "@/app/eures/components/Eures";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import Forhandsvisning from "@/app/(minCV)/_components/forhandsvisning/Forhandsvisning";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { useEffect, useState } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";

export default function EuresPage() {
    const { eures, initKategorier, initLand } = useEures();
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
            setKategorier(initKategorier);

            if (eures.land) {
                setLandSelectedOptions(initLand);
            }
        }
    }, [eures]);

    return (
        <ApplicationProvider>
            {visHovedinnhold ? (
                <>
                    <HeaderPanel />
                    <Eures
                        eures={eures}
                        initKategorier={initKategorier}
                        initLand={initLand}
                        kategorier={kategorier}
                        setKategorier={setKategorier}
                        landSelectedOptions={landSelectedOptions}
                        setLandSelectedOptions={setLandSelectedOptions}
                        setVisHovedinnhold={setVisHovedinnhold}
                    />
                </>
            ) : (
                <>
                    <HeaderPanel title="CV-innhold du ønsker å dele" />
                    <Forhandsvisning setVisHovedinnhold={setVisHovedinnhold} kategorier={kategorier} />
                </>
            )}
        </ApplicationProvider>
    );
}
