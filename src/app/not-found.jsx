import { BodyLong, Box, Heading, HStack, Link, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { arbeidsplassenBaseUrl, navBaseUrl } from "@/app/_common/utils/urlUtils";
import { Pictogram } from "@/app/_common/components/HeaderPanel";

export default function NotFound() {
    return (
        <VStack>
            <Box as="header" className={styles.notFoundHeader}>
                <HStack className={styles.notFoundHeaderContainer}>
                    <Pictogram />
                    <Heading level="1" size="large">
                        Din CV
                    </Heading>
                </HStack>
            </Box>
            <HStack className={styles.pageContainer}>
                <VStack className={styles.mt3}>
                    <Heading level="1" size="xlarge" className="text-center" spacing>
                        Beklager, vi fant ikke siden
                    </Heading>
                    <BodyLong className={["text-center", styles.mb12]}>
                        Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                    </BodyLong>

                    <HStack className={styles.notFoundHStack}>
                        <Link
                            href={`${arbeidsplassenBaseUrl}/personbruker`}
                            className={[styles.notFoundButton, styles.notFoundButtonPrimary]}
                        >
                            Tilbake til CV
                        </Link>
                        <Link
                            href={`${navBaseUrl}/minside`}
                            className={[styles.notFoundButton, styles.notFoundButtonTertiary]}
                        >
                            Gå til Min Side
                        </Link>
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    );
}
