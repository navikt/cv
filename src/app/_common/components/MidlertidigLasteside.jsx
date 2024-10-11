import React, { useEffect, useState } from "react";
import { Box, Heading, Loader, VStack } from "@navikt/ds-react";
import HeaderPanel from "@/app/_common/components/HeaderPanel";

export const MidlertidigLasteside = () => {
    return (
        <div>
            <HeaderPanel visTag={false} />

            <Box paddingBlock="16" className="container-large min-height-100vh">
                <VStack align="center">
                    <Heading size="xlarge" level="1" className="visually-hidden">
                        Laster innhold
                    </Heading>
                    <Loader size="2xlarge" />
                </VStack>
            </Box>
        </div>
    );
};
