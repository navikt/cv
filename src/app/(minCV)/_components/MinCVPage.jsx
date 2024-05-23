"use client";

import styles from "../../page.module.css";
import "@navikt/ds-css";
import { Box, Stepper, HStack, VStack, Hide, Show, Accordion } from "@navikt/ds-react";
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
            <Hide below="md">
                <HStack style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                    <div className={styles.sidepanel}>
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
            </Hide>
            <Show below="md">
                <Accordion>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>1: Deling av CV</Accordion.Header>
                        <Accordion.Content>
                            <DelingAvCV />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>2: Personalia</Accordion.Header>
                        <Accordion.Content>
                            <Personalia />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>3: Jobbønsker</Accordion.Header>
                        <Accordion.Content>
                            <Jobbonsker />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>4: Utdanninger</Accordion.Header>
                        <Accordion.Content>
                            <Utdanninger />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>5: Fagbrev</Accordion.Header>
                        <Accordion.Content>
                            <Fagbrev />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>6: Arbeidsforhold</Accordion.Header>
                        <Accordion.Content>
                            <Arbeidsforhold />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>7: Andre erfaringer</Accordion.Header>
                        <Accordion.Content>
                            <AndreErfaringer />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>8: Kompetanser</Accordion.Header>
                        <Accordion.Content>
                            <Kompetanser />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>9: Offentlige godkjenninger</Accordion.Header>
                        <Accordion.Content>
                            <OffentligeGodkjenninger />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>10: Andre godkjenninger</Accordion.Header>
                        <Accordion.Content>
                            <AndreGodkjenninger />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>11: Språk</Accordion.Header>
                        <Accordion.Content>
                            <Sprak />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>12: Førerkort</Accordion.Header>
                        <Accordion.Content>
                            <Forerkort />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>13: Kurs</Accordion.Header>
                        <Accordion.Content>
                            <Kurs />
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>14: Sammendrag</Accordion.Header>
                        <Accordion.Content>
                            <Sammendrag />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </Show>
        </>
    );
}
