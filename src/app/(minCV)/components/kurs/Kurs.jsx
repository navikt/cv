import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function Kurs() {
    return (
        <div>
            <Box id="13" background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
                <Heading level="2" size="large" align="start" spacing>
                    Kurs
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen kurs i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>Her kan du sette inn kurs som du har tatt, f.eks skredkurs.</BodyLong>
                <Button variant="primary">+ Legg til</Button>
            </Box>
        </div>
    );
}
