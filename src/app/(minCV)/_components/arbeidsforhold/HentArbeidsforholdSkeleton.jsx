import styles from "@/app/page.module.css";
import { Box, Button, Heading, HStack, Loader, Skeleton, VStack } from "@navikt/ds-react";
import { FileImportIcon } from "@navikt/aksel-icons";

export function HentArbeidsforholdSkeleton({ icon }) {
    return (
        <Box background="surface-default" padding="10" className={styles.box}>
            <HStack justify="center">{icon}</HStack>
            <Heading level="2" size="large" align="start">
                Arbeidsforhold
            </Heading>
            <VStack gap="4" className={[styles.mt3, styles.mb9]}>
                <Skeleton variant="rectangle" width="100%" height={48} />
                <Skeleton variant="rectangle" width="100%" height={24} />
                <Skeleton variant="rectangle" width="100%" height={24} />
            </VStack>
            <HStack gap="4">
                <Button icon={<FileImportIcon aria-hidden />} variant="primary" disabled>
                    Hent arbeidsforhold
                </Button>
                <Loader size="xlarge" />
            </HStack>
        </Box>
    );
}
