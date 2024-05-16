import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function Sprak() {
    return (
        <div>
            <Box id="11" background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Språk
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen språk i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>Her kan du si hvilke språk du kan, og hvor god du er i dem</BodyLong>
                <Button variant="primary">+ Legg til</Button>
            </Box>
        </div>
    );
}
