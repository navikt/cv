import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function AndreErfaringer() {
    return (
        <div>
            <Box id="7" background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
                <Heading level="2" size="large" align="start" spacing>
                    Andre erfaringer
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen andre erfaringer i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    En “annen erfaring” er f.eks frivillig arbeid som du gjør som en fotballtrener
                </BodyLong>
                <Button variant="primary">+ Legg til flere</Button>
            </Box>
        </div>
    );
}
