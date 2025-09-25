import { BodyLong, GuidePanel, Heading, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useRef, useState } from "react";

export function SkyraWrapper() {
    const skyraSurveyRef = useRef(null);
    const [undersøkelseFerdig, setUndersøkelseFerdig] = useState(false);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

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
    }, [undersøkelseFerdig, initialCheckDone]);

    return (
        <GuidePanel poster className={[styles.box, styles.skyraWrapper]}>
            <VStack gap="2">
                {undersøkelseFerdig ? (
                    <>
                        <Heading level="2" size="medium" id="feedback-panel-title">
                            Tusen takk!
                        </Heading>
                        <BodyLong className={styles.mb3}>Vi har mottatt tilbakemeldingen din</BodyLong>
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
