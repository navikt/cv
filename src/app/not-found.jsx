import { BodyLong, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { arbeidsplassenBaseUrl } from "@/app/_common/utils/urlUtils";

export default function NotFound() {
    return (
        <HStack className={styles.pageContainer}>
            <Box padding="10" className={styles.mt3}>
                <VStack>
                    <Heading level="1" size="xlarge" className="text-center" spacing>
                        Beklager, vi fant ikke siden
                    </Heading>
                    <BodyLong className={["text-center", styles.mb12]}>
                        Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                    </BodyLong>

                    <HStack gap="4" className={styles.mb3}>
                        <Button variant="primary" as="a" href={`${arbeidsplassenBaseUrl}/personbruker`}>
                            Gå til CV
                        </Button>
                    </HStack>
                </VStack>
            </Box>
        </HStack>
    );
}
