import { Box, Skeleton, VStack } from "@navikt/ds-react";

export function SamtykkeSkeleton() {
    return (
        <Box background="surface-default">
            <VStack gap="6">
                <Skeleton variant="rectangle" width="100%" height={60} />
                <Skeleton variant="rectangle" width="90%" height={90} />
                <Skeleton variant="rectangle" width="30%" height={40} />
            </VStack>
        </Box>
    );
}
