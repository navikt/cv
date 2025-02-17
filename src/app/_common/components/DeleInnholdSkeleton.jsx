import { Box, Skeleton, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export function DeleInnholdSkeleton() {
    return (
        <Box background="surface-default" className={styles.box}>
            <VStack gap="6">
                <Skeleton variant="rectangle" width="80%" height={24} />
                <Skeleton variant="rectangle" width="80%" height={24} />
                <Skeleton variant="rectangle" width="80%" height={24} />
                <Skeleton variant="rectangle" width="80%" height={24} />
                <Skeleton variant="rectangle" width="80%" height={24} />
                <Skeleton variant="rectangle" width="40%" height={24} />
                <Skeleton variant="rectangle" width="80%" height={50} className={styles.mt6} />
                <Skeleton variant="rectangle" width="50%" height={50} className={styles.mt3} />
                <Skeleton variant="rectangle" width="100%" height={100} className={styles.mb16} />
            </VStack>
        </Box>
    );
}
