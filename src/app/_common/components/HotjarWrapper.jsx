import { BodyLong, Box, Heading, Link, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export function HotjarWrapper() {
    return (
        <Box padding="10" className={[styles.box, styles.hotjarWrapper]}>
            <VStack gap="2">
                <Heading level="2" size="medium" id="feedback-panel-title">
                    Noe som mangler?
                </Heading>

                <BodyLong>Opplever du feil, eller fant du ikke det du ville registrere i CV-en?</BodyLong>

                <BodyLong>
                    <Link href="https://surveys.hotjar.com/256c1d1c-9b49-4a18-9d7b-28c7e570a174">
                        Skriv en anonym tilbakemelding (åpner i en ny fane)
                    </Link>
                </BodyLong>
            </VStack>
        </Box>
    );
}
