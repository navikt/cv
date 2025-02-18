"use client";

import "@navikt/ds-css";
import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import Eures from "@/app/eures/components/Eures";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import EuresForhandsvisning from "@/app/eures/components/EuresForhandsvisning";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { useEffect, useState } from "react";
import { euLand } from "@/app/_common/data/euLand";

export default function EuresPage() {
    const { eures } = useEures();
    const [kategorier, setKategorier] = useState([]);
    const [landSelectedOptions, setLandSelectedOptions] = useState([]);
    const [visHovedinnhold, setVisHovedinnhold] = useState(true);

    useEffect(() => {
        if (eures) {
            console.log("useEffect-eures: ", eures);
            const initKategorier = Object.keys(eures)
                .filter((k) => eures[k])
                .map(String)
                .slice(1, -1);
            setKategorier(initKategorier);

            const initSelectionLand = [];
            if (eures.land) {
                eures.land.forEach((code) => {
                    const c = euLand.filter((i) => i.code === code)[0];
                    if (c) {
                        initSelectionLand.push(c.name);
                    }
                });
                setLandSelectedOptions(initSelectionLand);
            }
        }
    }, [eures]);

    return (
        <ApplicationProvider>
            {visHovedinnhold ? (
                <Eures
                    eures={eures}
                    kategorier={kategorier}
                    setKategorier={setKategorier}
                    landSelectedOptions={landSelectedOptions}
                    setLandSelectedOptions={setLandSelectedOptions}
                    setVisHovedinnhold={setVisHovedinnhold}
                />
            ) : (
                <>
                    <HeaderPanel title="CV-innhold du ønsker å dele" />
                    <EuresForhandsvisning setVisHovedinnhold={setVisHovedinnhold} kategorier={kategorier} />
                </>
            )}
        </ApplicationProvider>
    );
}
