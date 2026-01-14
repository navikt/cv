"use client";

import "@navikt/ds-css";
import { useState } from "react";
import { Hide, HStack } from "@navikt/ds-react";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import Hovedmeny from "@/app/_common/components/meny/Hovedmeny";
import Forhandsvisning from "@/app/(minCV)/_components/forhandsvisning/Forhandsvisning";
import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import CvHovedinnhold from "@/app/(minCV)/_components/CvHovedinnhold";
import initLogger from "@/app/_common/utils/logger";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";
import HøyreSidemeny from "@/app/_common/components/HøyreSidemeny";
import styles from "../../page.module.css";

initLogger();

export default function MinCVPage({ erVeileder, erDemoApp }) {
    const { cvLaster } = useCv();
    const { erInnlogget } = useErInnlogget();
    const [visHovedinnhold, setVisHovedinnhold] = useState(true);

    return (
        <ApplicationProvider erVeileder={erVeileder} erDemoApp={erDemoApp}>
            {visHovedinnhold ? (
                <>
                    <HeaderPanel />

                    <HStack className={`${styles.pageContainer} ${!erInnlogget && styles.visibilityHidden}`}>
                        <Hide below="lg" className={styles.sidepanel}>
                            <Hovedmeny />
                        </Hide>

                        <CvHovedinnhold cvLaster={cvLaster} setVisHovedinnhold={setVisHovedinnhold} />

                        <Hide below="xl" className={styles.sidepanel2}>
                            <HøyreSidemeny cvLaster={cvLaster} setVisHovedinnhold={setVisHovedinnhold} />
                        </Hide>
                    </HStack>
                </>
            ) : (
                <>
                    <HeaderPanel title="Forhåndsvis CV" />
                    <Forhandsvisning setVisHovedinnhold={setVisHovedinnhold} />
                </>
            )}
        </ApplicationProvider>
    );
}
