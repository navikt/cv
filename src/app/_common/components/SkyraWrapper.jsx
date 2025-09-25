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
        console.log("Undersøkelse ferdig?", undersøkelseFerdig);
    }, [undersøkelseFerdig]);

    /*
    useEffect(() => {
        if (!skyraSurveyRef.current) {
            setInitialCheckDone(false);
            return;
        }

        const checkShadowContent = () => {
            const element = skyraSurveyRef.current;
            return !!(element && element.shadowRoot && element.shadowRoot.childElementCount > 0);
        };

        const initialCheckTimeout = setTimeout(() => {
            const hasShadowContent = checkShadowContent();

            if (!hasShadowContent && undersøkelseFerdig) {
                setUndersøkelseFerdig(false);
            }

            setInitialCheckDone(true);
        }, 250);

        const observer = new MutationObserver(() => {
            if (initialCheckDone && !checkShadowContent() && undersøkelseFerdig) {
                setUndersøkelseFerdig(false);
                window.location.reload();
            }
        });

        if (skyraSurveyRef.current) {
            observer.observe(skyraSurveyRef.current, {
                childList: true,
                subtree: true,
                attributes: true,
            });

            if (skyraSurveyRef.current.shadowRoot) {
                observer.observe(skyraSurveyRef.current.shadowRoot, {
                    childList: true,
                    subtree: true,
                });
            }
        }

        // eslint-disable-next-line consistent-return
        return () => {
            clearTimeout(initialCheckTimeout);
            observer.disconnect();
        };
    }, [undersøkelseFerdig, initialCheckDone]); */

    return (
        <GuidePanel poster className={[styles.box, styles.skyraWrapper]}>
            <VStack gap="2">
                {undersøkelseFerdig ? (
                    <>
                        <Heading level="2" size="medium" id="feedback-panel-title">
                            Tusen takk! 🙌
                        </Heading>
                        <BodyLong className={styles.mb3}>Vi setter pris på tilbakemeldingen</BodyLong>
                    </>
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
