import { BodyLong, Box, HStack, Link, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export function EuresDeleInfoBox() {
    return (
        <Box className={styles.mt9} padding="4" background="surface-neutral-subtle">
            <HStack gap="4" justify="start">
                <VStack>
                    <div className={styles.euresLogoSmall} />
                </VStack>
                <VStack className={styles.euresInfoBox}>
                    <BodyLong spacing>
                        Du deler denne innholdskategorien med den Europeiske Jobbmobilitetsportalen. Innholdet du velger
                        å endre eller legge til nå blir derfor også delt med den Europeiske Jobbmobilitetsportalen.
                    </BodyLong>
                    <BodyLong>
                        Dersom du ikke ønsker å dele dette innholdet, kan du{" "}
                        <Link href="/min-cv/eures" inlineText>
                            endre hva du deler med den Europeiske Jobbmobilitetsportalen
                        </Link>
                        .
                    </BodyLong>
                </VStack>
            </HStack>
        </Box>
    );
}
