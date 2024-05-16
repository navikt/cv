import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function AndreGodkjenninger() {
    return (
        <div>
            <Box id="10" background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
                <Heading level="2" size="large" align="start" spacing>
                    Andre godkjenninger
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen andre godkjenninger i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    En annen godkjenning er f.eks it-sertifiseringer, som ikke krever statlig godkjenning
                </BodyLong>
                <Button variant="primary">+ Legg til</Button>
            </Box>
        </div>
    );
}
