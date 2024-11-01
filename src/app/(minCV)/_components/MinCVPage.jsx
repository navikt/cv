"use client";

import "@navikt/ds-css";
import { useState } from "react";
import { Box, HStack, VStack, Hide, Show, Button } from "@navikt/ds-react";
import { EyeIcon } from "@navikt/aksel-icons";
import DelingAvCV from "@/app/(minCV)/_components/delingAvCV/DelingAvCV";
import Personalia from "@/app/(minCV)/_components/personalia/Personalia";
import Jobbonsker from "@/app/(minCV)/_components/jobbonsker/Jobbonsker";
import Utdanninger from "@/app/(minCV)/_components/utdanninger/Utdanninger";
import Fagbrev from "@/app/(minCV)/_components/fagbrev/Fagbrev";
import Arbeidsforhold from "@/app/(minCV)/_components/arbeidsforhold/Arbeidsforhold";
import AndreErfaringer from "@/app/(minCV)/_components/andreErfaringer/AndreErfaringer";
import Kompetanser from "@/app/(minCV)/_components/kompetanser/Kompetanser";
import OffentligeGodkjenninger from "@/app/(minCV)/_components/offentligeGodkjenninger/OffentligeGodkjenninger";
import AndreGodkjenninger from "@/app/(minCV)/_components/andreGodkjenninger/AndreGodkjenninger";
import Sprak from "@/app/(minCV)/_components/sprak/Sprak";
import Forerkort from "@/app/(minCV)/_components/forerkort/Forerkort";
import Kurs from "@/app/(minCV)/_components/kurs/Kurs";
import Sammendrag from "@/app/(minCV)/_components/sammendrag/Sammendrag";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import Hovedmeny from "@/app/_common/components/meny/Hovedmeny";
import { LastNedCv } from "@/app/(minCV)/_components/lastNedCv/LastNedCv";
import Forhandsvisning from "@/app/(minCV)/_components/forhandsvisning/Forhandsvisning";
import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import styles from "../../page.module.css";

export default function MinCVPage() {
    const { cvLaster } = useCv();
    const [visHovedinnhold, setVisHovedinnhold] = useState(true);

    return (
        <ApplicationProvider>
            {visHovedinnhold ? (
                <>
                    <HeaderPanel />
                    <Hide below="lg">
                        <HStack className={styles.pageContainer}>
                            <div className={styles.sidepanel}>
                                <Hovedmeny />
                            </div>
                            <div>
                                <Box className={styles.main}>
                                    <HStack gap="4">
                                        <VStack>
                                            <Personalia />
                                            <Jobbonsker />
                                            <Utdanninger />
                                            <Fagbrev />
                                            <Arbeidsforhold />
                                            <AndreErfaringer />
                                            <Kompetanser />
                                            <OffentligeGodkjenninger />
                                            <AndreGodkjenninger />
                                            <Sprak />
                                            <Forerkort />
                                            <Kurs />
                                            <Sammendrag />
                                            <DelingAvCV />
                                        </VStack>
                                    </HStack>
                                </Box>
                            </div>
                            <div className={styles.sidepanel2}>
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
                                </VStack>
                            </div>
                        </HStack>
                    </Hide>
                    <Show below="lg">
                        <Personalia />
                        <Jobbonsker />
                        <Utdanninger />
                        <Fagbrev />
                        <Arbeidsforhold />
                        <AndreErfaringer />
                        <Kompetanser />
                        <OffentligeGodkjenninger />
                        <AndreGodkjenninger />
                        <Sprak />
                        <Forerkort />
                        <Kurs />
                        <Sammendrag />
                        <DelingAvCV />
                        <HStack justify="center" style={{ padding: "4rem 0 4rem 0" }}>
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
                            </VStack>
                        </HStack>
                    </Show>
                </>
            ) : (
                <>
                    <HeaderPanel title="Forhåndsvis CV" visTag />
                    <Forhandsvisning setVisHovedinnhold={setVisHovedinnhold} />
                </>
            )}
        </ApplicationProvider>
    );
}
