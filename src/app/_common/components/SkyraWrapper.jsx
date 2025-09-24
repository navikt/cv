import { BodyLong, GuidePanel, Heading, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export function SkyraWrapper() {
    return (
        <GuidePanel poster className={[styles.box, styles.hotjarWrapper]}>
            <VStack gap="2">
                <Heading level="2" size="medium" id="feedback-panel-title">
                    Noe som mangler?
                </Heading>

                <BodyLong className={styles.mb3}>
                    Denne siden er en tidlig versjon som fortsatt er under arbeid. Opplever du feil eller fant du ikke
                    det du ville registrere i CV-en?
                </BodyLong>

                <BodyLong>
                    <skyra-survey slug="arbeids-og-velferdsetaten-nav/navno-cv-feil-og-mangler">
                        Skriv en anonym tilbakemelding (åpner i en ny fane)
                    </skyra-survey>
                </BodyLong>
            </VStack>
        </GuidePanel>
    );
}
