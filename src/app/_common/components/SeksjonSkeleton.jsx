import { Box, HStack, Skeleton, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export function SeksjonSkeleton({ icon }) {
    return (
        <Box background="surface-default" padding="10" className={styles.box}>
            <HStack justify="center">{icon}</HStack>
            <VStack gap="4">
                <Skeleton variant="rectangle" width="43%" height={50} className={styles.mb3} />
                <Skeleton variant="rectangle" width="80%" height={50} />
                <Skeleton variant="rectangle" width="80%" height={24} />
                <Skeleton variant="rectangle" width="80%" height={24} />
                <Skeleton variant="rectangle" width="80%" height={50} />
                <Skeleton variant="rectangle" width="30%" height={50} className={styles.mt6} />
            </VStack>
        </Box>
    );
}
