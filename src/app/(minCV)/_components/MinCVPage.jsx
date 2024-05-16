"use client";

import styles from "../../page.module.css";
import "@navikt/ds-css";
import { Box, Stepper, HStack, VStack } from "@navikt/ds-react";
import { useState } from "react";
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

export default function MinCVPage() {
    const [activeStep, setActiveStep] = useState(1);

    function onStepChange(x) {
        setActiveStep(x);
    }

    return (
        <>
            <HeaderPanel />
            <HStack style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                <div className={styles.sidebar2}>
                    <Stepper
                        aria-labelledby="stepper-heading"
                        orientation="vertical"
                        className={styles.hideStepper}
                        activeStep={activeStep}
                        onStepChange={(x) => onStepChange(x)}
                    >
                        <Stepper.Step as="button">Deling av CV</Stepper.Step>
                        <Stepper.Step as="button">Personalia</Stepper.Step>
                        <Stepper.Step as="button">Jobbønsker</Stepper.Step>
                        <Stepper.Step as="button">Utdanninger</Stepper.Step>
                        <Stepper.Step as="button">Fagbrev</Stepper.Step>
                        <Stepper.Step as="button">Arbeidsforhold</Stepper.Step>
                        <Stepper.Step as="button">Andre erfaringer</Stepper.Step>
                        <Stepper.Step as="button">Kompetanser</Stepper.Step>
                        <Stepper.Step as="button">Offentlige godkjenninger</Stepper.Step>
                        <Stepper.Step as="button">Andre godkjenninger</Stepper.Step>
                        <Stepper.Step as="button">Språk</Stepper.Step>
                        <Stepper.Step as="button">Førerkort</Stepper.Step>
                        <Stepper.Step as="button">Kurs</Stepper.Step>
                        <Stepper.Step as="button">Sammendrag</Stepper.Step>
                    </Stepper>
                </div>
                <div>
                    <Box className={styles.main}>
                        <HStack gap="4">
                            <VStack>
                                {activeStep === 1 && <DelingAvCV />}
                                {activeStep === 2 && <Personalia />}
                                {activeStep === 3 && <Jobbonsker />}
                                {activeStep === 4 && <Utdanninger />}
                                {activeStep === 5 && <Fagbrev />}
                                {activeStep === 6 && <Arbeidsforhold />}
                                {activeStep === 7 && <AndreErfaringer />}
                                {activeStep === 8 && <Kompetanser />}
                                {activeStep === 9 && <OffentligeGodkjenninger />}
                                {activeStep === 10 && <AndreGodkjenninger />}
                                {activeStep === 11 && <Sprak />}
                                {activeStep === 12 && <Forerkort />}
                                {activeStep === 13 && <Kurs />}
                                {activeStep === 14 && <Sammendrag />}
                            </VStack>
                        </HStack>
                    </Box>
                </div>
            </HStack>
        </>
    );
}
