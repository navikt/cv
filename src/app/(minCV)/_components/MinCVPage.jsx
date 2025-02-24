"use client";

import "@navikt/ds-css";
import { useState } from "react";
import { Button, Hide, HStack, Link, VStack } from "@navikt/ds-react";
import { EyeIcon } from "@navikt/aksel-icons";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import Hovedmeny from "@/app/_common/components/meny/Hovedmeny";
import { LastNedCv } from "@/app/(minCV)/_components/lastNedCv/LastNedCv";
import Forhandsvisning from "@/app/(minCV)/_components/forhandsvisning/Forhandsvisning";
import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import CvHovedinnhold from "@/app/(minCV)/_components/CvHovedinnhold";
import initLogger from "@/app/_common/utils/logger";
import styles from "../../page.module.css";

initLogger();

export default function MinCVPage({ erVeileder }) {
    const { cvLaster } = useCv();
    const [visHovedinnhold, setVisHovedinnhold] = useState(true);

    return (
        <ApplicationProvider erVeileder={erVeileder}>
            {visHovedinnhold ? (
                <>
                    <HeaderPanel />

                    <HStack className={styles.pageContainer}>
                        <Hide below="lg" className={styles.sidepanel}>
                            <Hovedmeny />
                        </Hide>

                        <CvHovedinnhold cvLaster={cvLaster} setVisHovedinnhold={setVisHovedinnhold} />

                        <Hide below="xl" className={styles.sidepanel2}>
                            <VStack gap="4">
                                <Button
                                    icon={<EyeIcon aria-hidden />}
                                    variant="primary"
                                    onClick={() => setVisHovedinnhold(false)}
                                    disabled={cvLaster}
                                >
                                    Forhåndsvis CV
                                </Button>
                                <LastNedCv />
                                <Link inlineText href="/min-cv/personvern">
                                    Personvernserklæring for Min CV
                                </Link>
                            </VStack>
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
