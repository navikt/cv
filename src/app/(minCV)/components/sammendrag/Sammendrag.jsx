import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function Sammendrag() {
    return (
        <div>
            <Box id="14" background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
                <Heading level="2" size="large" align="start" spacing>
                    Om meg
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Din beskrivelse av deg selv
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    Her kan du beskrive deg selv, hvordan du er som arbeidstaker og ulike personlige egenskaper
                </BodyLong>
                <Button variant="primary">+ Legg til</Button>
            </Box>
        </div>
    );
}
