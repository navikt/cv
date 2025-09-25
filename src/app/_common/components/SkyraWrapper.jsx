import { BodyLong, GuidePanel, Heading, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useRef, useState } from "react";

export function SkyraWrapper() {
    const [undersøkelseFerdig, setUndersøkelseFerdig] = useState(false);
    const [skyraMounted, setSkyraMounted] = useState(false);
    const intervalID = useRef(null);

    useEffect(() => {
        intervalID.current = setInterval(() => {
            if (skyraMounted) {
                clearInterval(intervalID.current);
                intervalID.current = null;
                return;
            }
            if (typeof window !== "undefined" && window.skyra?.on) setSkyraMounted(true);
        }, 250);

        return () => clearInterval(intervalID.current);
    }, [skyraMounted]);

    useEffect(() => {
        if (!skyraMounted) return;

        const onSurveyCompleted = (data) => {
            if (data.type !== "surveyCompleted") return;
            setUndersøkelseFerdig(true);
        };

        const onSurveyRejected = (data) => {
            if (data.type !== "surveyRejected") return;
            setUndersøkelseFerdig(true);
        };

        const skyraEvents = window.skyra;
        if (skyraEvents?.on) {
            skyraEvents.on("surveyCompleted", onSurveyCompleted);
            skyraEvents.on("surveyRejected", onSurveyRejected);
        }

        // eslint-disable-next-line consistent-return
        return () => {
            if (skyraEvents?.off) {
                skyraEvents.off("surveyCompleted", onSurveyCompleted);
                skyraEvents.off("surveyRejected", onSurveyRejected);
            }
        };
    }, [skyraMounted]);

    useEffect(() => {
        if (undersøkelseFerdig) {
            const element = document.getElementById("tilbakemelding-container");
            element.tabIndex = 0;
            element.focus();
            element.tabIndex = -1;
        }
    }, [undersøkelseFerdig]);

    return (
        <GuidePanel poster id="tilbakemelding-container" className={[styles.box, styles.skyraWrapper]}>
            <VStack gap="2" minHeight="80px">
                {undersøkelseFerdig ? (
                    <div aria-live="polite">
                        <Heading level="2" size="medium" id="feedback-panel-title">
                            Tusen takk! 🙌
                        </Heading>
                        <BodyLong className={styles.mb3}>Vi setter pris på tilbakemeldingen</BodyLong>
                    </div>
                ) : (
                    <skyra-survey
                        className="skyra-survey"
                        slug="arbeids-og-velferdsetaten-nav/navno-cv-feil-og-mangler"
                    />
                )}
            </VStack>
        </GuidePanel>
    );
}
