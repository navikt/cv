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
import {useState} from "react";

export default function MinCVPage() {
    const [activeStep, setActiveStep] = useState(1);
    const [stepsInView, setStepsInView] = useState([1, 2])
    const [isAutoscrolling, setIsAutoscrolling] = useState(false)

    const inViewChange = (inView, entry) => {
        if (isAutoscrolling) return

        let visibleSteps = [...new Set(stepsInView)]
        const stepNumber = parseInt(entry.target.id)
        const indexNumber = visibleSteps.indexOf(stepNumber)

        if (inView && indexNumber === -1) visibleSteps.push(stepNumber)
        else if (!inView && indexNumber >= 0) visibleSteps.splice(stepsInView.indexOf(stepNumber), 1)
        visibleSteps.sort((a, b) => a - b)


        if (inView) {
            trimVisipleSteps(visibleSteps, stepNumber)
        }

        setStepsInView(visibleSteps)
        setActiveStep(visibleSteps[0])
    }

    const trimVisipleSteps = (visibleSteps, stepNumber) => {
        const indexOfCurrentStep = visibleSteps.indexOf(stepNumber)

        for (let i = 0; i < indexOfCurrentStep; i++) {
            if (!visibleSteps.includes(stepNumber - (i+1))) {
                visibleSteps.slice(stepNumber - i, visibleSteps.length - 1)
                break
            }
        }

        for (let i = 1; indexOfCurrentStep + i < visibleSteps.length; i++)
            if (!visibleSteps.includes(stepNumber + i)) {
                visibleSteps.slice(0, stepNumber + i)
            }

        return visibleSteps;
    }

    console.log(activeStep, stepsInView)
    return (
        <>
            <HeaderPanel />
            <Hide below="md">
                <HStack style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                    <div className={styles.sidepanel}>
                        <Hovedmeny activeStep={activeStep} setActiveStep={setActiveStep} setStepsInView={setStepsInView} setIsAutoscrolling={setIsAutoscrolling}/>
                    </div>
                    <div>
                        <Box className={styles.main}>
                            <HStack gap="4">
                                <VStack>
                                    <DelingAvCV inViewChange={inViewChange} />
                                    <Personalia inViewChange={inViewChange} />
                                    <Jobbonsker inViewChange={inViewChange} />
                                    <Utdanninger inViewChange={inViewChange} />
                                    <Fagbrev inViewChange={inViewChange} />
                                    <Arbeidsforhold inViewChange={inViewChange} />
                                    <AndreErfaringer inViewChange={inViewChange} />
                                    <Kompetanser inViewChange={inViewChange} />
                                    <OffentligeGodkjenninger inViewChange={inViewChange} />
                                    <AndreGodkjenninger inViewChange={inViewChange} />
                                    <Sprak inViewChange={inViewChange} />
                                    <Forerkort inViewChange={inViewChange} />
                                    <Kurs inViewChange={inViewChange} />
                                    <Sammendrag inViewChange={inViewChange} />
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
                <DelingAvCV inViewChange={inViewChange}/>
                <Personalia inViewChange={inViewChange}/>
                <Jobbonsker inViewChange={inViewChange}/>
                <Utdanninger inViewChange={inViewChange}/>
                <Fagbrev inViewChange={inViewChange}/>
                <Arbeidsforhold inViewChange={inViewChange}/>
                <AndreErfaringer inViewChange={inViewChange}/>
                <Kompetanser inViewChange={inViewChange}/>
                <OffentligeGodkjenninger inViewChange={inViewChange}/>
                <AndreGodkjenninger inViewChange={inViewChange}/>
                <Sprak inViewChange={inViewChange}/>
                <Forerkort inViewChange={inViewChange}/>
                <Kurs inViewChange={inViewChange}/>
                <Sammendrag inViewChange={inViewChange}/>
            </Show>
        </>
    );
}
