"use client";

import styles from "../../page.module.css";
import "@navikt/ds-css";
import { Box, Heading, Stepper, HStack, VStack, Hide, BodyShort, Show, Detail, Tag } from "@navikt/ds-react";
import { useState } from "react";
import DelingAvCV from "@/app/(minCV)/components/delingAvCV/DelingAvCV";
import Personalia from "@/app/(minCV)/components/personalia/Personalia";
import Jobbonsker from "@/app/(minCV)/components/jobbonsker/Jobbonsker";
import Utdanninger from "@/app/(minCV)/components/utdanninger/Utdanninger";
import Fagbrev from "@/app/(minCV)/components/fagbrev/Fagbrev";
import Arbeidsforhold from "@/app/(minCV)/components/arbeidsforhold/Arbeidsforhold";
import AndreErfaringer from "@/app/(minCV)/components/andreErfaringer/AndreErfaringer";
import Kompetanser from "@/app/(minCV)/components/kompetanser/Kompetanser";
import OffentligeGodkjenninger from "@/app/(minCV)/components/offentligeGodkjenninger/OffentligeGodkjenninger";
import AndreGodkjenninger from "@/app/(minCV)/components/andreGodkjenninger/AndreGodkjenninger";
import Sprak from "@/app/(minCV)/components/sprak/Sprak";

export default function MinCVPage() {
    const [activeStep, setActiveStep] = useState(1);

    function onStepChange(x) {
        setActiveStep(x);

        const element = document.getElementById(x);
        element.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <Box as="header" borderWidth="0 0 4 0" borderColor="surface-info">
                <Box background="surface-default" paddingInline="4" paddingBlock="6 6">
                    <VStack align="center">
                        <HStack align="start" gap="8">
                            <Hide below="md">
                                <Pictogram />
                            </Hide>
                            <VStack gap={{ xs: "4", md: "5" }}>
                                <HStack gap="8">
                                    <Heading level="1" size="large">
                                        Din CV
                                    </Heading>
                                    <Tag size="small" variant="info-filled">
                                        Påbegynt
                                    </Tag>
                                </HStack>
                                <Hide below="md">
                                    <HStack gap="4" align="center">
                                        <BodyShort size="small">LUKE SKYWALKER</BodyShort>
                                        <svg
                                            width="4"
                                            height="4"
                                            viewBox="0 0 4 4"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle id="Ellipse 16" cx="2" cy="2" r="2" fill="#B5F1FF" />
                                        </svg>
                                        <Detail>Sist endret 13. mai 2024</Detail>
                                    </HStack>
                                </Hide>
                                <Show below="md">
                                    <VStack gap="2">
                                        <BodyShort size="small">LUKE SKYWALKER</BodyShort>
                                        <Detail>Sist endret 13. mai 2024</Detail>
                                    </VStack>
                                </Show>
                            </VStack>
                        </HStack>
                    </VStack>
                </Box>
            </Box>
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
                        <Stepper.Step as="button">Sammendrag</Stepper.Step>
                    </Stepper>
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
                            </VStack>
                        </HStack>
                    </Box>
                </div>
            </HStack>
        </>
    );
}

function Pictogram() {
    return (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="72" height="72" rx="36" fill="#B5F1FF" />
            <g clipPath="url(#clip0_2035_24190)">
                <rect
                    x="60.5"
                    y="25.2085"
                    width="37.3333"
                    height="7"
                    transform="rotate(-180 60.5 25.2085)"
                    fill="#EBFCFF"
                />
                <rect
                    x="53.5"
                    y="41.5415"
                    width="37.3333"
                    height="7"
                    transform="rotate(-180 53.5 41.5415)"
                    fill="#EBFCFF"
                />
                <rect
                    x="45.334"
                    y="57.2915"
                    width="37.3333"
                    height="7"
                    transform="rotate(-180 45.334 57.2915)"
                    fill="#EBFCFF"
                />
                <path
                    d="M12.8758 14.7697L13.7326 16.0461L17.6075 13.3213"
                    stroke="#23262A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21.0438 26.2565L21.9006 27.5329L25.7754 24.8081"
                    stroke="#23262A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M21.416 15H24.916" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M12.666 20.8335H16.166" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M12.666 26.6665H16.166" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M21.416 20.8335H24.916" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M29.584 20.8335H33.084" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M29.584 15H33.084" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <mask id="path-13-inside-1_2035_24190" fill="white">
                    <rect x="8" y="8" width="30.3333" height="24.5" rx="1.33333" />
                </mask>
                <rect
                    x="8"
                    y="8"
                    width="30.3333"
                    height="24.5"
                    rx="1.33333"
                    stroke="#23262A"
                    strokeWidth="4"
                    mask="url(#path-13-inside-1_2035_24190)"
                />
                <path
                    d="M37.5248 44.642C37.7235 43.9182 38.3814 43.4165 39.132 43.4165H60.5033C61.6034 43.4165 62.4017 44.4635 62.1105 45.5244L57.8099 61.191C57.6112 61.9148 56.9532 62.4165 56.2027 62.4165H34.8313C33.7312 62.4165 32.9329 61.3695 33.2241 60.3086L37.5248 44.642Z"
                    stroke="#23262A"
                    strokeWidth="2"
                />
                <path
                    d="M36.459 48.8521L47.0276 53.9327L61.1191 48.8521"
                    stroke="#23262A"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_2035_24190">
                    <rect width="56" height="56" fill="white" transform="translate(8 8)" />
                </clipPath>
            </defs>
        </svg>
    );
}
