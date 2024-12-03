import { BodyLong, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import "@navikt/ds-css";
import styles from "@/app/page.module.css";
import { Pictogram } from "@/app/_common/components/HeaderPanel";
import NextLink from "next/link";

export default function NotFound() {
    return (
        <VStack>
            <Box as="header" borderWidth="0 0 4 0" borderColor="surface-info" background="surface-default">
                <HStack gap="3" justify="center" align="center" className={styles.mb9}>
                    <Pictogram />
                    <Heading level="1" size="large">
                        Min CV
                    </Heading>
                </HStack>
            </Box>
            <VStack align="center" className={styles.mt16}>
                <Heading level="1" size="large" align="center" className="text-center" spacing>
                    Beklager, vi fant ikke siden
                </Heading>
                <BodyLong align="center" className={styles.mb12}>
                    Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                </BodyLong>

                <HStack gap="4" className={styles.mb16}>
                    <NextLink href="https://www.nav.no/min-cv" passHref legacyBehavior>
                        <Button variant="primary" as="a" role="link">
                            Tilbake til CV
                        </Button>
                    </NextLink>
                    <NextLink href="https://www.nav.no/minside" passHref legacyBehavior>
                        <Button variant="secondary" as="a" role="link">
                            Gå til Min Side
                        </Button>
                    </NextLink>
                </HStack>
            </VStack>
        </VStack>
    );
}
