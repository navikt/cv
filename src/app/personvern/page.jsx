import { Box, Button, Heading, HStack, Link, VStack } from "@navikt/ds-react";
import "@navikt/ds-css";
import styles from "@/app/page.module.css";
import { Pictogram } from "@/app/_common/components/HeaderPanel";
import Hjemmelstekst from "@/app/_common/components/Hjemmelstekst";
import NextLink from "next/link";
import { ArrowUndoIcon } from "@navikt/aksel-icons";

async function Page() {
    return (
        <VStack className={styles.mb16}>
            <Box as="header" borderWidth="0 0 4 0" borderColor="surface-info" background="surface-default">
                <HStack gap="3" justify="center" align="center" className={styles.mb9}>
                    <Pictogram />
                    <Heading level="1" size="large">
                        Personvernerklæring for Min CV
                    </Heading>
                </HStack>
            </Box>
            <Box className={styles.main}>
                <HStack className={[styles.mainPanelElement, styles.mt6]}>
                    <Link href="/min-cv">
                        <ArrowUndoIcon aria-hidden />
                        Tilbake til Min CV
                    </Link>
                </HStack>
                <Box background="surface-default" padding="10" className={styles.box}>
                    <Hjemmelstekst />
                    <HStack gap="4" className={styles.mb3}>
                        <NextLink href="/" passHref legacyBehavior>
                            <Button variant="primary" as="a" role="link">
                                Tilbake til Min CV
                            </Button>
                        </NextLink>
                    </HStack>
                </Box>
            </Box>
        </VStack>
    );
}

export default Page;
