import Image from "next/image";
import styles from "../../page.module.css";
import { Box, Heading } from "@navikt/ds-react";

export default function MinCVPage() {
    return (
        <Box className={styles.main}>
            <Heading level="1" size="xlarge" align="center" className="mb-12">
                Min CV
            </Heading>
        </Box>
    );
}
