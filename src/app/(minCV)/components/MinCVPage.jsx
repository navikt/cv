"use client";

import styles from "../../page.module.css";
import "@navikt/ds-css";
import { Box, Heading, Stepper, HStack, VStack, BodyLong, Hide, BodyShort, Show, Detail } from "@navikt/ds-react";
import { useState } from "react";

export default function MinCVPage() {
    const [activeStep, setActiveStep] = useState(1);

    function onStepChange(x) {
        setActiveStep(x);
    }

    return (
        <>
            <Heading level="1" size="xlarge" align="center" className={styles.mb12}>
                Header
            </Heading>

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
                        <Stepper.Step as="button">Utdanning</Stepper.Step>
                        <Stepper.Step as="button">Fagbrev</Stepper.Step>
                        <Stepper.Step as="button">Arbeidsforhold</Stepper.Step>
                        <Stepper.Step as="button">Andre erfaringer</Stepper.Step>
                        <Stepper.Step as="button">Kompetanser</Stepper.Step>
                        <Stepper.Step as="button">Offentlige godkjenninger</Stepper.Step>
                        <Stepper.Step as="button">Andre godkjenninger</Stepper.Step>
                        <Stepper.Step as="button">Språk</Stepper.Step>
                        <Stepper.Step as="button">Førerkort</Stepper.Step>
                        <Stepper.Step as="button">Sammendrag</Stepper.Step>
                    </Stepper>
                </div>
                <div>
                    <Box className={styles.main}>
                        <HStack gap="4">
                            <VStack></VStack>
                        </HStack>
                    </Box>
                </div>
            </HStack>
            <Heading level="1" size="xlarge" align="center" className={styles.mb12}>
                Footer
            </Heading>
        </>
    );
}
