"use client";

import styles from "../../page.module.css";
import "@navikt/ds-css";
import { Box, HStack, VStack, Hide, Show, Button } from "@navikt/ds-react";
import { DownloadIcon, EyeIcon } from "@navikt/aksel-icons";
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

export default function MinCVPage() {
    return (
        <>
            <HeaderPanel />
            <Hide below="md">
                <HStack
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        paddingBottom: "4rem",
                    }}
                >
                    <div className={styles.sidepanel}>
                        <Hovedmeny />
                    </div>
                    <div>
                        <Box className={styles.main}>
                            <HStack gap="4">
                                <VStack>
                                    <DelingAvCV />
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
                                </VStack>
                            </HStack>
                        </Box>
                    </div>
                    <div className={styles.sidepanel2}>
                        <VStack gap="4">
                            <Button icon={<EyeIcon aria-hidden />} variant="primary">
                                Forhåndsvis CV
                            </Button>
                            <Button icon={<DownloadIcon aria-hidden />} variant="secondary">
                                Last ned CV
                            </Button>
                        </VStack>
                    </div>
                </HStack>
            </Hide>
            <Show below="md">
                <DelingAvCV />
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
            </Show>
        </>
    );
}
